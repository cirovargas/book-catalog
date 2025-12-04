<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Handler;

use DDD\Model\CommunicationVehicleType\Command\UpdateCommunicationVehicleTypeCommand;
use DDD\Model\CommunicationVehicleType\CommunicationVehicleType;
use DDD\Model\CommunicationVehicleType\Exception\CommunicationVehicleTypeNameRequiredException;
use DDD\Model\CommunicationVehicleType\Exception\CommunicationVehicleTypeNotFoundException;
use DDD\Model\CommunicationVehicleType\Repository\CommunicationVehicleTypeRepositoryInterface;

class UpdateCommunicationVehicleTypeHandler
{
    public function __construct(
        private readonly CommunicationVehicleTypeRepositoryInterface $communicationVehicleTypeRepository,
    ) {
    }

    public function __invoke(UpdateCommunicationVehicleTypeCommand $command): void
    {
        $communicationVehicleType = $this->communicationVehicleTypeRepository->get($command->getId());

        if (!$communicationVehicleType instanceof CommunicationVehicleType) {
            throw new CommunicationVehicleTypeNotFoundException();
        }

        if ('' === trim($command->getName())) {
            throw new CommunicationVehicleTypeNameRequiredException();
        }

        $communicationVehicleType->setName($command->getName());
        $communicationVehicleType->setDescription($command->getDescription());
        $communicationVehicleType->setStatus($command->getStatus());

        $this->communicationVehicleTypeRepository->save($communicationVehicleType);
    }
}

