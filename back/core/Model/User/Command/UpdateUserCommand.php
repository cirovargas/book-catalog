<?php

declare(strict_types=1);

namespace DDD\Model\User\Command;

use Symfony\Component\Validator\Constraints as Assert;

class UpdateUserCommand
{
    public function __construct(
        #[Assert\NotBlank(message: 'User ID is required')]
        #[Assert\Type(type: 'integer')]
        #[Assert\Positive(message: 'User ID must be a positive integer')]
        private readonly int $id,
        
        #[Assert\NotBlank(message: 'Email is required')]
        #[Assert\Email(message: 'Please provide a valid email address')]
        #[Assert\Length(max: 180, maxMessage: 'Email cannot be longer than {{ limit }} characters')]
        private readonly string $email,
        
        #[Assert\Type(type: 'array')]
        private readonly array $roles = ['ROLE_USER'],
        
        #[Assert\Length(min: 8, minMessage: 'Password must be at least {{ limit }} characters long')]
        #[Assert\Regex(
            pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/',
            message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
        )]
        private readonly ?string $password = null,
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }
}
