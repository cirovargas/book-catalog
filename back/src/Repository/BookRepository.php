<?php

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\Book;
use DDD\Model\Book\Repository\BookRepositoryInterface;

/**
 * @extends ServiceEntityRepository<Book>
 */
class BookRepository extends ServiceEntityRepository implements BookRepositoryInterface
{
    public function get(int $id): ?Book
    {
        return $this->find($id);
    }

    public function getEntityClassName(): string
    {
        return Book::class;
    }
}
