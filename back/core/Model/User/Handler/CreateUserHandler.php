<?php

namespace DDD\Model\User\Handler;

use DDD\Model\User\Command\CreateUserCommand;
use DDD\Model\User\Exception\UserEmailAlreadyExistsException;
use DDD\Model\User\Repository\UserRepositoryInterface;
use DDD\Model\User\Service\UserFactory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User as UserEntity;

class CreateUserHandler
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly UserFactory $userFactory,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
    }

    public function __invoke(CreateUserCommand $command): void
    {
        // Check if user with this email already exists
        $existingUser = $this->userRepository->findByEmail($command->getEmail());
        if ($existingUser !== null) {
            throw new UserEmailAlreadyExistsException();
        }

        // Create a temporary user entity for password hashing
        $tempUser = new UserEntity();
        $hashedPassword = $this->passwordHasher->hashPassword($tempUser, $command->getPassword());

        // Create the domain user
        $user = $this->userFactory->create($command->getEmail(), $hashedPassword);
        
        // Convert to entity and set roles
        $userEntity = new UserEntity();
        $userEntity->setEmail($user->getEmail());
        $userEntity->setPassword($user->getPassword());
        $userEntity->setRoles($command->getRoles());

        $this->userRepository->save($userEntity);
    }
}
