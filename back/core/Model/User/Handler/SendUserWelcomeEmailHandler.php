<?php

namespace DDD\Model\User\Handler;

use DDD\Application\Service\Mailer;
use DDD\Model\User\Command\SendUserWelcomeEmailCommand;

class SendUserWelcomeEmailHandler
{
    public function __construct(private readonly Mailer $mailer)
    {
    }

    public function __invoke(SendUserWelcomeEmailCommand $command): void
    {
        $this->mailer->send(
            $command->getEmail(),
            'Welcome to the system!',
            ''
        );
    }
}
