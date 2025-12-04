<?php

declare(strict_types=1);

namespace DDD\Model\Company\Service;

use DDD\Model\Company\Company;

interface CompanyFactory
{
    public function create(
        string $corporateName,
        string $tradeName,
        string $cnpj,
        string $status = 'active'
    ): Company;
}

