<?php

namespace DDD\Model\Book\Command;

class DeleteBookCommand
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