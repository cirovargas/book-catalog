<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Author;
use DDD\Model\Author\Author as ModelAuthor;
use DDD\Model\Author\Service\AuthorFactory as AuthorFactoryInterface;

class AuthorFactory implements AuthorFactoryInterface
{
    public function create(string $name): ModelAuthor
    {
        return new Author($name);
    }
}
