import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
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
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useCompanies } from '@/hooks/use-companies'
import type { Company } from '@/types/company'
import {
  Search,
  FileSpreadsheet,
  Plus,
  ChevronLeft,
  User,
  Edit,
  ArrowUpDown
} from 'lucide-react'

export default function Companies() {
  const {
    companies,
    isLoading,
    searchQuery,
    fetchCompanies,
    setSearchQuery,
    paginationInfo,
    invalidateCache
  } = useCompanies()

  // página atual controlada pela tela
  const [page, setPage] = useState(1)

  // Local search input state (draft value while typing)
  const [searchInput, setSearchInput] = useState(searchQuery || '')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    setSearchInput(searchQuery || '')
  }, [searchQuery])

  useEffect(() => {
    fetchCompanies(page, searchQuery || '')
  }, [page, searchQuery, fetchCompanies])

  const handleSearch = () => {
    const term = searchInput.trim()

    setSearchQuery(term)

    invalidateCache()

    fetchCompanies(1, term)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > paginationInfo.totalPages) return
    setPage(newPage)
  }

  const formatCnpj = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, '')
    if (numbers.length === 14) {
      return numbers.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      )
    }
    return cnpj
  }

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: 'corporateName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
            className="h-8 p-0 font-medium hover:bg-transparent"
          >
            Razão social
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('corporateName')}</div>
      )
    },
    {
      accessorKey: 'tradeName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
            className="h-8 p-0 font-medium hover:bg-transparent"
          >
            Nome fantasia
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {row.getValue('tradeName')}
        </div>
      )
    },
    {
      accessorKey: 'cnpj',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
            className="h-8 p-0 font-medium hover:bg-transparent"
          >
            CNPJ
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {formatCnpj(row.getValue('cnpj'))}
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }
            className="h-8 p-0 font-medium hover:bg-transparent"
          >
            Situação
            <ArrowUpDown className="ml-2 h-3 w-3" />
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
      enableSorting: false,
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => {
        const company = row.original
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              asChild
            >
              <Link to={`/companies/${company.id}`}>
                <User className="h-4 w-4 text-gray-600" />
                <span className="sr-only">Ver empresa</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              asChild
            >
              <Link to={`/companies/${company.id}/edit`}>
                <Edit className="h-4 w-4 text-gray-600" />
                <span className="sr-only">Editar</span>
              </Link>
            </Button>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: companies,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection
    }
  })

  if (isLoading && companies.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/dashboard" className="flex items-center hover:text-foreground">
          <span>Dashboard</span>
        </Link>
        <span>›</span>
        <span>Empresas</span>
        <span>›</span>
        <span className="text-foreground font-medium">Gerenciar</span>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Gerenciar empresas</h1>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="pl-10"
            />
          </div>
          <Button
            type="button"
            onClick={handleSearch}
            className="whitespace-nowrap"
            disabled={isLoading}
          >
            Buscar
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="whitespace-nowrap" disabled>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Importar excel
          </Button>
          <Button className="whitespace-nowrap" asChild>
            <Link to="/companies/create">
              <Plus className="mr-2 h-4 w-4" />
              Novo cadastro
            </Link>
          </Button>
        </div>
      </div>

      {/* Companies Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
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
                      {searchQuery
                        ? `Nenhum resultado encontrado para "${searchQuery}"`
                        : 'Nenhuma empresa cadastrada até o momento.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          {companies.length > 0 && (
            <div className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">
                Mostrando{' '}
                {(paginationInfo.currentPage - 1) * 10 + 1} a{' '}
                {Math.min(
                  paginationInfo.currentPage * 10,
                  paginationInfo.totalCompanies
                )}{' '}
                de {paginationInfo.totalCompanies} empresas
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                  disabled={!paginationInfo.hasPrevPage || isLoading}
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
                  disabled={!paginationInfo.hasNextPage || isLoading}
                >
                  Próxima
                  <ChevronLeft className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {companies.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Mostrando {companies.length} de {paginationInfo.totalCompanies} empresas
        </div>
      )}
    </div>
  )
}
