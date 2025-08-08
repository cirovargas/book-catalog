<?php

namespace DDD\Model\Category\Repository;

use App\Entity\Category;
use DDD\Application\Repository\AbstractRepository;

/**
 * @extends AbstractRepository<Category>
 *
 * @template-extends AbstractRepository<Category>
 */
interface CategoryRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?Category;

    /**
     * @param array<int> $ids
     * @return iterable<Category>
     */
    public function getByIds(array $ids): iterable;

    /**
     * @return iterable<Category>
     */
    public function getAll(): iterable;
}
