<?php

namespace App\Service;

use DDD\Model\User\Service\UserFactory as UserFactoryInterface;
use DDD\Model\User\User;

class UserFactory implements UserFactoryInterface
{
    public function create(string $email, string $hashedPassword): User
    {
        return new User($email, $hashedPassword);
    }
}
