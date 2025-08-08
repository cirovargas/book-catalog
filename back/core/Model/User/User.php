<?php

namespace DDD\Model\User;

class User
{
    protected ?int $id;

    protected string $email;

    protected string $password;

    public function __construct(string $email, string $password)
    {
        $this->email = $email;
        $this->password = $password;
    }
}
