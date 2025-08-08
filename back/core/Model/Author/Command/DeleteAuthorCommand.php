<?php

namespace DDD\Model\Author\Command;

class DeleteAuthorCommand
{
    public function __construct(
        private readonly int $id
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }
}
