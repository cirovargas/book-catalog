<?php

namespace App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository;

use DDD\Application\Repository\AbstractRepository as BaseAbstractRepository;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository as BaseServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use InvalidArgumentException;

/**
 * @template T of object
 *
 * @template-extends BaseServiceEntityRepository<T>
 *
 * @template-implements BaseAbstractRepository<T>
 */
abstract class ServiceEntityRepository extends BaseServiceEntityRepository implements BaseAbstractRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, $this->getEntityClassName());
    }

    /**
     * @return class-string<T>
     */
    abstract public function getEntityClassName(): string;

    /**
     * @param T $object
     */
    public function save($object): void
    {
        if (!is_object($object) || !str_contains($object::class, $this->getClassName())) {
            $exceptionMessage = sprintf('expects %s object, %s given', $this->getClassName(), gettype($object));
            if (is_object($object)) {
                $exceptionMessage = sprintf(
                    'expects %s object, %s given',
                    $this->getClassName(),
                    $object::class
                );
            }

            throw new InvalidArgumentException($exceptionMessage);
        }

        $this->getEntityManager()->persist($object);
        $this->getEntityManager()->flush();
    }

    /**
     * @param T $object
     */
    public function delete($object): void
    {
        if (!is_object($object) || !str_contains($object::class, $this->getClassName())) {
            $exceptionMessage = sprintf('expects %s object, %s given', $this->getClassName(), gettype($object));
            if (is_object($object)) {
                $exceptionMessage = sprintf(
                    'expects %s object, %s given',
                    $this->getClassName(),
                    $object::class
                );
            }

            throw new InvalidArgumentException($exceptionMessage);
        }

        $this->getEntityManager()->remove($object);
        $this->getEntityManager()->flush();
    }
}
