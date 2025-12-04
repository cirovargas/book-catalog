<?php

declare(strict_types=1);

namespace App\Controller;

use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Exception\BadJsonBodyException;
use DDD\Model\Company\Command\CreateCompanyCommand;
use DDD\Model\Company\Command\DeleteCompanyCommand;
use DDD\Model\Company\Command\UpdateCompanyCommand;
use DDD\Model\Company\Company;
use DDD\Model\Company\Exception\CompanyCnpjAlreadyExistsException;
use DDD\Model\Company\Exception\CompanyNameRequiredException;
use DDD\Model\Company\Exception\CompanyNotFoundException;
use DDD\Model\Company\Exception\InvalidCnpjException;
use DDD\Model\Company\Repository\CompanyRepositoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class CompanyController extends AbstractController
{
    public function __construct(
        private readonly CompanyRepositoryInterface $companyRepository,
        private readonly MessageBusInterface $commandBus,
    ) {
    }

    #[Route('/api/companies', name: 'companies_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = min(100, max(1, (int) $request->query->get('limit', 10)));
        $search = $request->query->get('search');
        $searchString = is_string($search) ? $search : null;
        $vehicleTypeId = $request->query->get('vehicleTypeId');
        $vehicleTypeIdInt = is_numeric($vehicleTypeId) ? (int) $vehicleTypeId : null;
        $status = $request->query->get('status', 'active');
        $statusString = is_string($status) ? $status : 'active';

        $result = $this->companyRepository->getPaginated($page, $limit, $searchString, $vehicleTypeIdInt, $statusString);

        return $this->jsonSuccessResponse([
            'companies' => $result['companies'],
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $result['total'],
                'pages' => ceil($result['total'] / $limit),
            ],
        ]);
    }

    #[Route('/api/companies/{id}', name: 'companies_show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(int $id): JsonResponse
    {
        $company = $this->companyRepository->get($id);

        if (!$company instanceof Company) {
            return $this->jsonNotFoundResponse('Empresa não encontrada');
        }

        return $this->jsonSuccessResponse($company);
    }

    #[Route('/api/companies', name: 'companies_create', methods: ['POST'])]
    public function create(
        #[MapRequestPayload] CreateCompanyCommand $command,
    ): JsonResponse {
        try {
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'Empresa cadastrada com sucesso!',
                Response::HTTP_CREATED
            );
        } catch (CompanyNameRequiredException) {
            return $this->jsonErrorResponse('Os campos de nome são obrigatórios', Response::HTTP_BAD_REQUEST);
        } catch (InvalidCnpjException $e) {
            return $this->jsonErrorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado', Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/companies/{id}', name: 'companies_update', methods: ['PUT'], requirements: ['id' => '\d+'])]
    public function update(int $id): JsonResponse
    {
        try {
            $command = $this->mapRequestContent(UpdateCompanyCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse('Empresa atualizada com sucesso!');
        } catch (CompanyNotFoundException) {
            return $this->jsonNotFoundResponse('Empresa não encontrada');
        } catch (CompanyNameRequiredException) {
            return $this->jsonErrorResponse('Os campos de nome são obrigatórios', Response::HTTP_BAD_REQUEST);
        } catch (CompanyCnpjAlreadyExistsException $e) {
            return $this->jsonErrorResponse($e->getMessage(), Response::HTTP_CONFLICT);
        } catch (InvalidCnpjException $e) {
            return $this->jsonErrorResponse($e->getMessage(), Response::HTTP_BAD_REQUEST);
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado', Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/companies/{id}', name: 'companies_delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteCompanyCommand($id);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse('Empresa excluída com sucesso!');
        } catch (CompanyNotFoundException) {
            return $this->jsonNotFoundResponse('Empresa não encontrada');
        }
    }
}
