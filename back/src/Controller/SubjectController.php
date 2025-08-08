<?php

namespace App\Controller;

use App\Exception\BadJsonBodyException;
use DDD\Model\Subject\Command\CreateSubjectCommand;
use DDD\Model\Subject\Command\DeleteSubjectCommand;
use DDD\Model\Subject\Command\UpdateSubjectCommand;
use DDD\Model\Subject\Exception\SubjectDescriptionRequiredException;
use DDD\Model\Subject\Exception\SubjectNotFoundException;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;
use App\Bridge\Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class SubjectController extends AbstractController
{
    public function __construct(
        private readonly SubjectRepositoryInterface $subjectRepository,
        private readonly MessageBusInterface $commandBus
    ) {
    }
    #[Route('/api/subjects', name: 'subjects_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->jsonSuccessResponse($this->subjectRepository->findAll());
    }
    #[Route('/api/subjects/{id}', name: 'subjects_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $subject = $this->subjectRepository->find($id);

        if ($subject === null) {
            return $this->jsonNotFoundResponse('Assunto não encontrado');
        }

        return $this->jsonSuccessResponse($subject);
    }
    #[Route('/api/subjects', name: 'subjects_create', methods: ['POST'])]
    public function create(): JsonResponse
    {
        try {
            $command = $this->getRequestContent(CreateSubjectCommand::class);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'Assunto cadastrado com sucesso!',
                Response::HTTP_CREATED
            );
        } catch (SubjectDescriptionRequiredException) {
            return $this->jsonErrorResponse('O campo descrição é obrigatório');
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
    }
    #[Route('/api/subjects/{id}', name: 'subjects_update', methods: ['PUT'])]
    public function update(int $id): JsonResponse
    {
        try {
            $command = $this->getRequestContent(UpdateSubjectCommand::class, ['id' => $id]);
            $this->commandBus->dispatch($command);
        } catch (SubjectDescriptionRequiredException) {
            return $this->jsonErrorResponse('O campo descrição é obrigatório');
        } catch (SubjectNotFoundException) {
            return $this->jsonNotFoundResponse('O assunto não foi encontrado');
        } catch (BadJsonBodyException) {
            return $this->jsonErrorResponse('Body mal formatado');
        }

        return $this->jsonSuccessResponse('Assunto atualizado com sucesso!');
    }
    #[Route('/api/subjects/{id}', name: 'subjects_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteSubjectCommand($id);
            $this->commandBus->dispatch($command);
        } catch (SubjectNotFoundException) {
            return $this->jsonNotFoundResponse('O assunto não foi encontrado');
        }

        return $this->jsonSuccessResponse('Assunto excluído com sucesso!');
    }
}
