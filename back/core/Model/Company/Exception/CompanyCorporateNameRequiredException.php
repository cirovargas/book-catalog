<?php

declare(strict_types=1);

namespace DDD\Model\Company\Exception;

class CompanyCorporateNameRequiredException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Company corporate name is required');
    }
}

