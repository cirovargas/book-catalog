import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { communicationVehicleTypeService } from '@/services/communication-vehicle-type-service'
import type {
  CommunicationVehicleType,
  CreateCommunicationVehicleTypeRequest,
  UpdateCommunicationVehicleTypeRequest,
} from '@/types/communication-vehicle-type'
import { toast } from 'react-hot-toast'

interface CommunicationVehicleTypeState {
  // List state
  communicationVehicleTypes: CommunicationVehicleType[]
  totalItems: number
  currentPage: number
  totalPages: number
  isLoading: boolean
  searchQuery: string

  // Single item state
  selectedCommunicationVehicleType: CommunicationVehicleType | null
  isLoadingItem: boolean

  // Cache management
  lastFetched: number | null
  cacheExpiry: number
  isInitialized: boolean

  // Actions
  fetchAll: (page?: number, search?: string, force?: boolean) => Promise<void>
  create: (data: CreateCommunicationVehicleTypeRequest) => Promise<void>
  update: (id: number, data: UpdateCommunicationVehicleTypeRequest) => Promise<void>
  delete: (id: number) => Promise<void>
  fetchById: (id: number, force?: boolean) => Promise<void>
  setSearchQuery: (query: string) => void
  clearSelected: () => void

  // Cache management
  invalidateCache: () => void
  refresh: () => Promise<void>
  initialize: () => Promise<void>
}

