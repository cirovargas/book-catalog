<?php

namespace DDD\Application\Repository;

/**
 * @template T of object
 */
interface AbstractRepository
{
    /**
     * @param T $object
     */
    public function save($object): void;

    /**
     * @param T $object
     */
    public function delete($object): void;
}
