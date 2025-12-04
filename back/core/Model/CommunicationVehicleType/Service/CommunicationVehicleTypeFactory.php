<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Service;

use DDD\Model\CommunicationVehicleType\CommunicationVehicleType;

interface CommunicationVehicleTypeFactory
{
    public function create(string $name, ?string $description = null, string $status = 'active'): CommunicationVehicleType;
}

