<?php

namespace App\Service;

use DDD\Application\Service\Mailer as DomainMailerService;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class Mailer implements DomainMailerService
{
    public function __construct(
        private readonly MailerInterface $mailer,
        private readonly Environment $twig
    ) {
    }

    public function send(string $to, string $subject, string $body): void
    {
        $email = (new Email())
            ->from('noreply@project.com')
            ->to($to)
            ->subject($subject)
            ->html($body);

        $this->mailer->send($email);
    }

    /**
     * @param array<string, mixed> $context
     */
    public function sendTemplated(string $to, string $subject, string $template, array $context): void
    {
        $body = $this->twig->render($template, $context);

        $email = (new Email())
            ->from('noreply@project.com')
            ->to($to)
            ->subject($subject)
            ->html($body);

        $this->mailer->send($email);
    }
}
