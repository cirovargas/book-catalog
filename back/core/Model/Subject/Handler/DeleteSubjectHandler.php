<?php

namespace DDD\Model\Subject\Handler;

use DDD\Model\Subject\Command\DeleteSubjectCommand;
use DDD\Model\Subject\Exception\SubjectNotFoundException;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;

class DeleteSubjectHandler
{
    public function __construct(
        private readonly SubjectRepositoryInterface $subjectRepository
    ) {
    }

    public function __invoke(DeleteSubjectCommand $command): void
    {
        $subject = $this->subjectRepository->find($command->getId());

        if ($subject === null) {
            throw new SubjectNotFoundException();
        }

        $this->subjectRepository->delete($subject);
    }
}
