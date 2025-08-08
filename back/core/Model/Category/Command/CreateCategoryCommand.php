<?php

namespace DDD\Model\Category\Command;

class CreateCategoryCommand
{
    public function __construct(
        private readonly string $name,
        private readonly ?string $description = null
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
}
