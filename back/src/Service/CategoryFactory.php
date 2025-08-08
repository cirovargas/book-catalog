<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Category;
use DDD\Model\Category\Service\CategoryFactory as CategoryFactoryInterface;
use DDD\Model\Category\Category as ModelCategory;

class CategoryFactory implements CategoryFactoryInterface
{
    public function create(string $name, ?string $description = null): ModelCategory
    {
        return new Category($name, $description);
    }
}
