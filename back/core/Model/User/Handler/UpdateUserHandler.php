<?php

namespace DDD\Model\User\Handler;

use App\Entity\User as UserEntity;
use DDD\Model\User\Command\UpdateUserCommand;
use DDD\Model\User\Exception\UserEmailAlreadyExistsException;
use DDD\Model\User\Exception\UserNotFoundException;
use DDD\Model\User\Repository\UserRepositoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

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
            if ($existingUser instanceof \DDD\Model\User\User && $existingUser->getId() !== $command->getId()) {
                throw new UserEmailAlreadyExistsException();
            }
        }

        $user->setEmail($command->getEmail());
        $user->setName($command->getName());
        $user->setAvatar($command->getAvatar());

        // Update password if provided
        if (null !== $command->getPassword()) {
            $tempUser = new UserEntity();
            $hashedPassword = $this->passwordHasher->hashPassword($tempUser, $command->getPassword());
            $user->setPassword($hashedPassword);
        }

        // Convert to entity and update all properties
        $userEntity = $this->userRepository->get($command->getId());
        if ($userEntity instanceof UserEntity) {
            $userEntity->setEmail($user->getEmail());
            $userEntity->setPassword($user->getPassword());
            $userEntity->setRoles($command->getRoles());
            $userEntity->setName($user->getName());
            $userEntity->setAvatar($user->getAvatar());

            $this->userRepository->save($userEntity);
        }
    }
}
