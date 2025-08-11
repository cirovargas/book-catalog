<?php

namespace DDD\Model\User\Service;

use DDD\Model\User\User;

interface UserFactory
{
    public function create(string $email, string $hashedPassword): User;
}
