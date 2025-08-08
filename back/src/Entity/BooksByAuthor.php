<?php

namespace App\Entity;

class BooksByAuthor
{
    private int $authorId;

    private string $authorName;

    private ?string $bookTitles = null;

    private ?string $subjects = null;

    public function getAuthorId(): int
    {
        return $this->authorId;
    }

    public function getAuthorName(): string
    {
        return $this->authorName;
    }

    public function getBookTitles(): ?string
    {
        return $this->bookTitles;
    }

    public function getSubjects(): ?string
    {
        return $this->subjects;
    }
}
