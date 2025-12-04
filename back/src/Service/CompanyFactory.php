<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Company as CompanyEntity;
use DDD\Model\Company\Company;
use DDD\Model\Company\Service\CompanyFactory as CompanyFactoryInterface;

class CompanyFactory implements CompanyFactoryInterface
{
    public function create(
        string $corporateName,
        string $tradeName,
        string $cnpj,
        string $status = 'active'
    ): Company {
        return new CompanyEntity($corporateName, $tradeName, $cnpj, $status);
    }
}

