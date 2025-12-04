import { useEffect } from 'react'
import { useCompanyStore } from '@/stores/company-store'

export const useCompanies = () => {
  // Get state and actions from the store
  const companies = useCompanyStore((state) => state.companies)
  const selectedCompany = useCompanyStore((state) => state.selectedCompany)
  const isLoading = useCompanyStore((state) => state.isLoading)
  const isLoadingCompany = useCompanyStore((state) => state.isLoadingCompany)
  const searchQuery = useCompanyStore((state) => state.searchQuery)
  const currentPage = useCompanyStore((state) => state.currentPage)
  const totalCompanies = useCompanyStore((state) => state.totalCompanies)
  const totalPages = useCompanyStore((state) => state.totalPages)
  const lastFetched = useCompanyStore((state) => state.lastFetched)
  const cacheExpiry = useCompanyStore((state) => state.cacheExpiry)
  
  // Get actions
  const fetchCompanies = useCompanyStore((state) => state.fetchCompanies)
  const fetchCompany = useCompanyStore((state) => state.fetchCompany)
  const createCompany = useCompanyStore((state) => state.createCompany)
  const updateCompany = useCompanyStore((state) => state.updateCompany)
  const deleteCompany = useCompanyStore((state) => state.deleteCompany)
  const setSearchQuery = useCompanyStore((state) => state.setSearchQuery)
  const clearSelectedCompany = useCompanyStore((state) => state.clearSelectedCompany)
  const refreshCompanies = useCompanyStore((state) => state.refreshCompanies)
  const invalidateCache = useCompanyStore((state) => state.invalidateCache)
  const initializeCompanies = useCompanyStore((state) => state.initializeCompanies)

  useEffect(() => {
    // Initialize companies on first load
    initializeCompanies()
  }, [initializeCompanies])

  // Computed values
  const hasCompanies = companies.length > 0
  const isCacheValid = lastFetched && Date.now() - lastFetched < cacheExpiry
  const paginationInfo = {
    currentPage,
    totalPages,
    totalCompanies,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }

  return {
    // State
    companies,
    selectedCompany,
    isLoading,
    isLoadingCompany,
    searchQuery,
    currentPage,

    // Computed values
    hasCompanies,
    isCacheValid,
    paginationInfo,

    // Actions
    fetchCompanies,
    fetchCompany,
    createCompany,
    updateCompany,
    deleteCompany,
    setSearchQuery,
    clearSelectedCompany,
    refreshCompanies,
    invalidateCache,
  }
}
