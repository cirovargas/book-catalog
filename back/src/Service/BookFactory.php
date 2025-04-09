<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Book;
use DDD\Model\Book\Service\BookFactory as BookFactoryInterface;
use DDD\Model\Book\Book as ModelBook;

class BookFactory implements BookFactoryInterface
{
    public function create(
        string $title,
        int $edition,
        string $publishYear,
        int $price,
        string $publisher,
        iterable $subjects,
        iterable $authors
    ): ModelBook {
        return new Book(
            $title,
            $edition,
            $publishYear,
            $price,
            $publisher,
            $authors,
            $subjects
        );
    }

}
