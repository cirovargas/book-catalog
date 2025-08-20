<?php

declare(strict_types=1);

namespace DDD\Model\User\Command;

class UpdateUserCommand
{
    public function __construct(
        private readonly int $id,
        private readonly string $email,
        private readonly array $roles = [],
        private readonly ?string $password = null,
        private readonly ?string $name = null,
        private readonly ?string $avatar = null,
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }
}
