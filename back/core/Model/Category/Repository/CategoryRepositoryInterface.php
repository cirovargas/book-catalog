<?php

namespace DDD\Model\Category\Repository;

use App\Entity\Category;
use DDD\Application\Repository\AbstractRepository;

interface CategoryRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?Category;

    public function getByIds(array $ids): iterable;
}
