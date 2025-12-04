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
        ?string $cnpj = null,
        ?string $status = 'active'
    ): array {
        $queryBuilder = $this->createQueryBuilder('c');

        // Default filter: only active companies (RN002)
        if (null !== $status) {
            $queryBuilder->andWhere('c.status = :status')
                ->setParameter('status', $status);
        }

        // Search by corporate name or trade name
        if (null !== $search && '' !== $search) {
            $queryBuilder->andWhere('c.corporateName LIKE :search OR c.tradeName LIKE :search')
                ->setParameter('search', '%'.$search.'%');
        }

        // Filter by CNPJ
        if (null !== $cnpj && '' !== $cnpj) {
            $normalizedCnpj = preg_replace('/[^0-9]/', '', $cnpj);
            $queryBuilder->andWhere('c.cnpj LIKE :cnpj')
                ->setParameter('cnpj', '%'.$normalizedCnpj.'%');
        }

        // Get total count
        $totalQb = clone $queryBuilder;
        $total = (int) $totalQb->select('COUNT(c.id)')->getQuery()->getSingleScalarResult();

        // Get paginated results
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
