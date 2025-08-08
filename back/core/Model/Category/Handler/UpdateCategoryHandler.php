<?php

namespace DDD\Model\Category\Handler;

use DDD\Model\Category\Command\UpdateCategoryCommand;
use DDD\Model\Category\Exception\CategoryNameRequiredException;
use DDD\Model\Category\Exception\CategoryNotFoundException;
use DDD\Model\Category\Repository\CategoryRepositoryInterface;

class UpdateCategoryHandler
{
    public function __construct(
        private readonly CategoryRepositoryInterface $categoryRepository,
    ) {
    }

    public function __invoke(UpdateCategoryCommand $command): void
    {
        $category = $this->categoryRepository->get($command->getId());

        if (null === $category) {
            throw new CategoryNotFoundException();
        }

        if (null == $command->getName() || '' === trim($command->getName())) {
            throw new CategoryNameRequiredException();
        }

        $category->setName($command->getName());
        $category->setDescription($command->getDescription());

        $this->categoryRepository->save($category);
    }
}
