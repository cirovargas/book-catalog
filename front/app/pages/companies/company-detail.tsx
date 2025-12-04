import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useCompanies } from '@/hooks/use-companies'
import { ArrowLeft, Edit, Trash2, Check, X } from 'lucide-react'

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedCompany, isLoadingCompany, fetchCompany, deleteCompany } = useCompanies()

  useEffect(() => {
    if (id) {
      fetchCompany(parseInt(id))
    }
  }, [id, fetchCompany])

  const handleDelete = async () => {
    if (!selectedCompany) return

    if (!confirm('Tem certeza que deseja excluir esta empresa?')) {
      return
    }

    try {
      await deleteCompany(selectedCompany.id)
      navigate('/companies')
    } catch (error) {
      // Error handling is done in the store
    }
  }

  const formatCnpj = (cnpj: string) => {
    const cleaned = cnpj.replace(/\D/g, '')
    if (cleaned.length !== 14) return cnpj
    return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (isLoadingCompany) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
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

  const isActive = selectedCompany.status === 'active'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/companies')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Link to={`/companies/${selectedCompany.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{selectedCompany.corporateName}</h1>
        <p className="text-gray-600 dark:text-gray-400">{selectedCompany.tradeName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium">{selectedCompany.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Razão Social</p>
              <p className="font-medium">{selectedCompany.corporateName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nome Fantasia</p>
              <p className="font-medium">{selectedCompany.tradeName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CNPJ</p>
              <p className="font-mono font-medium">{formatCnpj(selectedCompany.cnpj)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Situação</p>
              <Badge variant={isActive ? 'default' : 'secondary'}>
                {isActive ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Ativo
                  </>
                ) : (
                  <>
                    <X className="mr-1 h-3 w-3" />
                    Inativo
                  </>
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Criado em</p>
              <p className="font-medium">{formatDate(selectedCompany.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Atualizado em</p>
              <p className="font-medium">{formatDate(selectedCompany.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

