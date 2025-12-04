<?php

declare(strict_types=1);

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\Company;
use DDD\Model\Company\Repository\CompanyRepositoryInterface;

/**
 * @extends ServiceEntityRepository<Company>
 *
 * @phpstan-ignore-next-line generics.interfaceConflict
 */
class CompanyRepository extends ServiceEntityRepository implements CompanyRepositoryInterface
{
    public function getEntityClassName(): string
    {
        return Company::class;
    }

    public function get(int $id): ?Company
    {
        return $this->find($id);
    }

    public function getAll(): iterable
    {
        return $this->findAll();
    }

    public function getPaginated(
        int $page = 1,
        int $limit = 10,
        ?string $search = null,
        ?int $communicationVehicleTypeId = null,
        ?string $status = 'active',
    ): array {
        $queryBuilder = $this->createQueryBuilder('c');

        // Default filter: only active companies (RN002)
        if (null !== $status) {
            $queryBuilder->andWhere('c.status = :status')
                ->setParameter('status', $status);
        }

        // Search by corporate name, trade name, or CNPJ
        if (null !== $search && '' !== $search) {
            $queryBuilder->andWhere('c.corporateName LIKE :search OR c.tradeName LIKE :search OR c.cnpj LIKE :search')
                ->setParameter('search', '%' . $search . '%');
        }

        // Filter by Communication Vehicle Type
        if (null !== $communicationVehicleTypeId) {
            $queryBuilder->andWhere('c.communicationVehicleTypeId = :typeId')
                ->setParameter('typeId', $communicationVehicleTypeId);
        }

        // Get total count
        $totalQb = clone $queryBuilder;
        $total = (int) $totalQb->select('COUNT(c.id)')->getQuery()->getSingleScalarResult();

        // Get paginated results
        /** @var list<Company> $companies */
        $companies = $queryBuilder->select('c')
            ->orderBy('c.id', 'DESC')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        return [
            'companies' => $companies,
            'total' => $total,
        ];
    }

    public function getByIds(array $ids): iterable
    {
        return $this->findBy(['id' => $ids]);
    }

    public function findByCnpj(string $cnpj): ?Company
    {
        // Normalize CNPJ for search
        $normalizedCnpj = preg_replace('/[^0-9]/', '', $cnpj);

        return $this->findOneBy(['cnpj' => $normalizedCnpj]);
    }
}
