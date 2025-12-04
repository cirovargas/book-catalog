import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Search,
  Plus,
  ChevronLeft,
  Edit,
  ArrowUpDown
} from 'lucide-react'
import { communicationVehicleTypeService } from '@/services/communication-vehicle-type-service'
import type { CommunicationVehicleType } from '@/types/communication-vehicle-type'
import { CommunicationVehicleTypeForm } from './components/communication-vehicle-type-form'
import { toast } from 'react-hot-toast'

export default function CommunicationVehicleTypes() {
  const [communicationVehicleTypes, setCommunicationVehicleTypes] = useState<CommunicationVehicleType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedType, setSelectedType] = useState<CommunicationVehicleType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpening, setIsModalOpening] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const limit = 10

  const fetchCommunicationVehicleTypes = async (page: number = 1, search: string = '') => {
    setIsLoading(true)
    try {
      const response = await communicationVehicleTypeService.getAll(page, limit, search)
      setCommunicationVehicleTypes(response.data.communication_vehicle_types)
      setCurrentPage(response.data.pagination.page)
      setTotalPages(response.data.pagination.pages)
      setTotalItems(response.data.pagination.total)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao carregar tipos de veículos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunicationVehicleTypes(1, '')
  }, [])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchCommunicationVehicleTypes(1, searchQuery)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    fetchCommunicationVehicleTypes(newPage, searchQuery)
  }

  const handleOpenCreateModal = () => {
    setModalMode('create')
    setSelectedType(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = async (type: CommunicationVehicleType) => {
    setModalMode('edit')
    setIsModalOpen(true)
    setIsModalOpening(true)
    setSelectedType(null)
    try {
      const response = await communicationVehicleTypeService.getById(type.id)

      setSelectedType(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao carregar tipo de veículo')
      setIsModalOpen(false)
    } finally {
      setIsModalOpening(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedType(null)
    setIsSubmitting(false)
  }

  const handleFormSubmit = async (data: { name: string; description?: string; status: 'active' | 'inactive' }) => {
    setIsSubmitting(true)
    try {
      if (modalMode === 'create') {
        await communicationVehicleTypeService.create({
          name: data.name,
          status: data.status,
          description: data.description || null
        })
        toast.success('Tipo de veículo criado com sucesso!')
      } else if (selectedType) {
        await communicationVehicleTypeService.update(selectedType.id, {
          name: data.name,
          status: data.status,
          description: data.description || null
        })
        toast.success('Tipo de veículo atualizado com sucesso!')
      }

      // Refresh the list
      await fetchCommunicationVehicleTypes(currentPage, searchQuery)
      handleCloseModal()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao salvar tipo de veículo')
      throw error // Re-throw to prevent form reset
    } finally {
      setIsSubmitting(false)
    }
  }

  // Define columns for TanStack Table
  const columns: ColumnDef<CommunicationVehicleType>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-medium"
          >
            Nome do tipo de veículo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue('name')}</div>
      }
    },
    {
      accessorKey: 'description',
      header: 'Descrição',
      cell: ({ row }) => {
        const description = row.getValue('description') as string | null
        return (
          <div className="text-gray-600 dark:text-gray-400">
            {description || 'N/A'}
          </div>
        )
      }
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-medium"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant={status === 'active' ? 'default' : 'secondary'}
            className={
              status === 'active'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 hover:bg-gray-500'
            }
          >
            {status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => {
        const type = row.original
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleOpenEditModal(type)}
              disabled={isModalOpening}
            >
              <Edit className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Editar</span>
            </Button>
          </div>
        )
      }
    }
  ]

  // Initialize TanStack Table
  const table = useReactTable({
    data: communicationVehicleTypes,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/dashboard" className="flex items-center hover:text-gray-900 dark:hover:text-gray-200">
          {/*<ChevronLeft className="h-4 w-4" />*/}
          <span>Dashboard</span>
        </Link>
        <span>›</span>
        <span>Configurações</span>
        <span>›</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">Tipos de Veículos</span>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Tipos de Veículos de Comunicação</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Visualize e gerencie os tipos de veículos de comunicação cadastrados
        </p>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} className="whitespace-nowrap">
            Buscar
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            className="whitespace-nowrap"
            onClick={handleOpenCreateModal}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Tipo de Veículo
          </Button>
        </div>
      </div>

      {/* Communication Vehicle Types Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          {searchQuery
                            ? `Nenhum resultado encontrado para "${searchQuery}"`
                            : 'Nenhum tipo de veículo cadastrado até o momento.'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {communicationVehicleTypes.length > 0 && (
                <div className="flex items-center justify-between p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Mostrando {(currentPage - 1) * limit + 1} a{' '}
                    {Math.min(currentPage * limit, totalItems)} de {totalItems} tipos
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                    <span className="text-sm">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      Próxima
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {!isLoading && communicationVehicleTypes.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {communicationVehicleTypes.length} de {totalItems} tipos de veículos
        </div>
      )}

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {modalMode === 'create'
                ? 'Cadastrar tipo de veículo de comunicação'
                : 'Editar tipo de veículo de comunicação'}
            </DialogTitle>
          </DialogHeader>

          {/* Lógica de Renderização Condicional */}
          {modalMode === 'edit' && isModalOpening ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
          ) : (
            <CommunicationVehicleTypeForm
              mode={modalMode}
              initialData={selectedType ? {
                id: selectedType.id,
                name: selectedType.name,
                description: selectedType.description,
                status: selectedType.status as 'active' | 'inactive',
              } : undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

