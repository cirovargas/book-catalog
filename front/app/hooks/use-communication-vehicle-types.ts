import { useEffect } from 'react'
import { useCommunicationVehicleTypeStore } from '@/stores/communication-vehicle-type-store'

export const useCommunicationVehicleTypes = () => {
  // Get state and actions using proper Zustand selectors
  const communicationVehicleTypes = useCommunicationVehicleTypeStore((state) => state.communicationVehicleTypes)
  const selectedCommunicationVehicleType = useCommunicationVehicleTypeStore((state) => state.selectedCommunicationVehicleType)
  const isLoading = useCommunicationVehicleTypeStore((state) => state.isLoading)
  const isLoadingItem = useCommunicationVehicleTypeStore((state) => state.isLoadingItem)
  const searchQuery = useCommunicationVehicleTypeStore((state) => state.searchQuery)
  const currentPage = useCommunicationVehicleTypeStore((state) => state.currentPage)
  const totalPages = useCommunicationVehicleTypeStore((state) => state.totalPages)
  const totalItems = useCommunicationVehicleTypeStore((state) => state.totalItems)
  const lastFetched = useCommunicationVehicleTypeStore((state) => state.lastFetched)
  const cacheExpiry = useCommunicationVehicleTypeStore((state) => state.cacheExpiry)

  // Get actions
  const fetchAll = useCommunicationVehicleTypeStore((state) => state.fetchAll)
  const fetchById = useCommunicationVehicleTypeStore((state) => state.fetchById)
  const create = useCommunicationVehicleTypeStore((state) => state.create)
  const update = useCommunicationVehicleTypeStore((state) => state.update)
  const deleteItem = useCommunicationVehicleTypeStore((state) => state.delete)
  const setSearchQuery = useCommunicationVehicleTypeStore((state) => state.setSearchQuery)
  const clearSelected = useCommunicationVehicleTypeStore((state) => state.clearSelected)
  const refresh = useCommunicationVehicleTypeStore((state) => state.refresh)
  const invalidateCache = useCommunicationVehicleTypeStore((state) => state.invalidateCache)
  const initialize = useCommunicationVehicleTypeStore((state) => state.initialize)

  useEffect(() => {
    // Initialize on first load
    initialize()
  }, [initialize])

  // Computed values
  const hasItems = communicationVehicleTypes.length > 0
  const isCacheValid = lastFetched && Date.now() - lastFetched < cacheExpiry
  const paginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }

  return {
    // State
    communicationVehicleTypes,
    selectedCommunicationVehicleType,
    isLoading,
    isLoadingItem,
    searchQuery,
    currentPage,

    // Computed values
    hasItems,
    isCacheValid,
    paginationInfo,

    // Actions
    fetchAll,
    fetchById,
    create,
    update,
    delete: deleteItem,
    setSearchQuery,
    clearSelected,
    refresh,
    invalidateCache,
  }
}
