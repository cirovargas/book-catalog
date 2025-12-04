<?php

declare(strict_types=1);

namespace DDD\Model\Company\Command;

class CreateCompanyCommand
{
    public function __construct(
        private readonly string $corporateName,
        private readonly string $tradeName,
        private readonly string $cnpj,
        private readonly string $status = 'active',
    ) {
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

