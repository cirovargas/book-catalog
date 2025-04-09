<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\Subject;
use DDD\Model\Subject\Service\SubjectFactory as SubjectFactoryInterface;
use DDD\Model\Subject\Subject as ModelSubject;

class SubjectFactory implements SubjectFactoryInterface
{
    public function create(string $description): ModelSubject
    {
        return new Subject($description);
    }

}
