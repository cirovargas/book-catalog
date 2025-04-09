<?php

namespace DDD\Model\Author\Handler;

use DDD\Model\Author\Command\DeleteAuthorCommand;
use DDD\Model\Author\Exception\AuthorNotFoundException;
use DDD\Model\Author\Repository\AuthorRepositoryInterface;

class DeleteAuthorHandler
{
    public function __construct(
        private readonly AuthorRepositoryInterface $authorRepository
    ) {
    }

    public function __invoke(DeleteAuthorCommand $command): void
    {
        $author = $this->authorRepository->find($command->getId());
        
        if ($author === null) {
            throw new AuthorNotFoundException();
        }
        
        $this->authorRepository->delete($author);
    }
} 