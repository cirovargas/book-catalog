<?php

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\Subject;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;

class SubjectRepository extends ServiceEntityRepository implements SubjectRepositoryInterface
{
    public function get(int $id): ?Subject
    {
        return $this->find($id);
    }
    public function getEntityClassName(): string
    {
        return Subject::class;
    }

    public function getByIds(array $ids): iterable
    {
        return $this->findBy(['id' => $ids]);
    }
}
