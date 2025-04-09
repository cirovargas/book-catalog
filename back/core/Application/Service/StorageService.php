<?php

namespace DDD\Application\Service;

use DDD\Application\ValueObject\StorageFile;

interface StorageService
{

    public function save(string $pathname, string $filename): StorageFile;

    public function get(string $filename): StorageFile;

}
