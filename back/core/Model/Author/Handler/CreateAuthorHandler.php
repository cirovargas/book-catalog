<?php

namespace DDD\Model\Author\Handler;

use DDD\Model\Author\Command\CreateAuthorCommand;
use DDD\Model\Author\Exception\AuthorNameRequiredException;
use DDD\Model\Author\Repository\AuthorRepositoryInterface;
use DDD\Model\Author\Service\AuthorFactory;

class CreateAuthorHandler
{
    public function __construct(
        private readonly AuthorRepositoryInterface $authorRepository,
        private readonly AuthorFactory $authorFactory
    ) {
    }

    public function __invoke(CreateAuthorCommand $command): void
    {
        if ($command->getName() == null) {
            throw new AuthorNameRequiredException();
        }
        $author = $this->authorFactory->create($command->getName());
        $this->authorRepository->save($author);
    }
} 