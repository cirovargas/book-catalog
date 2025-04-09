<?php

namespace DDD\Model\Subject\Handler;

use DDD\Model\Subject\Command\UpdateSubjectCommand;
use DDD\Model\Subject\Exception\SubjectDescriptionRequiredException;
use DDD\Model\Subject\Exception\SubjectNotFoundException;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;

class UpdateSubjectHandler
{
    public function __construct(
        private readonly SubjectRepositoryInterface $subjectRepository
    ) {
    }

    public function __invoke(UpdateSubjectCommand $command): void
    {
        $subject = $this->subjectRepository->find($command->getId());
        
        if ($subject === null) {
            throw new SubjectNotFoundException();
        }

        if ($command->getDescription() == null) {
            throw new SubjectDescriptionRequiredException();
        }
        
        $subject->setDescription($command->getDescription());
        $this->subjectRepository->save($subject);
    }
} 