<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Handler;

use DDD\Model\CommunicationVehicleType\Command\DeleteCommunicationVehicleTypeCommand;
use DDD\Model\CommunicationVehicleType\CommunicationVehicleType;
use DDD\Model\CommunicationVehicleType\Exception\CommunicationVehicleTypeNotFoundException;
use DDD\Model\CommunicationVehicleType\Repository\CommunicationVehicleTypeRepositoryInterface;

class DeleteCommunicationVehicleTypeHandler
{
    public function __construct(
        private readonly CommunicationVehicleTypeRepositoryInterface $communicationVehicleTypeRepository,
    ) {
    }

    public function __invoke(DeleteCommunicationVehicleTypeCommand $command): void
    {
        $communicationVehicleType = $this->communicationVehicleTypeRepository->get($command->getId());

        if (!$communicationVehicleType instanceof CommunicationVehicleType) {
            throw new CommunicationVehicleTypeNotFoundException();
        }

        $this->communicationVehicleTypeRepository->delete($communicationVehicleType);
    }
}

