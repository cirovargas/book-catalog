<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Command;

class UpdateCommunicationVehicleTypeCommand
{
    public function __construct(
        private readonly int $id,
        private readonly string $name,
        private readonly ?string $description = null,
        private readonly string $status = 'active',
    ) {
    }

    public function getId(): int
    {
        return $this->id;
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

