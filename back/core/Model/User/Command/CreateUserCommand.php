<?php

declare(strict_types=1);

namespace DDD\Model\User\Command;

use Symfony\Component\Validator\Constraints as Assert;

class CreateUserCommand
{
    public function __construct(
        #[Assert\NotBlank(message: 'Email is required')]
        #[Assert\Email(message: 'Please provide a valid email address')]
        #[Assert\Length(max: 180, maxMessage: 'Email cannot be longer than {{ limit }} characters')]
        private readonly string $email,
        
        #[Assert\NotBlank(message: 'Password is required')]
        #[Assert\Length(min: 8, minMessage: 'Password must be at least {{ limit }} characters long')]
        #[Assert\Regex(
            pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/',
            message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
        )]
        private readonly string $password,
        
        #[Assert\Type(type: 'array')]
        private readonly array $roles = ['ROLE_USER'],
    ) {
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }
}
