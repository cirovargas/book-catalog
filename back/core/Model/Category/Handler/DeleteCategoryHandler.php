<?php

namespace DDD\Model\Category\Handler;

use DDD\Model\Category\Command\DeleteCategoryCommand;
use DDD\Model\Category\Exception\CategoryNotFoundException;
use DDD\Model\Category\Repository\CategoryRepositoryInterface;

class DeleteCategoryHandler
{
    public function __construct(
        private readonly CategoryRepositoryInterface $categoryRepository,
    ) {
    }

    public function __invoke(DeleteCategoryCommand $command): void
    {
        $category = $this->categoryRepository->find($command->getId());

        if (null === $category) {
            throw new CategoryNotFoundException();
        }

        $this->categoryRepository->delete($category);
    }
}
