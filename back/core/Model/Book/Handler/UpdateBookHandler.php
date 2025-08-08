<?php

namespace DDD\Model\Book\Handler;

use DDD\Model\Author\Repository\AuthorRepositoryInterface;
use DDD\Model\Book\Command\UpdateBookCommand;
use DDD\Model\Book\Exception\BookNotFoundException;
use DDD\Model\Book\Repository\BookRepositoryInterface;
use DDD\Model\Subject\Repository\SubjectRepositoryInterface;

class UpdateBookHandler
{
    public function __construct(
        private readonly BookRepositoryInterface $bookRepository,
        private readonly AuthorRepositoryInterface $authorRepository,
        private readonly SubjectRepositoryInterface $subjectRepository
    ) {
    }

    public function __invoke(UpdateBookCommand $command): void
    {
        $book = $this->bookRepository->get($command->getId());
        if (!$book instanceof \App\Entity\Book) {
            throw new BookNotFoundException();
        }

        $authors = $this->authorRepository->getByIds($command->getAuthorIds());
        $subjects = $this->subjectRepository->getByIds($command->getSubjectIds());

        $book->update(
            $command->getTitle(),
            $command->getEdition(),
            $command->getPublishYear(),
            $command->getPrice(),
            $command->getPublisher(),
            $subjects,
            $authors
        );

        $this->bookRepository->save($book);
    }
}
