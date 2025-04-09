<?php

namespace DDD\Model\Author\Repository;

use App\Entity\Author;
use DDD\Application\Repository\AbstractRepository;

interface AuthorRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?Author;

    public function getByIds(array $ids): iterable;
} 