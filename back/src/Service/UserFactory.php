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

    /**
     * @param array<string> $roles
     */
    public function create(string $email, string $hashedPassword, array $roles = [], ?string $name = null, ?string $avatar = null): User
    {
        if ('' === trim($email)) {
            throw new \InvalidArgumentException('Email cannot be empty');
        }
        
        /** @var non-empty-string $validatedEmail */
        $validatedEmail = trim($email);
        
        $user = new UserEntity($validatedEmail, $hashedPassword, $name, $avatar);
        $user->setRoles(array_values($roles)); // Ensure it's a list, not an associative array
        return $user;
    }

    /**
     * @param array<string> $roles
     */
    public function createWithPlainPassword(string $email, string $plainPassword, array $roles = [], ?string $name = null, ?string $avatar = null): User
    {
        if ('' === trim($email)) {
            throw new \InvalidArgumentException('Email cannot be empty');
        }
        
        /** @var non-empty-string $validatedEmail */
        $validatedEmail = trim($email);
        
        // Create a temporary entity just for password hashing
        $tempEntity = new UserEntity($validatedEmail, 'temp', null, null);
        $hashedPassword = $this->passwordHasher->hashPassword($tempEntity, $plainPassword);

        // Create the actual user entity with the hashed password
        $user = new UserEntity($validatedEmail, $hashedPassword, $name, $avatar);
        $user->setRoles(array_values($roles)); // Ensure it's a list, not an associative array
        return $user;
    }
}
