<?php
declare(strict_types=1);

namespace DDD\Application\Service;

interface Mailer
{
    public function send(string $to, string $subject, string $body): void;
}
