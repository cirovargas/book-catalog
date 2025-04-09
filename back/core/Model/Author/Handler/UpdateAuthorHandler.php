<?php

namespace DDD\Model\Author\Handler;

use DDD\Model\Author\Command\UpdateAuthorCommand;
use DDD\Model\Author\Exception\AuthorNameRequiredException;
use DDD\Model\Author\Exception\AuthorNotFoundException;
use DDD\Model\Author\Repository\AuthorRepositoryInterface;

class UpdateAuthorHandler
{
    public function __construct(
        private readonly AuthorRepositoryInterface $authorRepository
    ) {
    }

    public function __invoke(UpdateAuthorCommand $command): void
    {
        $author = $this->authorRepository->find($command->getId());
        
        if ($author === null) {
            throw new AuthorNotFoundException();
        }

        if ($command->getName() == null) {
            throw new AuthorNameRequiredException();
        }
        
        $author->setName($command->getName());
        $this->authorRepository->save($author);
    }
} 