<?php

namespace App\Repository;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Entity\User;
use DDD\Model\User\Repository\UserRepositoryInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository implements UserRepositoryInterface, PasswordUpgraderInterface
{
    public function getEntityClassName(): string
    {
        return User::class;
    }

    public function get(int $id): ?User
    {
        return $this->find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->findOneBy(['email' => $email]);
    }

    /**
     * @return iterable<User>
     */
    public function getAll(): iterable
    {
        return $this->findAll();
    }

    /**
     * @return array{users: iterable<User>, total: int}
     */
    public function getPaginated(int $page = 1, int $limit = 10, ?string $search = null): array
    {
        $queryBuilder = $this->createQueryBuilder('u');

        if (null !== $search && '' !== $search) {
            $queryBuilder->andWhere('u.email LIKE :search')
               ->setParameter('search', '%' . $search . '%');
        }

        // Get total count
        $totalQb = clone $queryBuilder;
        $total = (int) $totalQb->select('COUNT(u.id)')->getQuery()->getSingleScalarResult();

        // Get paginated results
        $users = $queryBuilder->select('u')
                   ->orderBy('u.id', 'DESC')
                   ->setFirstResult(($page - 1) * $limit)
                   ->setMaxResults($limit)
                   ->getQuery()
                   ->getResult();

        return [
            'users' => $users,
            'total' => $total,
        ];
    }

    /**
     * @param array<int> $ids
     *
     * @return iterable<User>
     */
    public function getByIds(array $ids): iterable
    {
        return $this->findBy(['id' => $ids]);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
}
