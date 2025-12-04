import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { CompanyForm } from './components/company-form'
import { useCompanies } from '@/hooks/use-companies'
import type { UpdateCompanyRequest } from '@/types/company'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ArrowLeft } from 'lucide-react'

export default function EditCompany() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { selectedCompany, isLoadingCompany, fetchCompany, updateCompany } = useCompanies()

  useEffect(() => {
    if (id) {
      fetchCompany(parseInt(id))
    }
  }, [id, fetchCompany])

  const handleSubmit = async (data: UpdateCompanyRequest) => {
    if (!selectedCompany) return

    try {
      setIsSubmitting(true)
      await updateCompany(selectedCompany.id, data)
      navigate('/companies')
    } catch (error: any) {
      // Error handling is done in the store
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingCompany) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" />
      </div>
    )
  }

  if (!selectedCompany) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Empresa não encontrada</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/companies')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Editar Empresa</h1>
        <p className="text-gray-600 dark:text-gray-400">Atualizar informações da empresa</p>
      </div>

      <CompanyForm
        mode="edit"
        company={selectedCompany}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  )
}
