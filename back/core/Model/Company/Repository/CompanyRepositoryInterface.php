<?php

declare(strict_types=1);

namespace DDD\Model\Company\Repository;

use DDD\Application\Repository\AbstractRepository;
use DDD\Model\Company\Company;

/**
 * @extends AbstractRepository<Company>
 *
 * @template-extends AbstractRepository<Company>
 */
interface CompanyRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?Company;

    /**
     * @return iterable<Company>
     */
    public function getAll(): iterable;

    /**
     * @return array{companies: iterable<Company>, total: int}
     */
    public function getPaginated(
        int $page = 1,
        int $limit = 10,
        ?string $search = null,
        ?string $cnpj = null,
        ?string $status = 'active'
    ): array;

    /**
     * @param array<int> $ids
     *
     * @return iterable<Company>
     */
    public function getByIds(array $ids): iterable;

    public function findByCnpj(string $cnpj): ?Company;
}
