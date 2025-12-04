<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Exception;

class CommunicationVehicleTypeNotFoundException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Communication Vehicle Type not found');
    }
}

