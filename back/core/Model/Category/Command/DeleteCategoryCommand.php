<?php

declare(strict_types=1);

namespace DDD\Model\Category\Command;

class DeleteCategoryCommand
{
    public function __construct(
        private readonly int $id,
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }
}
