<?php

namespace DDD\Model\User\Service;

use DDD\Model\User\User;

interface UserFactory
{
    public function create(string $email, string $plainPassword, array $roles = [], ?string $name = null, ?string $avatar = null): User;

    public function createWithPlainPassword(string $email, string $plainPassword, array $roles = [], ?string $name = null, ?string $avatar = null): User;
}
