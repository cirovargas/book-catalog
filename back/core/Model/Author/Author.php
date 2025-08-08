<?php

namespace DDD\Model\Author;

class Author
{
    protected ?int $id = null;

    /*
     * @var DDD\Model\Book\Book[]
     */
    protected iterable $books;

    public function __construct(protected string $name)
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }
}
