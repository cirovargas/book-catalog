<?php

declare(strict_types=1);

namespace DDD\Model\Company\Command;

class DeleteCompanyCommand
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

