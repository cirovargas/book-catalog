<?php

namespace DDD\Model\User\Command;

class SendUserWelcomeEmailCommand
{
    public function __construct(private readonly string $name, private readonly string $email, private readonly string $plainPassword)
    {
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
