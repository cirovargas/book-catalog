<?php

declare(strict_types=1);

namespace App\Middleware;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use DDD\Application\Event\EventRecorder;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Middleware\MiddlewareInterface;
use Symfony\Component\Messenger\Middleware\StackInterface;

class ReleaseRecordedEventsMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly EventRecorder $eventRecorder,
        private readonly EventDispatcherInterface $eventDispatcher
    ) {
    }

    public function handle(Envelope $envelope, StackInterface $stack): Envelope
    {
        try {
            $envelope = $stack->next()->handle($envelope, $stack);
        } catch (\Exception $exception) {
            $this->eventRecorder->eraseEvents();
            throw $exception;
        }

        $recordedEvents = $this->eventRecorder->releaseEvents();
        foreach ($recordedEvents as $recordedEvent) {
            $this->eventDispatcher->dispatch($recordedEvent);
        }

        return $envelope;
    }
}
