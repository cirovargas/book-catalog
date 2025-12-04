import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CompanyFormModal } from '@/components/companies/company-form-modal'
import { useCompanies } from '@/hooks/use-companies'
import type { CreateCompanyRequest } from '@/types/company'
import { toast } from 'react-hot-toast'

export default function CreateCompany() {
  const navigate = useNavigate()
  const { createCompany } = useCompanies()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    navigate('/companies')
  }

  const handleSubmit = async (data: CreateCompanyRequest) => {
    try {
      setIsSubmitting(true)
      await createCompany(data)
      toast.success('Empresa cadastrada com sucesso!')
      navigate('/companies')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || 'Erro ao cadastrar empresa'
      toast.error(errorMessage)
      throw error // Re-throw to prevent form reset
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyFormModal
        open={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
        mode="create"
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
