<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Vote;

class UserVoter extends Voter
{
    public const VIEW = 'USER_VIEW';

    public const EDIT = 'USER_EDIT';

    public const DELETE = 'USER_DELETE';

    public const CREATE = 'USER_CREATE';

    public const LIST = 'USER_LIST';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // Only vote on User objects or when subject is null for CREATE/LIST operations
        if (in_array($attribute, [self::CREATE, self::LIST])) {
            return true;
        }

        return in_array($attribute, [self::VIEW, self::EDIT, self::DELETE])
            && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token, ?Vote $vote = null): bool
    {
        $user = $token->getUser();

        // If the user is anonymous, deny access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // Admins can do everything
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        // For non-admin users, check specific permissions
        return match ($attribute) {
            // Only admins can list users or create new users
            self::LIST, self::CREATE => false,
            // Users can view their own profile, admins can view any
            self::VIEW => $this->canView($subject, $user),
            // Users can edit their own profile, admins can edit any
            self::EDIT => $this->canEdit($subject, $user),
            // Only admins can delete users, and they cannot delete themselves
            self::DELETE => $this->canDelete($subject, $user),
            default => false,
        };
    }

    private function canView(User $subject, UserInterface $user): bool
    {
        // Users can view their own profile
        return $subject->getUserIdentifier() === $user->getUserIdentifier();
    }

    private function canEdit(User $subject, UserInterface $user): bool
    {
        // Users can edit their own profile
        return $subject->getUserIdentifier() === $user->getUserIdentifier();
    }

    private function canDelete(User $subject, UserInterface $user): bool
    {
        // Only admins can delete users, and they cannot delete themselves
        if (!in_array('ROLE_ADMIN', $user->getRoles())) {
            return false;
        }

        // Admins cannot delete themselves
        return $subject->getUserIdentifier() !== $user->getUserIdentifier();
    }
}
