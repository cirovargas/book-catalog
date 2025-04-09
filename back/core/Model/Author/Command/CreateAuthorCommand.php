<?php

namespace DDD\Model\Author\Command;

class CreateAuthorCommand
{
    public function __construct(
        private readonly string $name
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }
} 