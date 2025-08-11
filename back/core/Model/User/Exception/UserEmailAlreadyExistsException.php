<?php

namespace DDD\Model\User\Exception;

class UserEmailAlreadyExistsException extends \Exception
{
    public function __construct(string $message = 'A user with this email already exists', int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
