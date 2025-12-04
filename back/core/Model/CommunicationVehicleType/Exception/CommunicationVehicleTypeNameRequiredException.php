<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Exception;

class CommunicationVehicleTypeNameRequiredException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Communication Vehicle Type name is required');
    }
}

