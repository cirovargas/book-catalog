<?php

declare(strict_types=1);

namespace DDD\Model\Company\Exception;

class CompanyCnpjAlreadyExistsException extends \Exception
{
    public function __construct(string $cnpj)
    {
        parent::__construct(sprintf('Company with CNPJ %s already exists', $cnpj));
    }
}
