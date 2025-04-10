<?php

namespace App\Controller;

use App\Exception\BadJsonBodyException;
use DDD\Model\Book\Command\CreateBookCommand;
use DDD\Model\Book\Command\DeleteBookCommand;
use DDD\Model\Book\Command\UpdateBookCommand;
use DDD\Model\Book\Exception\BookTitleRequiredException;
use DDD\Model\Book\Exception\BookNotFoundException;
use DDD\Model\Book\Repository\BookRepositoryInterface;
use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/books')]
class BookController extends AbstractController
{
    public function __construct(
        private readonly BookRepositoryInterface $bookRepository,
        private readonly MessageBusInterface $commandBus
    ) {
    }

    #[Route('', name: 'books_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->jsonSuccessResponse($this->bookRepository->findAll());
    }

    #[Route('/{id}', name: 'books_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $book = $this->bookRepository->find($id);

        if ($book === null) {
            return $this->jsonNotFoundResponse('Livro não encontrado');
        }

        return $this->jsonSuccessResponse($book);
    }

    #[Route('', name: 'books_create', methods: ['POST'])]
    public function create(): JsonResponse
    {
        try {
            $command = $this->getRequestContent(CreateBookCommand::class);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'Livro cadastrado com sucesso!',
                Response::HTTP_CREATED
            );
        } catch (BookTitleRequiredException $exception) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        } catch (BadJsonBodyException $exception) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
    }

    #[Route('/{id}', name: 'books_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $command = $this->getRequestContent(UpdateBookCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);
        } catch (BookTitleRequiredException $exception) {
            return $this->jsonErrorResponse('O campo nome é obrigatório');
        }  catch (BookNotFoundException $exception) {
            return $this->jsonNotFoundResponse('O livro não foi encontrado');
        } catch (BadJsonBodyException $exception) {
            return $this->jsonErrorResponse('Body mal formatado');
        }

        return $this->jsonSuccessResponse('Livro atualizado com sucesso!');
    }

    #[Route('/{id}', name: 'books_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteBookCommand($id);
            $this->commandBus->dispatch($command);
        }  catch (BookNotFoundException $exception) {
            return $this->jsonNotFoundResponse('O livro não foi encontrado');
        }

        return $this->jsonSuccessResponse('Livro excluído com sucesso!');
    }
} 
