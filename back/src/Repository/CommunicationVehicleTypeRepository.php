<?php

declare(strict_types=1);

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\CommunicationVehicleType;
use DDD\Model\CommunicationVehicleType\Repository\CommunicationVehicleTypeRepositoryInterface;

/**
 * @extends ServiceEntityRepository<CommunicationVehicleType>
 *
 * @phpstan-ignore-next-line generics.interfaceConflict
 */
class CommunicationVehicleTypeRepository extends ServiceEntityRepository implements CommunicationVehicleTypeRepositoryInterface
{
    public function getEntityClassName(): string
    {
        return CommunicationVehicleType::class;
    }

    public function get(int $id): ?CommunicationVehicleType
    {
        return $this->find($id);
    }

    public function getAll(): iterable
    {
        return $this->findAll();
    }

    public function getPaginated(int $page = 1, int $limit = 10, ?string $search = null): array
    {
        $queryBuilder = $this->createQueryBuilder('cvt');

        if (null !== $search && '' !== $search) {
            $queryBuilder->andWhere('cvt.name LIKE :search')
                ->orWhere('cvt.description LIKE :search')
                ->setParameter('search', '%' . $search . '%');
        }

        // Get total count
        $totalQb = clone $queryBuilder;
        $total = (int)$totalQb->select('COUNT(cvt.id)')->getQuery()->getSingleScalarResult();

        // Get paginated results
        $communication_vehicle_types = $queryBuilder->select('cvt')
            ->orderBy('cvt.id', 'DESC')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        return [
            'communication_vehicle_types' => $communication_vehicle_types,
            'total' => $total,
        ];
    }

    public function getByIds(array $ids): iterable
    {
        return $this->findBy(['id' => $ids]);
    }
}

