<?php

namespace DDD\Model\Category;

class Category
{
    protected ?int $id;

    protected string $name;

    protected ?string $description;

    public function __construct(string $name, ?string $description = null)
    {
        $this->name = trim($name);
        $this->description = $description;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
}
