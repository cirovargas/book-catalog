<?php

namespace App\Controller;

use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Exception\BadJsonBodyException;
use DDD\Model\User\Command\CreateUserCommand;
use DDD\Model\User\Command\DeleteUserCommand;
use DDD\Model\User\Command\UpdateUserCommand;
use DDD\Model\User\Exception\UserEmailAlreadyExistsException;
use DDD\Model\User\Exception\UserNotFoundException;
use DDD\Model\User\Repository\UserRepositoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly MessageBusInterface $commandBus,
    ) {
    }

    #[Route('/api/users', name: 'users_list', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function list(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query->get('page', 1));
        $limit = min(100, max(1, (int) $request->query->get('limit', 10)));
        $search = $request->query->get('search');

        $result = $this->userRepository->getPaginated($page, $limit, $search);

        return $this->jsonSuccessResponse([
            'users' => $result['users'],
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $result['total'],
                'pages' => ceil($result['total'] / $limit),
            ],
        ]);
    }

    #[Route('/api/users/{id}', name: 'users_show', methods: ['GET'], requirements: ['id' => '\d+'])]
    #[IsGranted('ROLE_ADMIN')]
    public function show(int $id): JsonResponse
    {
        $user = $this->userRepository->get($id);

        if (!$user instanceof \DDD\Model\User\User) {
            return $this->jsonNotFoundResponse('User not found');
        }

        return $this->jsonSuccessResponse($user);
    }

    #[Route('/api/users', name: 'users_create', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function create(
        #[MapRequestPayload] CreateUserCommand $command,
    ): JsonResponse {
        try {
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'User created successfully!',
                Response::HTTP_CREATED
            );
        } catch (UserEmailAlreadyExistsException) {
            return $this->jsonErrorResponse('A user with this email already exists', Response::HTTP_CONFLICT);
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Invalid JSON body', Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/users/{id}', name: 'users_update', methods: ['PUT'], requirements: ['id' => '\d+'])]
    #[IsGranted('ROLE_ADMIN')]
    public function update(int $id): JsonResponse
    {
        try {
            $command = $this->mapRequestContent(UpdateUserCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse('User updated successfully!');
        } catch (UserNotFoundException) {
            return $this->jsonNotFoundResponse('User not found');
        } catch (UserEmailAlreadyExistsException) {
            return $this->jsonErrorResponse('A user with this email already exists', Response::HTTP_CONFLICT);
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Invalid JSON body', Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/users/{id}', name: 'users_delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteUserCommand($id);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse('User deleted successfully!');
        } catch (UserNotFoundException) {
            return $this->jsonNotFoundResponse('User not found');
        }
    }
}
