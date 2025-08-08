<?php

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\Category;
use DDD\Model\Category\Repository\CategoryRepositoryInterface;

class CategoryRepository extends ServiceEntityRepository implements CategoryRepositoryInterface
{
    public function get(int $id): ?Category
    {
        return $this->find($id);
    }

    public function getEntityClassName(): string
    {
        return Category::class;
    }

    public function getByIds(array $ids): iterable
    {
        return $this->findBy(['id' => $ids]);
    }
}
