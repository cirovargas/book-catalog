<?php

namespace DDD\Application\Event;

interface EventRecorder
{
    /**
     * @return array<object>|Event[]
     */
    public function releaseEvents(): array;

    public function eraseEvents(): void;

    public function record(Event $event): void;
}
