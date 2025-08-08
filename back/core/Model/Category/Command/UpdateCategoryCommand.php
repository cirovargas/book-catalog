<?php

namespace DDD\Model\Category\Command;

class UpdateCategoryCommand
{
    public function __construct(
        private readonly int $id,
        private readonly string $name,
        private readonly ?string $description = null,
    ) {
    }

    public function getId(): int
    {
        return $this->id;
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
