import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
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
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useUsers } from '@/hooks/use-users'
import type { User } from '@/types/user'
import { Plus, ArrowUpDown, RefreshCw } from 'lucide-react'

import { CrudIndexLayout } from '@/components/crud/crud-layouts'
import { CrudPageHeader } from '@/components/crud/crud-page-header'
import { CrudCard } from '@/components/crud/crud-card'
import { CrudSearchInput } from '@/components/crud/crud-search-input'
import { CrudPagination } from '@/components/crud/crud-pagination'
import { CrudActionsMenu } from '@/components/crud/crud-actions-menu'
import { ConfirmDialog } from '@/components/feedback/confirm-dialog'

export default function Users() {
  const {
    users,
    isLoading,
    searchQuery,
    fetchUsers,
    deleteUser,
    setSearchQuery,
    refreshUsers,
    hasUsers,
    isCacheValid,
    paginationInfo
  } = useUsers()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  function handleSearch(value: string) {
    setSearchQuery(value)
    fetchUsers(1, value)
  }

  function handlePageChange(newPage: number) {
    fetchUsers(newPage, searchQuery)
  }

  async function handleRefresh() {
    await refreshUsers()
  }

  function formatDate(dateString?: string) {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  function getRoleBadgeVariant(roles: string[]) {
    if (roles.includes('ROLE_ADMIN')) return 'destructive'
    return 'secondary'
  }

  function handleRequestDelete(userId: number) {
    setDeleteUserId(userId)
    setIsDeleteDialogOpen(true)
  }

  async function handleConfirmDelete() {
    if (deleteUserId == null) return

    try {
      await deleteUser(deleteUserId)
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteUserId(null)
    }
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    setIsDeleteDialogOpen(open)
    if (!open) {
      setDeleteUserId(null)
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
          className="h-8 p-0 font-medium"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      ),
      cell: ({ row }) => {
        const user = row.original

        return (
          <div>
            <div className="font-medium">{user.email}</div>
            <div className="text-xs text-muted-foreground">ID: {user.id}</div>
          </div>
        )
      }
    },
    {
      accessorKey: 'roles',
      header: 'Roles',
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex flex-wrap gap-1">
            {user.roles.map((role) => (
              <Badge
                key={role}
                variant={getRoleBadgeVariant(user.roles)}
                className="text-xs"
              >
                {role.replace('ROLE_', '')}
              </Badge>
            ))}
          </div>
        )
      }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
          className="h-8 p-0 font-medium"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {formatDate(row.getValue('createdAt'))}
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original

        return (
          <CrudActionsMenu
            viewUrl={`/users/${user.id}`}
            editUrl={`/users/${user.id}/edit`}
            onDeleteClick={() => handleRequestDelete(user.id)}
          />
        )
      }
    }
  ]

  const table = useReactTable({
    data: users,
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
      rowSelection
    }
  })

  return (
    <>
      <CrudIndexLayout
        header={
          <CrudPageHeader
            title="Users"
            description="Manage user accounts and permissions"
            actions={
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  <span>Refresh</span>
                </Button>

                <Link to="/users/create">
                  <Button type="button">
                    <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                    Add User
                  </Button>
                </Link>
              </>
            }
          />
        }
      >
        <CrudCard
          title="User List"
          statusSlot={
            isCacheValid ? (
              <div className="flex items-center gap-1 text-emerald-500">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
                <span className="text-xs font-medium">Cache valid</span>
              </div>
            ) : null
          }
          toolbarSlot={
            <CrudSearchInput
              value={searchQuery}
              placeholder="Search users..."
              onChange={handleSearch}
            />
          }
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : !hasUsers ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">
                No users found
              </div>
            </div>
          ) : (
            <>
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
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center text-sm text-muted-foreground"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <CrudPagination
                page={paginationInfo.currentPage}
                pageSize={10}
                totalItems={paginationInfo.totalUsers}
                hasPrevPage={paginationInfo.hasPrevPage}
                hasNextPage={paginationInfo.hasNextPage}
                onPageChange={handlePageChange}
                entityLabel="users"
              />
            </>
          )}
        </CrudCard>
      </CrudIndexLayout>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        title="Delete user"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
