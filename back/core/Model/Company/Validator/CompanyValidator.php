<?php

declare(strict_types=1);

namespace DDD\Model\Company\Validator;

use DDD\Model\Company\Exception\InvalidCnpjException;

class CompanyValidator
{
    public function validateEmail(string $email): void
    {
        if (!filter_var($email, \FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email format');
        }
    }

    public function validateCnpj(string $cnpj): void
    {
        // Remove non-numeric characters
        $cnpj = (string) preg_replace('/[^0-9]/', '', $cnpj);

        // Check if it has 14 digits
        if (14 !== strlen((string) $cnpj)) {
            throw new InvalidCnpjException('CNPJ must have 14 digits');
        }

        // Check for known invalid sequences (all same digits)
        if (preg_match('/^(\d)\1{13}$/', (string) $cnpj)) {
            throw new InvalidCnpjException('CNPJ cannot be a sequence of repeated digits');
        }

        // Validate check digits
        if (!$this->validateCnpjCheckDigits($cnpj)) {
            throw new InvalidCnpjException('Invalid CNPJ check digits');
        }
    }

    public function validateCep(string $cep): void
    {
        $cep = (string) preg_replace('/[^0-9]/', '', $cep);

        if (8 !== strlen((string) $cep)) {
            throw new \InvalidArgumentException('CEP must have 8 digits');
        }
    }

    public function validateState(string $state): void
    {
        $validStates = [
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
            'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
            'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
        ];

        if (!\in_array(strtoupper($state), $validStates, true)) {
            throw new \InvalidArgumentException('Invalid Brazilian state (UF)');
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
