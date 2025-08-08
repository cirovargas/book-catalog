<?php

namespace DDD\Model\User;

class User
{
    protected ?int $id = null;

    /**
     * @param non-empty-string $email
     */
    public function __construct(
        protected string $email,
        protected string $password
    ) {
    }
}
