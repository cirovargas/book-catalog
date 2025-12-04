<?php

declare(strict_types=1);

namespace DDD\Model\Company\Command;

class UpdateCompanyCommand
{
    public function __construct(
        private readonly int $id,
        private readonly string $corporateName,
        private readonly string $tradeName,
        private readonly string $cnpj,
        private readonly string $status = 'active',
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getCorporateName(): string
    {
        return $this->corporateName;
    }

    public function getTradeName(): string
    {
        return $this->tradeName;
    }

    public function getCnpj(): string
    {
        return $this->cnpj;
    }

    public function getStatus(): string
    {
        return $this->status;
    }
}

