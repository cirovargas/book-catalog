<?php

namespace App\Event\Subscriber;

use DDD\Model\User\Command\SendUserWelcomeEmailCommand;
use DDD\Model\User\Event\UserRegisteredEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class UserSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly MessageBusInterface $commandBus)
    {
    }

    public static function getSubscribedEvents(): array
    {
        // return the subscribed events, their methods and priorities
        return [
            UserRegisteredEvent::class => [
                ['userRegistered', 0],
            ],
        ];
    }

    public function userRegistered(UserRegisteredEvent $event): void
    {
        $this->commandBus->dispatch(new SendUserWelcomeEmailCommand($event->getName(), $event->getEmail(), $event->getPlainPassword()));
    }
}
