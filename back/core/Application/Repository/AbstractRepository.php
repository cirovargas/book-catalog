<?php

namespace DDD\Application\Repository;

interface AbstractRepository
{
    public function save($object): void;

    public function delete($object): void;

}
