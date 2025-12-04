<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Company as CompanyEntity;
use DDD\Model\Company\Company;
use DDD\Model\Company\Service\CompanyFactory as CompanyFactoryInterface;

class CompanyFactory implements CompanyFactoryInterface
{
    public function create(
        string $cnpj,
        string $corporateName,
        string $tradeName,
        string $email,
        int $communicationVehicleTypeId,
        string $cep,
        string $street,
        string $number,
        string $neighborhood,
        string $state,
        string $city,
        ?string $phone = null,
        ?string $mobile = null,
        ?string $responsibleName = null,
        ?string $complement = null,
        string $status = 'active',
    ): Company {
        return new CompanyEntity(
            $cnpj,
            $corporateName,
            $tradeName,
            $email,
            $communicationVehicleTypeId,
            $cep,
            $street,
            $number,
            $neighborhood,
            $state,
            $city,
            $phone,
            $mobile,
            $responsibleName,
            $complement,
            $status
        );
    }
}
