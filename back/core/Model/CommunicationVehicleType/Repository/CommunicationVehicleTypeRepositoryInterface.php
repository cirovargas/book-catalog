<?php

declare(strict_types=1);

namespace DDD\Model\CommunicationVehicleType\Repository;

use DDD\Application\Repository\AbstractRepository;
use DDD\Model\CommunicationVehicleType\CommunicationVehicleType;

/**
 * @extends AbstractRepository<CommunicationVehicleType>
 *
 * @template-extends AbstractRepository<CommunicationVehicleType>
 */
interface CommunicationVehicleTypeRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?CommunicationVehicleType;

    /**
     * @return iterable<CommunicationVehicleType>
     */
    public function getAll(): iterable;

    /**
     * @return array{communication_vehicle_types: iterable<CommunicationVehicleType>, total: int}
     */
    public function getPaginated(int $page = 1, int $limit = 10, ?string $search = null): array;

    /**
     * @param array<int> $ids
     *
     * @return iterable<CommunicationVehicleType>
     */
    public function getByIds(array $ids): iterable;
}

