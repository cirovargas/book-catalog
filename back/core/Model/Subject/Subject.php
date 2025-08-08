<?php

namespace DDD\Model\Subject;

class Subject
{
    protected ?int $id = null;

    /*
     * @var DDD\Model\Book\Book[]
     */
    protected iterable $books;

    public function __construct(protected string $description)
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
}
