<?php

namespace DDD\Model\Subject\Command;

class DeleteSubjectCommand
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
