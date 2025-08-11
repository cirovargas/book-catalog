<?php

namespace DDD\Model\User\Handler;

use DDD\Model\User\Command\DeleteUserCommand;
use DDD\Model\User\Exception\UserNotFoundException;
use DDD\Model\User\Repository\UserRepositoryInterface;

class DeleteUserHandler
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
    ) {
    }

    public function __invoke(DeleteUserCommand $command): void
    {
        $user = $this->userRepository->get($command->getId());

        if (!$user instanceof \DDD\Model\User\User) {
            throw new UserNotFoundException();
        }

        $this->userRepository->delete($user);
    }
}
