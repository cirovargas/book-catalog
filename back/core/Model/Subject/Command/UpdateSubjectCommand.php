<?php

namespace DDD\Model\Subject\Command;

class UpdateSubjectCommand
{
    public function __construct(
        private readonly int $id,
        private readonly string $description
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
}
