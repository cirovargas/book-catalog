<?php

namespace DDD\Application\Service;

use DDD\Model\User\User;

interface UserPasswordEncoder
{
    public function encode(User $user, string $password): string;
}
