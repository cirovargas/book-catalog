<?php

declare(strict_types=1);

namespace DDD\Model\User\Command;

class CreateUserCommand
{
    public function __construct(
        private readonly string $email,
        private readonly array $roles = [],
        private readonly ?string $name = null,
        private readonly ?string $avatar = null,
    ) {
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return $this->roles;
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
