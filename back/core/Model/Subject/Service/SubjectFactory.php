<?php

namespace DDD\Model\Subject\Service;

use DDD\Model\Subject\Subject;

interface SubjectFactory
{
    public function create(string $description): Subject;
}
