<?php

declare(strict_types=1);

namespace DDD\Model\Company\Service;

use DDD\Model\Company\Company;

interface CompanyFactory
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
    ): Company;
}
