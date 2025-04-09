<?php

namespace DDD\Model\Book\Command;

class UpdateBookCommand
{
    public function __construct(
        private readonly int $id,
        private readonly string $title,
        private readonly int $edition,
        private readonly int $publishYear,
        private readonly float $price,
        private readonly string $publisher,
        private readonly int $subjectId,
        private readonly int $authorId
    ) {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getEdition(): int
    {
        return $this->edition;
    }

    public function getPublishYear(): int
    {
        return $this->publishYear;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getPublisher(): string
    {
        return $this->publisher;
    }

    public function getSubjectId(): int
    {
        return $this->subjectId;
    }

    public function getAuthorId(): int
    {
        return $this->authorId;
    }
} 