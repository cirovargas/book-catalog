<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType;

class CommunicationVehicleType
{
    protected ?int $id = null;

    protected string $name;

    protected string $status = 'active';

    public function __construct(
        string $name,
        protected ?string $description = null,
        string $status = 'active',
    ) {
        $this->name = trim($name);
        $this->status = $status;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setName(string $name): void
    {
        $this->name = trim($name);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}

