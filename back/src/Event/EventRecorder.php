<?php

declare(strict_types=1);

namespace App\Event;

use DDD\Application\Event\Event;
use DDD\Application\Event\EventRecorder as EventRecorderInterface;
class EventRecorder implements EventRecorderInterface
{
    /**
     * @var Event[]
     */
    private array $recordedEvents = [];

    public function releaseEvents(): array
    {
        $events = $this->recordedEvents;
        $this->eraseEvents();
        return $events;
    }

    public function eraseEvents()
    {
        $this->recordedEvents = [];
    }

    public function record(Event $event)
    {
        $this->recordedEvents[] = $event;
    }
}
