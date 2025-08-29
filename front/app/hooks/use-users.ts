import { useEffect } from 'react'
import { useUserStore, useUserSelectors } from '@/stores/user-store'

export const useUsers = () => {
  const store = useUserStore()
  const selectors = useUserSelectors()

  useEffect(() => {
    // Initialize users on first load
    store.initializeUsers()
  }, [store])

  return {
    // State
    users: store.users,
    selectedUser: store.selectedUser,
    isLoading: store.isLoading,
    isLoadingUser: store.isLoadingUser,
    searchQuery: store.searchQuery,
    currentPage: store.currentPage,
    
    // Computed values
    hasUsers: selectors.hasUsers,
    isCacheValid: selectors.isCacheValid,
    paginationInfo: selectors.paginationInfo,
    
    // Actions
    fetchUsers: store.fetchUsers,
    fetchUser: store.fetchUser,
    createUser: store.createUser,
    updateUser: store.updateUser,
    deleteUser: store.deleteUser,
    setSearchQuery: store.setSearchQuery,
    clearSelectedUser: store.clearSelectedUser,
    refreshUsers: store.refreshUsers,
    invalidateCache: store.invalidateCache,
  }
}
