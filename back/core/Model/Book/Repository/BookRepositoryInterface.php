<?php

namespace DDD\Model\Book\Repository;

use App\Entity\Book;
use DDD\Application\Repository\AbstractRepository;

interface BookRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?Book;
} 