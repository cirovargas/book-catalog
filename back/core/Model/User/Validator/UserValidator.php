<?php

namespace DDD\Model\User\Validator;

use DDD\Model\User\Exception\InvalidEmailException;
use DDD\Model\User\Exception\InvalidPasswordException;

class UserValidator
{
    public static function validateEmail(string $email): void
    {
        if (in_array(trim($email), ['', '0'], true)) {
            throw new InvalidEmailException('Email is required');
        }

        if (strlen($email) > 180) {
            throw new InvalidEmailException('Email cannot be longer than 180 characters');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidEmailException('Please provide a valid email address');
        }
    }

    public static function validatePassword(string $password): void
    {
        if ('' === $password || '0' === $password) {
            throw new InvalidPasswordException('Password is required');
        }

        if (strlen($password) < 8) {
            throw new InvalidPasswordException('Password must be at least 8 characters long');
        }

        if (in_array(preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/', $password), [0, false], true)) {
            throw new InvalidPasswordException('Password must contain at least one lowercase letter, one uppercase letter, and one number');
        }
    }

    public static function validateRoles(array $roles): void
    {
        if (!is_array($roles)) {
            throw new \InvalidArgumentException('Roles must be an array');
        }

        $validRoles = ['ROLE_USER', 'ROLE_ADMIN'];
        foreach ($roles as $role) {
            if (!in_array($role, $validRoles, true)) {
                throw new \InvalidArgumentException('Invalid role: ' . $role);
            }
        }
    }
}
