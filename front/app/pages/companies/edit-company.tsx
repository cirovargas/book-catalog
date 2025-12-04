import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { CompanyFormModal } from '@/components/companies/company-form-modal'
import { useCompanies } from '@/hooks/use-companies'
import type { CreateCompanyRequest } from '@/types/company'
import { toast } from 'react-hot-toast'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function EditCompany() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { selectedCompany, fetchCompany, updateCompany } = useCompanies()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCompany = async () => {
      if (!id) {
        navigate('/companies')
        return
      }

      try {
        setIsLoading(true)
        await fetchCompany(parseInt(id), true)
      } catch (error) {
        toast.error('Erro ao carregar empresa')
        navigate('/companies')
      } finally {
        setIsLoading(false)
      }
    }

    loadCompany()
  }, [id, fetchCompany, navigate])

  const handleClose = () => {
    navigate('/companies')
  }

  const handleSubmit = async (data: CreateCompanyRequest) => {
    if (!id) return

    try {
      setIsSubmitting(true)
      // Remove generateUser from data for update
      const { generateUser, ...updateData } = data
      await updateCompany(parseInt(id), updateData)
      toast.success('Empresa atualizada com sucesso!')
      navigate('/companies')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || 'Erro ao atualizar empresa'
      toast.error(errorMessage)
      throw error // Re-throw to prevent form reset
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyFormModal
        open={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
        mode="edit"
        initialData={selectedCompany}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
