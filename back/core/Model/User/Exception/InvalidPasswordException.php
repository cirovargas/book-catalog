<?php

namespace DDD\Model\User\Exception;

class InvalidPasswordException extends \InvalidArgumentException
{
    public function __construct(string $message = 'Invalid password', int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
