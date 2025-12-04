<?php

declare(strict_types=1);

namespace DDD\Model\Company\Validator;

use DDD\Model\Company\Exception\InvalidCnpjException;

class CompanyValidator
{
    public function validateCnpj(string $cnpj): void
    {
        // Remove non-numeric characters
        $cnpj = preg_replace('/[^0-9]/', '', $cnpj);

        // Check if it has 14 digits
        if (strlen($cnpj) !== 14) {
            throw new InvalidCnpjException('CNPJ must have 14 digits');
        }

        // Check for known invalid sequences (all same digits)
        if (preg_match('/^(\d)\1{13}$/', $cnpj)) {
            throw new InvalidCnpjException('CNPJ cannot be a sequence of repeated digits');
        }

        // Validate check digits
        if (!$this->validateCnpjCheckDigits($cnpj)) {
            throw new InvalidCnpjException('Invalid CNPJ check digits');
        }
    }

    private function validateCnpjCheckDigits(string $cnpj): bool
    {
        // First check digit
        $sum = 0;
        $weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        for ($i = 0; $i < 12; ++$i) {
            $sum += ((int) $cnpj[$i]) * $weights[$i];
        }

        $remainder = $sum % 11;
        $firstCheckDigit = $remainder < 2 ? 0 : 11 - $remainder;

        if ((int) $cnpj[12] !== $firstCheckDigit) {
            return false;
        }

        // Second check digit
        $sum = 0;
        $weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        for ($i = 0; $i < 13; ++$i) {
            $sum += ((int) $cnpj[$i]) * $weights[$i];
        }

        $remainder = $sum % 11;
        $secondCheckDigit = $remainder < 2 ? 0 : 11 - $remainder;

        return (int) $cnpj[13] === $secondCheckDigit;
    }
}

