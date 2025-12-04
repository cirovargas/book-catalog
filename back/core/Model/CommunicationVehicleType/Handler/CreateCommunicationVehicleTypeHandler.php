<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Handler;

use DDD\Model\CommunicationVehicleType\Command\CreateCommunicationVehicleTypeCommand;
use DDD\Model\CommunicationVehicleType\Exception\CommunicationVehicleTypeNameRequiredException;
use DDD\Model\CommunicationVehicleType\Repository\CommunicationVehicleTypeRepositoryInterface;
use DDD\Model\CommunicationVehicleType\Service\CommunicationVehicleTypeFactory;

class CreateCommunicationVehicleTypeHandler
{
    public function __construct(
        private readonly CommunicationVehicleTypeRepositoryInterface $communicationVehicleTypeRepository,
        private readonly CommunicationVehicleTypeFactory $communicationVehicleTypeFactory,
    ) {
    }

    public function __invoke(CreateCommunicationVehicleTypeCommand $command): void
    {
        if ('' === trim($command->getName())) {
            throw new CommunicationVehicleTypeNameRequiredException();
        }

        $communicationVehicleType = $this->communicationVehicleTypeFactory->create(
            $command->getName(),
            $command->getDescription(),
            $command->getStatus()
        );

        $this->communicationVehicleTypeRepository->save($communicationVehicleType);
    }
}

