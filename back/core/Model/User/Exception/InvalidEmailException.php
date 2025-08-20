<?php

namespace DDD\Model\User\Exception;

class InvalidEmailException extends \InvalidArgumentException
{
    public function __construct(string $message = 'Invalid email address', int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
