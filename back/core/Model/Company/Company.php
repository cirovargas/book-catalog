<?php

declare(strict_types=1);

namespace DDD\Model\Company;

class Company
{
    protected ?int $id = null;

    protected string $cnpj;

    protected string $corporateName;

    protected string $tradeName;

    protected string $email;

    protected ?string $phone = null;

    protected ?string $mobile = null;

    protected ?string $responsibleName = null;

    protected ?string $cep = null;

    protected ?string $street = null;

    protected ?string $number = null;

    protected ?string $neighborhood = null;

    protected ?string $complement = null;

    protected ?string $state = null;

    protected ?string $city = null;

    protected ?int $userId = null;

    protected ?\DateTimeImmutable $createdAt = null;

    protected ?\DateTimeImmutable $updatedAt = null;

    public function __construct(
        string $cnpj,
        string $corporateName,
        string $tradeName,
        string $email,
        protected int $communicationVehicleTypeId,
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
        protected string $status = 'active',
    ) {
        $this->cnpj = (string) preg_replace('/[^0-9]/', '', $cnpj);
        $this->corporateName = trim($corporateName);
        $this->tradeName = trim($tradeName);
        $this->email = trim(strtolower($email));
        $this->cep = (string) preg_replace('/[^0-9]/', '', $cep);
        $this->street = trim($street);
        $this->number = trim($number);
        $this->neighborhood = trim($neighborhood);
        $this->state = strtoupper(trim($state));
        $this->city = trim($city);
        $this->phone = null !== $phone && '' !== $phone && '0' !== $phone ? preg_replace('/[^0-9]/', '', $phone) : null;
        $this->mobile = null !== $mobile && '' !== $mobile && '0' !== $mobile ? preg_replace('/[^0-9]/', '', $mobile) : null;
        $this->responsibleName = null !== $responsibleName && '' !== $responsibleName && '0' !== $responsibleName ? trim($responsibleName) : null;
        $this->complement = null !== $complement && '' !== $complement && '0' !== $complement ? trim($complement) : null;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCnpj(): string
    {
        return $this->cnpj;
    }

    public function setCorporateName(string $corporateName): void
    {
        $this->corporateName = trim($corporateName);
        $this->updateTimestamp();
    }

    public function getCorporateName(): string
    {
        return $this->corporateName;
    }

    public function setTradeName(string $tradeName): void
    {
        $this->tradeName = trim($tradeName);
        $this->updateTimestamp();
    }

    public function getTradeName(): string
    {
        return $this->tradeName;
    }

    public function setEmail(string $email): void
    {
        $this->email = trim(strtolower($email));
        $this->updateTimestamp();
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = null !== $phone && '' !== $phone && '0' !== $phone ? preg_replace('/[^0-9]/', '', $phone) : null;
        $this->updateTimestamp();
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setMobile(?string $mobile): void
    {
        $this->mobile = null !== $mobile && '' !== $mobile && '0' !== $mobile ? preg_replace('/[^0-9]/', '', $mobile) : null;
        $this->updateTimestamp();
    }

    public function getMobile(): ?string
    {
        return $this->mobile;
    }

    public function setResponsibleName(?string $responsibleName): void
    {
        $this->responsibleName = null !== $responsibleName && '' !== $responsibleName && '0' !== $responsibleName ? trim($responsibleName) : null;
        $this->updateTimestamp();
    }

    public function getResponsibleName(): ?string
    {
        return $this->responsibleName;
    }

    public function getCommunicationVehicleTypeId(): int
    {
        return $this->communicationVehicleTypeId;
    }

    public function setCommunicationVehicleTypeId(int $communicationVehicleTypeId): void
    {
        $this->communicationVehicleTypeId = $communicationVehicleTypeId;
        $this->updateTimestamp();
    }

    public function setCep(string $cep): void
    {
        $this->cep = preg_replace('/[^0-9]/', '', $cep);
        $this->updateTimestamp();
    }

    public function getCep(): ?string
    {
        return $this->cep;
    }

    public function setStreet(string $street): void
    {
        $this->street = trim($street);
        $this->updateTimestamp();
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setNumber(string $number): void
    {
        $this->number = trim($number);
        $this->updateTimestamp();
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNeighborhood(string $neighborhood): void
    {
        $this->neighborhood = trim($neighborhood);
        $this->updateTimestamp();
    }

    public function getNeighborhood(): ?string
    {
        return $this->neighborhood;
    }

    public function setComplement(?string $complement): void
    {
        $this->complement = null !== $complement && '' !== $complement && '0' !== $complement ? trim($complement) : null;
        $this->updateTimestamp();
    }

    public function getComplement(): ?string
    {
        return $this->complement;
    }

    public function setState(string $state): void
    {
        $this->state = strtoupper(trim($state));
        $this->updateTimestamp();
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setCity(string $city): void
    {
        $this->city = trim($city);
        $this->updateTimestamp();
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
        $this->updateTimestamp();
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function isActive(): bool
    {
        return 'active' === $this->status;
    }

    public function setUserId(?int $userId): void
    {
        $this->userId = $userId;
        $this->updateTimestamp();
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    private function updateTimestamp(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}
