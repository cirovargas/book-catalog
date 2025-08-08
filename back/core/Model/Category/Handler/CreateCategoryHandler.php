<?php

namespace DDD\Model\Category\Handler;

use DDD\Model\Category\Command\CreateCategoryCommand;
use DDD\Model\Category\Exception\CategoryNameRequiredException;
use DDD\Model\Category\Repository\CategoryRepositoryInterface;
use DDD\Model\Category\Service\CategoryFactory;

class CreateCategoryHandler
{
    public function __construct(
        private readonly CategoryRepositoryInterface $categoryRepository,
        private readonly CategoryFactory $categoryFactory,
    ) {
    }

    public function __invoke(CreateCategoryCommand $command): void
    {
        if (null == $command->getName() || '' === trim($command->getName())) {
            throw new CategoryNameRequiredException();
        }

        $category = $this->categoryFactory->create($command->getName(), $command->getDescription());
        $this->categoryRepository->save($category);
    }
}
