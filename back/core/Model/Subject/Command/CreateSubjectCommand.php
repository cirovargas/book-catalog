<?php

namespace DDD\Model\Subject\Command;

class CreateSubjectCommand
{
    public function __construct(
        private readonly string $description
    ) {
    }

    public function getDescription(): string
    {
        return $this->description;
    }
} 