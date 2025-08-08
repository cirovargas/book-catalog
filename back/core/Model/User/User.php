<?php

namespace DDD\Model\User;

class User
{
    protected ?int $id = null;

    public function __construct(protected string $email, protected string $password)
    {
    }
}
