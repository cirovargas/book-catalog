<?php

namespace DDD\Model\User;

class User
{
    protected ?int $id = null;

    protected ?\DateTimeImmutable $createdAt = null;

    protected ?\DateTimeImmutable $updatedAt = null;

    /**
     * @param non-empty-string $email
     */
    public function __construct(
        protected string $email,
        protected string $password,
        protected ?string $name = null,
        protected ?string $avatar = null,
    ) {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = trim($email);
        $this->updateTimestamp();
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
        $this->updateTimestamp();
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = null !== $name && '' !== $name && '0' !== $name ? trim($name) : null;
        $this->updateTimestamp();
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): void
    {
        $this->avatar = $avatar;
        $this->updateTimestamp();
    }

    private function updateTimestamp(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}
