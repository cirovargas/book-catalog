import { useEffect } from 'react'
import {
  useCommunicationVehicleTypeStore,
  useCommunicationVehicleTypeSelectors,
} from '@/stores/communication-vehicle-type-store'

export const useCommunicationVehicleTypes = () => {
  const store = useCommunicationVehicleTypeStore()
  const selectors = useCommunicationVehicleTypeSelectors()

  useEffect(() => {
    // Initialize on first load
    store.initialize()
  }, [])

  return {
    // State
    communicationVehicleTypes: store.communicationVehicleTypes,
    selectedCommunicationVehicleType: store.selectedCommunicationVehicleType,
    isLoading: store.isLoading,
    isLoadingItem: store.isLoadingItem,
    searchQuery: store.searchQuery,
    currentPage: store.currentPage,

    // Computed values
    hasItems: selectors.hasItems,
    isCacheValid: selectors.isCacheValid,
    paginationInfo: selectors.paginationInfo,

    // Actions
    fetchAll: store.fetchAll,
    fetchById: store.fetchById,
    create: store.create,
    update: store.update,
    delete: store.delete,
    setSearchQuery: store.setSearchQuery,
    clearSelected: store.clearSelected,
    refresh: store.refresh,
    invalidateCache: store.invalidateCache,
  }
}

