<?php

namespace DDD\Model\User\Handler;

use DDD\Model\User\Command\UpdateUserCommand;
use DDD\Model\User\Exception\UserNotFoundException;
use DDD\Model\User\Exception\UserEmailAlreadyExistsException;
use DDD\Model\User\Repository\UserRepositoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User as UserEntity;

class UpdateUserHandler
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
    }

    public function __invoke(UpdateUserCommand $command): void
    {
        $user = $this->userRepository->get($command->getId());

        if (!$user instanceof \DDD\Model\User\User) {
            throw new UserNotFoundException();
        }

        // Check if email is being changed and if new email already exists
        if ($user->getEmail() !== $command->getEmail()) {
            $existingUser = $this->userRepository->findByEmail($command->getEmail());
            if ($existingUser !== null && $existingUser->getId() !== $command->getId()) {
                throw new UserEmailAlreadyExistsException();
            }
        }

        // Update user properties
        $user->setEmail($command->getEmail());

        // Update password if provided
        if ($command->getPassword() !== null) {
            $tempUser = new UserEntity();
            $hashedPassword = $this->passwordHasher->hashPassword($tempUser, $command->getPassword());
            $user->setPassword($hashedPassword);
        }

        // Convert to entity and update roles
        $userEntity = $this->userRepository->get($command->getId());
        if ($userEntity instanceof UserEntity) {
            $userEntity->setEmail($user->getEmail());
            $userEntity->setPassword($user->getPassword());
            $userEntity->setRoles($command->getRoles());
            
            $this->userRepository->save($userEntity);
        }
    }
}
