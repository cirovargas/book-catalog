<?php

declare(strict_types=1);

namespace DDD\Model\User\Command;

use Symfony\Component\Validator\Constraints as Assert;

class DeleteUserCommand
{
    public function __construct(
        #[Assert\NotBlank(message: 'User ID is required')]
        #[Assert\Type(type: 'integer')]
        #[Assert\Positive(message: 'User ID must be a positive integer')]
        private readonly int $id,
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }
}
