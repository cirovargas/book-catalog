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
        private readonly array $subjectIds,
        private readonly array $authorIds
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

    /*
     * @return int[]
     */
    public function getSubjectIds(): array
    {
        return $this->subjectIds;
    }

    /*
     * @return int[]
     */
    public function getAuthorIds(): array
    {
        return $this->authorIds;
    }
}
