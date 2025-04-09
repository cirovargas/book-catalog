<?php

namespace App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository;

use DDD\Application\Repository\AbstractRepository as BaseAbstractRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository as BaseServiceEntityRepository;

class ServiceEntityRepository extends BaseServiceEntityRepository implements BaseAbstractRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, $this->getEntityClassName());
    }

    public function save($object): void
    {
        if (!is_object($object) || false === strstr(get_class($object), $this->getClassName())) {
            $exceptionMessage = sprintf('expects %s object, %s given', $this->getClassName(), gettype($object));
            if (is_object($object)) {
                $exceptionMessage = sprintf(
                    'expects %s object, %s given',
                    $this->getClassName(),
                    get_class($object)
                );
            }
            throw new \InvalidArgumentException($exceptionMessage);
        }

        $this->getEntityManager()->persist($object);
    }

    public function delete($object): void
    {
        if (!is_object($object) || false === strstr(get_class($object), $this->getClassName())) {
            $exceptionMessage = 'expects %s object, %s given';
            if (is_object($object)) {
                $exceptionMessage = sprintf(
                    'expects %s object, %s given',
                    $this->getClassName(),
                    get_class($object)
                );
            }
            throw new \InvalidArgumentException($exceptionMessage);
        }
        $this->getEntityManager()->remove($object);
    }
}
