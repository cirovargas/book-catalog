import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CompanyForm } from './components/company-form'
import { useCompanies } from '@/hooks/use-companies'
import type { CreateCompanyRequest, UpdateCompanyRequest } from '@/types/company'

export default function CreateCompany() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { createCompany } = useCompanies()

  const handleSubmit = async (data: CreateCompanyRequest | UpdateCompanyRequest) => {
    try {
      setIsLoading(true)
      await createCompany(data as CreateCompanyRequest)
      navigate('/companies')
    } catch (error: any) {
      // Error handling is done in the store
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cadastrar Empresa</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Adicionar uma nova empresa ao sistema
        </p>
      </div>

      <CompanyForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
