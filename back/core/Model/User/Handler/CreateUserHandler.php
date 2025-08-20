<?php

namespace DDD\Model\User\Handler;

use DDD\Application\Event\EventRecorder;
use DDD\Model\User\Command\CreateUserCommand;
use DDD\Model\User\Event\UserRegisteredEvent;
use DDD\Model\User\Exception\UserEmailAlreadyExistsException;
use DDD\Model\User\Repository\UserRepositoryInterface;
use DDD\Model\User\Service\UserFactory;
use DDD\Model\User\User;

class CreateUserHandler
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly UserFactory $userFactory,
        private readonly EventRecorder $eventRecorder,
    ) {
    }

    public function __invoke(CreateUserCommand $command): void
    {
        $existingUser = $this->userRepository->findByEmail($command->getEmail());
        if ($existingUser instanceof User) {
            throw new UserEmailAlreadyExistsException();
        }

        $plainPassword = random_int(1, 9) . random_int(1, 9) . random_int(1, 9) . random_int(1, 9) . random_int(1, 9) . random_int(1, 9);

        $user = $this->userFactory->createWithPlainPassword(
            $command->getEmail(),
            $plainPassword,
            $command->getRoles(),
            $command->getName(),
            $command->getAvatar()
        );

        $this->userRepository->save($user);

        $this->eventRecorder->record(new UserRegisteredEvent($user->getName(), $user->getEmail(), $plainPassword));
    }
}
