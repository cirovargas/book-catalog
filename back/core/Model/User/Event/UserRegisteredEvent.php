<?php

declare(strict_types=1);

namespace DDD\Model\User\Event;

use DDD\Application\Event\Event;

readonly class UserRegisteredEvent implements Event
{
    public function __construct(
        private string $name,
        private string $email,
        private string $plainPassword,
    ) {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPlainPassword(): string
    {
        return $this->plainPassword;
    }
}
