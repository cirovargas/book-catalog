<?php

namespace DDD\Model\Subject\Repository;

use App\Entity\Subject;
use DDD\Application\Repository\AbstractRepository;

interface SubjectRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?Subject;

    public function getByIds(array $ids): iterable;
}
