<?php

namespace App\Controller;

use App\Exception\BadJsonBodyException;
use DDD\Model\Category\Command\CreateCategoryCommand;
use DDD\Model\Category\Command\DeleteCategoryCommand;
use DDD\Model\Category\Command\UpdateCategoryCommand;
use DDD\Model\Category\Exception\CategoryNameRequiredException;
use DDD\Model\Category\Exception\CategoryNotFoundException;
use DDD\Model\Category\Repository\CategoryRepositoryInterface;
use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/categories')]
class CategoryController extends AbstractController
{
    public function __construct(
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly MessageBusInterface $commandBus
    ) {
    }

    #[Route('', name: 'categories_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->jsonSuccessResponse($this->categoryRepository->findAll());
    }

    #[Route('/{id}', name: 'categories_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if ($category === null) {
            return $this->jsonNotFoundResponse('Categoria não encontrada');
        }

        return $this->jsonSuccessResponse($category);
    }

    #[Route('', name: 'categories_create', methods: ['POST'])]
    public function create(): JsonResponse
    {
        try {
            $command = $this->getRequestContent(CreateCategoryCommand::class);
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

    #[Route('/{id}', name: 'categories_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
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

    #[Route('/{id}', name: 'categories_delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
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
