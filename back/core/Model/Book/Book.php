<?php

namespace DDD\Model\Book;

class Book
{
    protected ?int $id = null;

    public function __construct(
        protected string $title,
        protected int $edition,
        protected string $publishYear,
        protected int $price,
        protected string $publisher,
        protected iterable $subjects,
        protected iterable $authors
    ) {
    }

    public function update(
        string $title,
        int $edition,
        string $publishYear,
        int $price,
        string $publisher,
        iterable $subjects,
        iterable $authors
    ) {
        $this->title = $title;
        $this->edition = $edition;
        $this->publishYear = $publishYear;
        $this->price = $price;
        $this->publisher = $publisher;
        $this->subjects = $subjects;
        $this->authors = $authors;
    }

    public function getId(): ?int
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

    public function getPublishYear(): string
    {
        return $this->publishYear;
    }

    public function getPrice(): int
    {
        return $this->price;
    }

    public function getPublisher(): string
    {
        return $this->publisher;
    }

    public function getSubjects(): iterable
    {
        return $this->subjects;
    }

    public function getAuthors(): iterable
    {
        return $this->authors;
    }
}
