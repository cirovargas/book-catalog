<?php

declare(strict_types=1);

namespace DDD\Model\Company\Command;

class CreateCompanyCommand
{
    public function __construct(
        private readonly string $cnpj,
        private readonly string $corporateName,
        private readonly string $tradeName,
        private readonly string $email,
        private readonly int $communicationVehicleTypeId,
        private readonly string $cep,
        private readonly string $street,
        private readonly string $number,
        private readonly string $neighborhood,
        private readonly string $state,
        private readonly string $city,
        private readonly ?string $phone = null,
        private readonly ?string $mobile = null,
        private readonly ?string $responsibleName = null,
        private readonly ?string $complement = null,
        private readonly string $status = 'active',
        private readonly bool $generateUser = false,
    ) {
    }

    public function getCnpj(): string
    {
        return $this->cnpj;
    }

    public function getCorporateName(): string
    {
        return $this->corporateName;
    }

    public function getTradeName(): string
    {
        return $this->tradeName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getCommunicationVehicleTypeId(): int
    {
        return $this->communicationVehicleTypeId;
    }

    public function getCep(): string
    {
        return $this->cep;
    }

    public function getStreet(): string
    {
        return $this->street;
    }

    public function getNumber(): string
    {
        return $this->number;
    }

    public function getNeighborhood(): string
    {
        return $this->neighborhood;
    }

    public function getState(): string
    {
        return $this->state;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getMobile(): ?string
    {
        return $this->mobile;
    }

    public function getResponsibleName(): ?string
    {
        return $this->responsibleName;
    }

    public function getComplement(): ?string
    {
        return $this->complement;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function shouldGenerateUser(): bool
    {
        return $this->generateUser;
    }
}
