<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\CommunicationVehicleType as CommunicationVehicleTypeEntity;
use DDD\Model\CommunicationVehicleType\CommunicationVehicleType;
use DDD\Model\CommunicationVehicleType\Service\CommunicationVehicleTypeFactory as CommunicationVehicleTypeFactoryInterface;

class CommunicationVehicleTypeFactory implements CommunicationVehicleTypeFactoryInterface
{
    public function create(string $name, ?string $description = null, string $status = 'active'): CommunicationVehicleType
    {
        return new CommunicationVehicleTypeEntity($name, $description, $status);
    }
}

