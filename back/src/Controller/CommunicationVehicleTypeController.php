<?php

declare(strict_types=1);

namespace App\Controller;

use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Exception\BadJsonBodyException;
use DDD\Model\CommunicationVehicleType\Command\CreateCommunicationVehicleTypeCommand;
use DDD\Model\CommunicationVehicleType\Command\DeleteCommunicationVehicleTypeCommand;
use DDD\Model\CommunicationVehicleType\Command\UpdateCommunicationVehicleTypeCommand;
use DDD\Model\CommunicationVehicleType\CommunicationVehicleType;
use DDD\Model\CommunicationVehicleType\Exception\CommunicationVehicleTypeNameRequiredException;
use DDD\Model\CommunicationVehicleType\Exception\CommunicationVehicleTypeNotFoundException;
use DDD\Model\CommunicationVehicleType\Repository\CommunicationVehicleTypeRepositoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class CommunicationVehicleTypeController extends AbstractController
{
    public function __construct(
        private readonly CommunicationVehicleTypeRepositoryInterface $communicationVehicleTypeRepository,
        private readonly MessageBusInterface                         $commandBus,
    )
    {
    }

    #[Route('/api/communication-vehicle-types', name: 'communication_vehicle_types_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $page = max(1, (int)$request->query->get('page', 1));
        $limit = min(100, max(1, (int)$request->query->get('limit', 10)));
        $search = $request->query->get('search');

        $result = $this->communicationVehicleTypeRepository->getPaginated($page, $limit, $search);

        return $this->jsonSuccessResponse([
            'communication_vehicle_types' => $result['communication_vehicle_types'],
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $result['total'],
                'pages' => ceil($result['total'] / $limit),
            ],
        ]);
    }

    #[Route('/api/communication-vehicle-types/{id}', name: 'communication_vehicle_types_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $communicationVehicleType = $this->communicationVehicleTypeRepository->get($id);

        if (!$communicationVehicleType instanceof CommunicationVehicleType) {
            return $this->jsonNotFoundResponse('Tipo de veículo de comunicação não encontrado');
        }

        return $this->jsonSuccessResponse($communicationVehicleType);
    }

    #[Route('/api/communication-vehicle-types', name: 'communication_vehicle_types_create', methods: ['POST'])]
    public function create(
        #[MapRequestPayload] CreateCommunicationVehicleTypeCommand $command,
    ): JsonResponse
    {
        try {
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'Tipo de veículo de comunicação cadastrado com sucesso!',
                Response::HTTP_CREATED
            );
        } catch (CommunicationVehicleTypeNameRequiredException) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
    }

    #[Route('/api/communication-vehicle-types/{id}', name: 'communication_vehicle_types_update', methods: ['PUT'])]
    public function update(int $id): JsonResponse
    {
        try {
            $command = $this->mapRequestContent(UpdateCommunicationVehicleTypeCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);
        } catch (CommunicationVehicleTypeNameRequiredException) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        } catch (CommunicationVehicleTypeNotFoundException) {
            return $this->jsonNotFoundResponse('O tipo de veículo de comunicação não foi encontrado');
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado');
        }

        return $this->jsonSuccessResponse('Tipo de veículo de comunicação atualizado com sucesso!');
    }

    #[Route('/api/communication-vehicle-types/{id}', name: 'communication_vehicle_types_delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteCommunicationVehicleTypeCommand($id);
            $this->commandBus->dispatch($command);
        } catch (CommunicationVehicleTypeNotFoundException) {
            return $this->jsonNotFoundResponse('O tipo de veículo de comunicação não foi encontrado');
        }

        return $this->jsonSuccessResponse('Tipo de veículo de comunicação excluído com sucesso!');
    }
}


