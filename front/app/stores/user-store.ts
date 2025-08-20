import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { userService } from '@/services/user-service'
import type { User, CreateUserRequest, UpdateUserRequest, UserListResponse } from '@/types/user'
import { toast } from 'react-hot-toast'

interface UserState {
  // User list state
  users: User[]
  totalUsers: number
  currentPage: number
  totalPages: number
  isLoading: boolean
  searchQuery: string
  
  // Single user state
  selectedUser: User | null
  isLoadingUser: boolean
  
  // Actions
  fetchUsers: (page?: number, search?: string) => Promise<void>
  createUser: (userData: CreateUserRequest) => Promise<void>
  updateUser: (id: number, userData: UpdateUserRequest) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  fetchUser: (id: number) => Promise<void>
  setSearchQuery: (query: string) => void
  clearSelectedUser: () => void
  
  // Cache management
  invalidateCache: () => void
  refreshUsers: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        users: [],
        totalUsers: 0,
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        searchQuery: '',
        selectedUser: null,
        isLoadingUser: false,

        // Fetch users with pagination and search
        fetchUsers: async (page = 1, search = '') => {
          set({ isLoading: true })
          
          try {
            const response = await userService.getUsers(page, 10, search)
            
            set({
              users: response.data.users,
              totalUsers: response.data.pagination.total,
              currentPage: response.data.pagination.page,
              totalPages: response.data.pagination.pages,
              searchQuery: search,
              isLoading: false,
            })
          } catch (error: any) {
            set({ isLoading: false })
            toast.error(error.response?.data?.error || 'Failed to fetch users')
            throw error
          }
        },

        // Create a new user
        createUser: async (userData: CreateUserRequest) => {
          try {
            await userService.createUser(userData)
            toast.success('User created successfully!')
            
            // Refresh the user list to include the new user
            await get().refreshUsers()
          } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create user')
            throw error
          }
        },

        // Update an existing user
        updateUser: async (id: number, userData: UpdateUserRequest) => {
          try {
            await userService.updateUser(id, userData)
            toast.success('User updated successfully!')
            
            // Update the user in the local state
            const { users, selectedUser } = get()
            const updatedUsers = users.map(user => 
              user.id === id ? { ...user, ...userData } : user
            )
            
            set({ 
              users: updatedUsers,
              selectedUser: selectedUser?.id === id ? { ...selectedUser, ...userData } : selectedUser
            })
            
            // Optionally refresh to get server state
            await get().refreshUsers()
          } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to update user')
            throw error
          }
        },

        // Delete a user
        deleteUser: async (id: number) => {
          try {
            await userService.deleteUser(id)
            toast.success('User deleted successfully!')
            
            // Remove the user from local state
            const { users } = get()
            const filteredUsers = users.filter(user => user.id !== id)
            
            set({ 
              users: filteredUsers,
              totalUsers: get().totalUsers - 1,
              selectedUser: get().selectedUser?.id === id ? null : get().selectedUser
            })
            
            // Refresh to ensure consistency
            await get().refreshUsers()
          } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to delete user')
            throw error
          }
        },

        // Fetch a single user
        fetchUser: async (id: number) => {
          set({ isLoadingUser: true })
          
          try {
            const response = await userService.getUser(id)
            set({ 
              selectedUser: response.data,
              isLoadingUser: false 
            })
          } catch (error: any) {
            set({ isLoadingUser: false })
            toast.error(error.response?.data?.error || 'Failed to fetch user')
            throw error
          }
        },

        // Set search query
        setSearchQuery: (query: string) => {
          set({ searchQuery: query })
        },

        // Clear selected user
        clearSelectedUser: () => {
          set({ selectedUser: null })
        },

        // Invalidate cache and reset state
        invalidateCache: () => {
          set({
            users: [],
            totalUsers: 0,
            currentPage: 1,
            totalPages: 1,
            selectedUser: null,
            searchQuery: '',
          })
        },

        // Refresh users (re-fetch current page with current search)
        refreshUsers: async () => {
          const { currentPage, searchQuery } = get()
          await get().fetchUsers(currentPage, searchQuery)
        },
      }),
      {
        name: 'user-store',
        // Only persist non-sensitive data
        partialize: (state) => ({
          currentPage: state.currentPage,
          searchQuery: state.searchQuery,
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
)

// Selectors for computed values
export const useUserSelectors = () => {
  const store = useUserStore()
  
  return {
    // Get users filtered by search query (client-side filtering as backup)
    filteredUsers: store.users.filter(user => 
      !store.searchQuery || 
      user.email.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(store.searchQuery.toLowerCase())
    ),
    
    // Check if there are any users
    hasUsers: store.users.length > 0,
    
    // Check if currently loading any operation
    isAnyLoading: store.isLoading || store.isLoadingUser,
    
    // Get pagination info
    paginationInfo: {
      currentPage: store.currentPage,
      totalPages: store.totalPages,
      totalUsers: store.totalUsers,
      hasNextPage: store.currentPage < store.totalPages,
      hasPrevPage: store.currentPage > 1,
    },
  }
}
