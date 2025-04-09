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
    private EventRecorder $eventRecorder;
    private EventDispatcherInterface $eventDispatcher;

    public function __construct(EventRecorder $eventRecorder, EventDispatcherInterface $eventDispatcher)
    {
        $this->eventRecorder = $eventRecorder;
        $this->eventDispatcher = $eventDispatcher;
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
        foreach ($recordedEvents as $event) {
            $this->eventDispatcher->dispatch($event);
        }
        return $envelope;
    }
}
