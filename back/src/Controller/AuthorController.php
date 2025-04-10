<?php

namespace App\Controller;

use App\Exception\BadJsonBodyException;
use DDD\Model\Author\Command\CreateAuthorCommand;
use DDD\Model\Author\Command\DeleteAuthorCommand;
use DDD\Model\Author\Command\UpdateAuthorCommand;
use DDD\Model\Author\Exception\AuthorNameRequiredException;
use DDD\Model\Author\Exception\AuthorNotFoundException;
use DDD\Model\Author\Repository\AuthorRepositoryInterface;
use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/authors')]
class AuthorController extends AbstractController
{
    public function __construct(
        private readonly AuthorRepositoryInterface $authorRepository,
        private readonly MessageBusInterface $commandBus
    ) {
    }

    #[Route('', name: 'authors_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->jsonSuccessResponse($this->authorRepository->findAll());
    }

    #[Route('/{id}', name: 'authors_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $author = $this->authorRepository->find($id);

        if ($author === null) {
            return $this->jsonNotFoundResponse('Autor não encontrado');
        }

        return $this->jsonSuccessResponse($author);
    }

    #[Route('', name: 'authors_create', methods: ['POST'])]
    public function create(): JsonResponse
    {
        try {
            $command = $this->getRequestContent(CreateAuthorCommand::class);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse('Autor cadastrado com sucesso!', Response::HTTP_CREATED);
        } catch (AuthorNameRequiredException $exception) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        } catch (BadJsonBodyException $exception) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
    }

    #[Route('/{id}', name: 'authors_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $command = $this->getRequestContent(UpdateAuthorCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);
        } catch (AuthorNameRequiredException $exception) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        }  catch (AuthorNotFoundException $exception) {
            return $this->jsonNotFoundResponse('O autor não foi encontrado');
        } catch (BadJsonBodyException $exception) {
            return $this->jsonErrorResponse('Body mal formatado');
        }

        return $this->jsonSuccessResponse('Autor atualizado com sucesso!');
    }

    #[Route('/{id}', name: 'authors_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteAuthorCommand($id);
            $this->commandBus->dispatch($command);
        }  catch (AuthorNotFoundException $exception) {
            return $this->jsonNotFoundResponse('O autor não foi encontrado');
        }

        return $this->jsonSuccessResponse('Autor excluído com sucesso!');
    }
} 