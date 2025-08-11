<?php

namespace DDD\Model\User\Repository;

use DDD\Application\Repository\AbstractRepository;
use DDD\Model\User\User;

/**
 * @extends AbstractRepository<User>
 *
 * @template-extends AbstractRepository<User>
 */
interface UserRepositoryInterface extends AbstractRepository
{
    public function get(int $id): ?User;

    public function findByEmail(string $email): ?User;

    /**
     * @return iterable<User>
     */
    public function getAll(): iterable;

    /**
     * @return array{users: iterable<User>, total: int}
     */
    public function getPaginated(int $page = 1, int $limit = 10, ?string $search = null): array;

    /**
     * @param array<int> $ids
     *
     * @return iterable<User>
     */
    public function getByIds(array $ids): iterable;
}
