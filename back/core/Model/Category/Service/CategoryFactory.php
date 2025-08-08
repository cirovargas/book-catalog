<?php

namespace DDD\Model\Category\Service;

use DDD\Model\Category\Category;

interface CategoryFactory
{
    public function create(string $name, ?string $description = null): Category;
}
