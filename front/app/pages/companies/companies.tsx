import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useCompanies } from '@/hooks/use-companies'
import type { Company } from '@/types/company'

import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  RefreshCw,
  Check,
  X,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Companies() {
  const {
    companies,
    isLoading,
    searchQuery,
    currentPage,
    fetchCompanies,
    deleteCompany,
    setSearchQuery,
    refreshCompanies,
    hasCompanies,
    isCacheValid,
    paginationInfo,
  } = useCompanies()

  // TanStack Table states
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    fetchCompanies(1, value) // Reset to first page when searching
  }

  const handleDelete = async (companyId: number) => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) {
      return
    }

    try {
      await deleteCompany(companyId)
    } catch (error) {
      // Error handling is done in the store
    }
  }

  const handlePageChange = (newPage: number) => {
    fetchCompanies(newPage, searchQuery)
  }

  const handleRefresh = async () => {
    await refreshCompanies()
  }

  const formatCnpj = (cnpj: string) => {
    // Format CNPJ as XX.XXX.XXX/XXXX-XX
    const numbers = cnpj.replace(/\D/g, '')
    if (numbers.length === 14) {
      return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    }
    return cnpj
  }

  // Define columns for TanStack Table
  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: 'corporateName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-medium"
          >
            Razão Social
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const company = row.original
        return (
          <div>
            <div className="font-medium">{company.corporateName}</div>
            <div className="text-sm text-gray-500">ID: {company.id}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'tradeName',
      header: 'Nome Fantasia',
      cell: ({ row }) => {
        const tradeName = row.getValue('tradeName') as string
        return <div className="font-medium">{tradeName}</div>
      },
    },
    {
      accessorKey: 'cnpj',
      header: 'CNPJ',
      cell: ({ row }) => {
        const cnpj = row.getValue('cnpj') as string
        return <div className="font-mono text-sm">{formatCnpj(cnpj)}</div>
      },
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
      cell: ({ row }) => {
        const email = row.getValue('email') as string
        return <div className="text-sm">{email}</div>
      },
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
            Situação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const isActive = status === 'active'
        return (
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {isActive ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                Ativa
              </>
            ) : (
              <>
                <X className="mr-1 h-3 w-3" />
                Inativa
              </>
            )}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      header: 'Ações',
      enableHiding: false,
      cell: ({ row }) => {
        const company = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/companies/${company.id}/edit`} className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(company.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Initialize TanStack Table
  const table = useReactTable({
    data: companies,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Empresas</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerenciar empresas cadastradas no sistema
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </Button>
          <Link to="/companies/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Empresa
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Empresas</CardTitle>
            {isCacheValid && (
              <div className="text-sm text-green-600 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cache válido</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou CNPJ..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : !hasCompanies ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Nenhuma empresa encontrada</div>
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
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          Nenhum resultado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Mostrando {(paginationInfo.currentPage - 1) * 10 + 1} a{' '}
                  {Math.min(paginationInfo.currentPage * 10, paginationInfo.totalCompanies)} de{' '}
                  {paginationInfo.totalCompanies} empresas
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                    disabled={!paginationInfo.hasPrevPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <span className="text-sm">
                    Página {paginationInfo.currentPage} de {paginationInfo.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                    disabled={!paginationInfo.hasNextPage}
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
