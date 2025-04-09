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

#[Route('/api/subjects')]
class SubjectController extends AbstractController
{
    public function __construct(
        private readonly SubjectRepositoryInterface $subjectRepository,
        private readonly MessageBusInterface $commandBus
    ) {
    }

    #[Route('', name: 'subjects_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->jsonSuccessResponse($this->subjectRepository->findAll());
    }

    #[Route('/{id}', name: 'subjects_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $subject = $this->subjectRepository->find($id);
        
        if ($subject === null) {
            return $this->jsonNotFoundResponse('Assunto não encontrado');
        }
        
        return $this->jsonSuccessResponse($subject);
    }

    #[Route('', name: 'subjects_create', methods: ['POST'])]
    public function create(): JsonResponse
    {
        try {
            $command = $this->getRequestContent(CreateSubjectCommand::class);
            $this->commandBus->dispatch($command);

            return $this->jsonSuccessResponse(
                'Assunto cadastrado com sucesso!',
                Response::HTTP_CREATED
            );
        } catch (SubjectDescriptionRequiredException $exception) {
            return $this->jsonErrorResponse('O campo descrição é obrigatório');
        } catch (BadJsonBodyException $exception) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
    }

    #[Route('/{id}', name: 'subjects_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $command = new UpdateSubjectCommand($id, $data['description']);
            $this->commandBus->dispatch($command);
        } catch (SubjectDescriptionRequiredException $exception) {
            return $this->jsonErrorResponse('O campo descrição é obrigatório');
        }  catch (SubjectNotFoundException $exception) {
            return $this->jsonNotFoundResponse('O assunto não foi encontrado');
        } catch (BadJsonBodyException $exception) {
            return $this->jsonErrorResponse('Body mal formatado');
        }
        
        return $this->jsonSuccessResponse('Assunto atualizado com sucesso!');
    }

    #[Route('/{id}', name: 'subjects_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $command = new DeleteSubjectCommand($id);
            $this->commandBus->dispatch($command);
        }  catch (SubjectNotFoundException $exception) {
            return $this->jsonNotFoundResponse('O assunto não foi encontrado');
        }

        return $this->jsonSuccessResponse('Assunto excluído com sucesso!');
    }
} 