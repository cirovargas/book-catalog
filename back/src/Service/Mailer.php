<?php

namespace App\Service;

use DDD\Application\Service\Mailer as DomainMailerService;

class Mailer implements DomainMailerService
{
    public function send(string $to, string $subject, string $body): void
    {
        // TODO: Implement send() method.
    }

    public function sendTemplated(string $to, string $subject, string $template, array $context): void
    {
        // TODO: Implement sendTemplated() method.
    }
}
