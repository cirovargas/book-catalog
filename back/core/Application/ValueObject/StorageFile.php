<?php

declare(strict_types=1);

namespace DDD\Application\ValueObject;

class StorageFile implements \Stringable
{
    public function __construct(private readonly string $pathname, private readonly string $filename)
    {
    }

    public function __toString(): string
    {
        return $this->pathname.'/'.$this->filename;
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
