<?php

namespace App\Controller;

use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Exception\BadJsonBodyException;
use DDD\Model\Category\Command\CreateCategoryCommand;
use DDD\Model\Category\Command\DeleteCategoryCommand;
use DDD\Model\Category\Command\UpdateCategoryCommand;
use DDD\Model\Category\Exception\CategoryNameRequiredException;
use DDD\Model\Category\Exception\CategoryNotFoundException;
use DDD\Model\Category\Repository\CategoryRepositoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    public function __construct(
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly MessageBusInterface $commandBus,
    ) {
    }

    #[Route('/api/categories', name: 'categories_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->jsonSuccessResponse($this->categoryRepository->findAll());
    }

    #[Route('/api/categories/{id}', name: 'categories_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (null === $category) {
            return $this->jsonNotFoundResponse('Categoria não encontrada');
        }

        return $this->jsonSuccessResponse($category);
    }

    #[Route('/api/categories', name: 'categories_create', methods: ['POST'])]
    public function create(
        #[MapRequestPayload] CreateCategoryCommand $command,
    ): JsonResponse {
        try {
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'Categoria cadastrada com sucesso!',
                Response::HTTP_CREATED
            );
        } catch (CategoryNameRequiredException) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
    }

    #[Route('/api/categories/{id}', name: 'categories_update', methods: ['PUT'])]
    public function update(int $id): JsonResponse
    {
        try {
            $command = $this->getRequestContent(UpdateCategoryCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);
        } catch (CategoryNameRequiredException) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        } catch (CategoryNotFoundException) {
            return $this->jsonNotFoundResponse('A categoria não foi encontrada');
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado');
        }

        return $this->jsonSuccessResponse('Categoria atualizada com sucesso!');
    }

    #[Route('/api/categories/{id}', name: 'categories_delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteCategoryCommand($id);
            $this->commandBus->dispatch($command);
        } catch (CategoryNotFoundException) {
            return $this->jsonNotFoundResponse('A categoria não foi encontrada');
        }

        return $this->jsonSuccessResponse('Categoria excluída com sucesso!');
    }
}
