<?php
declare(strict_types=1);

namespace DDD\Application\ValueObject;

class StorageFile
{

    private $pathname;

    private $filename;

    public function __construct(string $pathname, string $filename)
    {
        $this->pathname = $pathname;
        $this->filename = $filename;
    }

    public function __toString(): string
    {
        return $this->pathname . '/' . $this->filename;
    }

    public function getPathname(): string
    {
        return $this->pathname;
    }

    public function getFilename(): string
    {
        return $this->filename;
    }

    public function equals(StorageFile $file): bool
    {
        return $this->pathname === $file->pathname && $this->filename === $file->filename;
    }

}
