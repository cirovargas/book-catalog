<?php

namespace DDD\Model\Author;

class Author
{
    protected ?int $id = null;

    protected string $name;

    /*
     * @var DDD\Model\Book\Book[]
     */
    protected iterable $books;

    public function __construct(string $name)
    {
        $this->name = $name;
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