export const useCommunicationVehicleTypeStore = create<CommunicationVehicleTypeState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        communicationVehicleTypes: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        searchQuery: '',
        selectedCommunicationVehicleType: null,
        isLoadingItem: false,
        lastFetched: null,
        cacheExpiry: 5 * 60 * 1000, // 5 minutes
        isInitialized: false,

        // Initialize on first load
        initialize: async () => {
          const { isInitialized, fetchAll } = get()
          if (!isInitialized) {
            set({ isInitialized: true })
            await fetchAll(1, '', false)
          }
        },

        // Fetch with pagination and search
        fetchAll: async (page = 1, search = '', force = false) => {
          const { lastFetched, cacheExpiry, currentPage, searchQuery, isLoading } = get()

          // Check if we should skip the API call
          const now = Date.now()
          const isCacheValid = lastFetched && now - lastFetched < cacheExpiry
          const isSameRequest = currentPage === page && searchQuery === search

          if (!force && isCacheValid && isSameRequest && !isLoading) {
            return // Skip API call if cache is valid and same request
          }

          set({ isLoading: true })

          try {
            const response = await communicationVehicleTypeService.getAll(page, 10, search)

            set({
              communicationVehicleTypes: response.data.communication_vehicle_types,
              totalItems: response.data.pagination.total,
              currentPage: response.data.pagination.page,
              totalPages: response.data.pagination.pages,
              searchQuery: search,
              isLoading: false,
              lastFetched: now,
            })
          } catch (error: any) {
            set({ isLoading: false })
            toast.error(
              error.response?.data?.error || 'Failed to fetch communication vehicle types'
            )
            throw error
          }
        },

        // Create a new item
        create: async (data: CreateCommunicationVehicleTypeRequest) => {
          try {
            await communicationVehicleTypeService.create(data)
            toast.success('Communication vehicle type created successfully!')

            // Invalidate cache to force refresh
            get().invalidateCache()
            await get().refresh()
          } catch (error: any) {
            toast.error(
              error.response?.data?.error || 'Failed to create communication vehicle type'
            )
            throw error
          }
        },

        // Update an existing item
        update: async (id: number, data: UpdateCommunicationVehicleTypeRequest) => {
          try {
            await communicationVehicleTypeService.update(id, data)
            toast.success('Communication vehicle type updated successfully!')

            // Update the item in the local state
            const { communicationVehicleTypes, selectedCommunicationVehicleType } = get()
            const updatedItems = communicationVehicleTypes.map((item) =>
              item.id === id ? { ...item, ...data } : item
            )

            set({
              communicationVehicleTypes: updatedItems,
              selectedCommunicationVehicleType:
                selectedCommunicationVehicleType?.id === id
                  ? { ...selectedCommunicationVehicleType, ...data }
                  : selectedCommunicationVehicleType,
              lastFetched: Date.now(), // Update cache timestamp
            })
          } catch (error: any) {
            toast.error(
              error.response?.data?.error || 'Failed to update communication vehicle type'
            )
            throw error
          }
        },

        // Delete an item
        delete: async (id: number) => {
          try {
            await communicationVehicleTypeService.delete(id)
            toast.success('Communication vehicle type deleted successfully!')

            // Remove the item from local state
            const { communicationVehicleTypes } = get()
            const filteredItems = communicationVehicleTypes.filter((item) => item.id !== id)

            set({
              communicationVehicleTypes: filteredItems,
              totalItems: get().totalItems - 1,
              selectedCommunicationVehicleType:
                get().selectedCommunicationVehicleType?.id === id
                  ? null
                  : get().selectedCommunicationVehicleType,
              lastFetched: Date.now(), // Update cache timestamp
            })
          } catch (error: any) {
            toast.error(
              error.response?.data?.error || 'Failed to delete communication vehicle type'
            )
            throw error
          }
        },

        // Fetch a single item
        fetchById: async (id: number, force = false) => {
          const { selectedCommunicationVehicleType, lastFetched, cacheExpiry, isLoadingItem } =
            get()

          // Check if we should skip the API call
          const now = Date.now()
          const isCacheValid = lastFetched && now - lastFetched < cacheExpiry
          const isSameItem = selectedCommunicationVehicleType?.id === id

          if (!force && isCacheValid && isSameItem && !isLoadingItem) {
            return // Skip API call if cache is valid and same item
          }

          set({ isLoadingItem: true })

          try {
            const response = await communicationVehicleTypeService.getById(id)
            set({
              selectedCommunicationVehicleType: response.data,
              isLoadingItem: false,
              lastFetched: now,
            })
          } catch (error: any) {
            set({ isLoadingItem: false })
            toast.error(
              error.response?.data?.error || 'Failed to fetch communication vehicle type'
            )
            throw error
          }
        },

        // Set search query
        setSearchQuery: (query: string) => {
          set({ searchQuery: query })
        },

        // Clear selected item
        clearSelected: () => {
          set({ selectedCommunicationVehicleType: null })
        },

        // Invalidate cache and reset state
        invalidateCache: () => {
          set({
            communicationVehicleTypes: [],
            totalItems: 0,
            currentPage: 1,
            totalPages: 1,
            selectedCommunicationVehicleType: null,
            searchQuery: '',
            lastFetched: null,
            isInitialized: false,
          })
        },

        // Refresh (re-fetch current page with current search)
        refresh: async () => {
          const { currentPage, searchQuery } = get()
          await get().fetchAll(currentPage, searchQuery, true) // Force refresh
        },
      }),
      {
        name: 'communication-vehicle-type-store',
        // Only persist non-sensitive data
        partialize: (state) => ({
          currentPage: state.currentPage,
          searchQuery: state.searchQuery,
          lastFetched: state.lastFetched,
          isInitialized: state.isInitialized,
        }),
      }
    ),
    {
      name: 'communication-vehicle-type-store',
    }
  )
)

// Selectors for computed values
export const useCommunicationVehicleTypeSelectors = () => {
  const store = useCommunicationVehicleTypeStore()

  return {
    // Check if there are any items
    hasItems: store.communicationVehicleTypes.length > 0,

    // Check if currently loading any operation
    isAnyLoading: store.isLoading || store.isLoadingItem,

    // Check if cache is valid
    isCacheValid:
      store.lastFetched && Date.now() - store.lastFetched < store.cacheExpiry,

    // Get pagination info
    paginationInfo: {
      currentPage: store.currentPage,
      totalPages: store.totalPages,
      totalItems: store.totalItems,
      hasNextPage: store.currentPage < store.totalPages,
      hasPrevPage: store.currentPage > 1,
    },
  }
}

