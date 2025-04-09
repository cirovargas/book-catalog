<?php

namespace DDD\Application\Event;

interface EventRecorder
{
    public function releaseEvents(): array;

    public function eraseEvents();

    public function record(Event $event);
}
