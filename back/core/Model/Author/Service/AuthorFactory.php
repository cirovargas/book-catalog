<?php

namespace DDD\Model\Author\Service;

use DDD\Model\Author\Author;

interface AuthorFactory
{
    public function create(string $name): Author;
}
