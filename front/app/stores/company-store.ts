import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { companyService } from '@/services/company-service'
import type { Company, CreateCompanyRequest, UpdateCompanyRequest } from '@/types/company'
import { toast } from 'react-hot-toast'

interface CompanyState {
  // List state
  companies: Company[]
  totalCompanies: number
  currentPage: number
  totalPages: number
  isLoading: boolean
  searchQuery: string

  // Single company state
  selectedCompany: Company | null
  isLoadingCompany: boolean

  // Cache management
  lastFetched: number | null
  cacheExpiry: number
  isInitialized: boolean

  // Actions
  fetchCompanies: (page?: number, search?: string, force?: boolean) => Promise<void>
  createCompany: (companyData: CreateCompanyRequest) => Promise<void>
  updateCompany: (id: number, companyData: UpdateCompanyRequest) => Promise<void>
  deleteCompany: (id: number) => Promise<void>
  fetchCompany: (id: number, force?: boolean) => Promise<void>
  setSearchQuery: (query: string) => void
  clearSelectedCompany: () => void

  // Cache management
  invalidateCache: () => void
  refreshCompanies: () => Promise<void>
  initializeCompanies: () => Promise<void>
}

export const useCompanyStore = create<CompanyState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        companies: [],
        totalCompanies: 0,
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        searchQuery: '',
        selectedCompany: null,
        isLoadingCompany: false,
        lastFetched: null,
        cacheExpiry: 5 * 60 * 1000, // 5 minutes
        isInitialized: false,

        // Initialize companies on first load
        initializeCompanies: async () => {
          const { isInitialized, fetchCompanies } = get()
          if (!isInitialized) {
            set({ isInitialized: true })
            await fetchCompanies(1, '', false)
          }
        },

        // Fetch companies with pagination and search
        fetchCompanies: async (page = 1, search = '', force = false) => {
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
            const response = await companyService.getAll(page, 10, search, undefined, 'active')

            set({
              companies: response.data.companies,
              totalCompanies: response.data.pagination.total,
              currentPage: response.data.pagination.page,
              totalPages: response.data.pagination.pages,
              searchQuery: search,
              isLoading: false,
              lastFetched: now,
            })
          } catch (error: any) {
            set({ isLoading: false })
            toast.error(error.response?.data?.error || 'Failed to fetch companies')
            throw error
          }
        },

        // Create a new company
        createCompany: async (companyData: CreateCompanyRequest) => {
          try {
            await companyService.create(companyData)
            toast.success('Company created successfully!')

            // Invalidate cache to force refresh
            get().invalidateCache()
            await get().refreshCompanies()
          } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create company')
            throw error
          }
        },

        // Update an existing company
        updateCompany: async (id: number, companyData: UpdateCompanyRequest) => {
          try {
            await companyService.update(id, companyData)
            toast.success('Company updated successfully!')

            // Update the company in the local state
            const { companies, selectedCompany } = get()
            const updatedCompanies = companies.map((company) =>
              company.id === id ? { ...company, ...companyData } : company
            )

            set({
              companies: updatedCompanies,
              selectedCompany:
                selectedCompany?.id === id ? { ...selectedCompany, ...companyData } : selectedCompany,
              lastFetched: Date.now(), // Update cache timestamp
            })
          } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to update company')
            throw error
          }
        },

        // Delete a company
        deleteCompany: async (id: number) => {
          try {
            await companyService.delete(id)
            toast.success('Company deleted successfully!')

            // Remove the company from local state
            const { companies } = get()
            const filteredCompanies = companies.filter((company) => company.id !== id)

            set({
              companies: filteredCompanies,
              totalCompanies: get().totalCompanies - 1,
              selectedCompany: get().selectedCompany?.id === id ? null : get().selectedCompany,
              lastFetched: Date.now(), // Update cache timestamp
            })
          } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to delete company')
            throw error
          }
        },

        // Fetch a single company
        fetchCompany: async (id: number, force = false) => {
          const { selectedCompany, lastFetched, cacheExpiry, isLoadingCompany } = get()

          // Check if we should skip the API call
          const now = Date.now()
          const isCacheValid = lastFetched && now - lastFetched < cacheExpiry
          const isSameCompany = selectedCompany?.id === id

          if (!force && isCacheValid && isSameCompany && !isLoadingCompany) {
            return // Skip API call if cache is valid and same company
          }

          set({ isLoadingCompany: true })

          try {
            const response = await companyService.getById(id)
            set({
              selectedCompany: response.data,
              isLoadingCompany: false,
              lastFetched: now,
            })
          } catch (error: any) {
            set({ isLoadingCompany: false })
            toast.error(error.response?.data?.error || 'Failed to fetch company')
            throw error
          }
        },

        // Set search query
        setSearchQuery: (query: string) => {
          set({ searchQuery: query })
        },

        // Clear selected company
        clearSelectedCompany: () => {
          set({ selectedCompany: null })
        },

        // Invalidate cache and reset state
        invalidateCache: () => {
          set({
            companies: [],
            totalCompanies: 0,
            currentPage: 1,
            totalPages: 1,
            selectedCompany: null,
            searchQuery: '',
            lastFetched: null,
            isInitialized: false,
          })
        },

        // Refresh companies (re-fetch current page with current search)
        refreshCompanies: async () => {
          const { currentPage, searchQuery } = get()
          await get().fetchCompanies(currentPage, searchQuery, true) // Force refresh
        },
      }),
      {
        name: 'company-store',
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
      name: 'company-store',
    }
  )
)

