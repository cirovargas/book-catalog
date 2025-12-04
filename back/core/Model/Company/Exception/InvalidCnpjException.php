<?php

declare(strict_types=1);

namespace DDD\Model\Company\Exception;

class InvalidCnpjException extends \Exception
{
    public function __construct(string $message = 'Invalid CNPJ')
    {
        parent::__construct($message);
    }
}
