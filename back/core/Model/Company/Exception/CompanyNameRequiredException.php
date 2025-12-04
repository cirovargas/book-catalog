<?php

declare(strict_types=1);

namespace DDD\Model\Company\Exception;

class CompanyNameRequiredException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Company name is required');
    }
}
