<?php

namespace DDD\Model\Book\Service;

use DDD\Model\Book\Book;

interface BookFactory
{
    /**
     * @param iterable<\DDD\Model\Author\Author> $authors
     * @param iterable<\DDD\Model\Subject\Subject> $subjects
     */
    public function create(
        string $title,
        int $edition,
        string $publishYear,
        int $price,
        string $publisher,
        iterable $subjects,
        iterable $authors
    ): Book;
}
