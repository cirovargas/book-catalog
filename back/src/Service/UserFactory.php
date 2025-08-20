<?php

namespace App\Service;

use App\Entity\User as UserEntity;
use DDD\Model\User\Service\UserFactory as UserFactoryInterface;
use DDD\Model\User\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFactory implements UserFactoryInterface
{
    public function __construct(
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
    }

    public function create(string $email, string $hashedPassword, array $roles = [], ?string $name = null, ?string $avatar = null): User
    {
        return new User($email, $hashedPassword, $name, $avatar);
    }

    public function createWithPlainPassword(string $email, string $plainPassword, array $roles = [], ?string $name = null, ?string $avatar = null): User
    {
        $tempEntity = new UserEntity();
        $hashedPassword = $this->passwordHasher->hashPassword($tempEntity, $plainPassword);

        return new User($email, $hashedPassword, $name, $avatar);
    }
}
