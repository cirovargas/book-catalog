<?php

declare(strict_types=1);

namespace DDD\Model\Company;

class Company
{
    protected ?int $id = null;

    protected string $corporateName;

    protected string $tradeName;

    protected string $cnpj;

    protected string $status = 'active';

    protected ?\DateTimeImmutable $createdAt = null;

    protected ?\DateTimeImmutable $updatedAt = null;

    public function __construct(
        string $corporateName,
        string $tradeName,
        string $cnpj,
        string $status = 'active',
    ) {
        $this->corporateName = trim($corporateName);
        $this->tradeName = trim($tradeName);
        $this->cnpj = $cnpj;
        $this->status = $status;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function setCnpj(string $cnpj): void
    {
        $this->cnpj = $cnpj;
        $this->updateTimestamp();
    }

    public function getCnpj(): string
    {
        return $this->cnpj;
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
        return $this->status === 'active';
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
