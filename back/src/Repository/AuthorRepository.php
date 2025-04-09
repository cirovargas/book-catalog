<?php

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\Author;
use DDD\Model\Author\Repository\AuthorRepositoryInterface;

class AuthorRepository extends ServiceEntityRepository implements AuthorRepositoryInterface
{

    public function get(int $id): ?Author
    {
        return $this->find($id);
    }

    public function getEntityClassName(): string
    {
        return Author::class;
    }

    public function getByIds(array $ids): iterable
    {
        return $this->findBy(['id' => $ids]);
    }

} 