<?php

namespace DDD\Model\Book\Handler;

use App\Entity\Book;
use DDD\Model\Author\Repository\AuthorRepositoryInterface;
use DDD\Model\Book\Command\CreateBookCommand;
use DDD\Model\Book\Repository\BookRepositoryInterface;
use DDD\Model\Book\Service\BookFactory;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;


class CreateBookHandler
{
    public function __construct(
        private readonly BookRepositoryInterface $bookRepository,
        private readonly AuthorRepositoryInterface $authorRepository,
        private readonly SubjectRepositoryInterface $subjectRepository,
        private readonly BookFactory $bookFactory
    ) {
    }

    public function __invoke(CreateBookCommand $command): void
    {
        $authors = $this->authorRepository->getByIds($command->getAuthorIds());
        $subjects = $this->subjectRepository->getByIds($command->getSubjectIds());

        $book = $this->bookFactory->create(
            $command->getTitle(),
            $command->getEdition(),
            $command->getPublishYear(),
            $command->getPrice(),
            $command->getPublisher(),
            $authors,
            $subjects
        );

        $this->bookRepository->save($book);
    }
}
