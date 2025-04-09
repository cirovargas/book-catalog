<?php

namespace DDD\Model\Book\Handler;

use DDD\Model\Author\Repository\AuthorRepositoryInterface;
use DDD\Model\Book\Command\UpdateBookCommand;
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
        $book = $this->bookRepository->find($command->getId());
        if ($book === null) {
            throw new \RuntimeException('Book not found');
        }

        $author = $this->authorRepository->find($command->getAuthorId());
        if ($author === null) {
            throw new \RuntimeException('Author not found');
        }

        $subject = $this->subjectRepository->find($command->getSubjectId());
        if ($subject === null) {
            throw new \RuntimeException('Subject not found');
        }

        $book->setTitle($command->getTitle());
        $book->setEdition($command->getEdition());
        $book->setPublishYear($command->getPublishYear());
        $book->setPrice($command->getPrice());
        $book->setPublisher($command->getPublisher());
        $book->setAuthor($author);
        $book->setSubject($subject);
        
        $this->bookRepository->save($book);
    }
} 