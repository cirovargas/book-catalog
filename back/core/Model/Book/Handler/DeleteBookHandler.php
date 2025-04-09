<?php

namespace DDD\Model\Book\Handler;

use DDD\Model\Book\Command\DeleteBookCommand;
use DDD\Model\Book\Exception\BookNotFoundException;
use DDD\Model\Book\Repository\BookRepositoryInterface;

class DeleteBookHandler
{
    public function __construct(
        private readonly BookRepositoryInterface $bookRepository
    ) {
    }

    public function __invoke(DeleteBookCommand $command): void
    {
        $book = $this->bookRepository->find($command->getId());
        
        if ($book === null) {
            throw new BookNotFoundException();
        }
        
        $this->bookRepository->delete($book);
    }
} 