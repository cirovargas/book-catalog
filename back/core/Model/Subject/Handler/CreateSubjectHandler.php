<?php

namespace DDD\Model\Subject\Handler;

use DDD\Model\Subject\Command\CreateSubjectCommand;
use DDD\Model\Subject\Exception\SubjectDescriptionRequiredException;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;
use DDD\Model\Subject\Service\SubjectFactory;

class CreateSubjectHandler
{
    public function __construct(
        private readonly SubjectRepositoryInterface $subjectRepository,
        private readonly SubjectFactory $subjectFactory
    ) {
    }

    public function __invoke(CreateSubjectCommand $command): void
    {
        if ($command->getDescription() == null) {
            throw new SubjectDescriptionRequiredException();
        }

        $subject = $this->subjectFactory->create($command->getDescription());
        $this->subjectRepository->save($subject);
    }
} 