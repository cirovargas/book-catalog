<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Command;

class CreateCommunicationVehicleTypeCommand
{
    public function __construct(
        private readonly string $name,
        private readonly ?string $description = null,
        private readonly string $status = 'active',
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getStatus(): string
    {
        return $this->status;
    }
}

