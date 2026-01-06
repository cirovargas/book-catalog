import * as React from 'react'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowUpDown, Plus } from 'lucide-react'
import {
  type ColumnDef,
  type SortingState
} from '@tanstack/react-table'
import {
  CrudIndexPage,
  CrudFormModal,
  CrudDetailsPage,
  CrudActionsMenu,
  DeleteButton,
  type PaginationState
} from '@/components/crud'
import { useUsers } from '@/hooks/use-users'
import type { User } from '@/types/user'

// Mock data type for demo
interface MockItem {
  id: number
  name: string
  category: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

// Generate mock data
function generateMockItems(count: number): MockItem[] {
  const categories = ['Category A', 'Category B', 'Category C', 'Category D']
  const statuses: MockItem['status'][] = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: categories[i % categories.length],
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  }))
}

const MOCK_ITEMS = generateMockItems(50)

export default function CrudPreview() {
  const [activeSection, setActiveSection] = useState<'default-mock' | 'default-api' | 'alternative'>('default-mock')

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">CRUD Kit Preview</h1>
        <p className="text-muted-foreground">
          Comprehensive demonstration of the CRUD component kit with mock and API-integrated examples
        </p>
      </div>

      <Separator />

      {/* Section Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeSection === 'default-mock' ? 'default' : 'ghost'}
          onClick={() => setActiveSection('default-mock')}
        >
          Default CRUD (Mock)
        </Button>
        <Button
          variant={activeSection === 'default-api' ? 'default' : 'ghost'}
          onClick={() => setActiveSection('default-api')}
        >
          Default CRUD (API)
        </Button>
        <Button
          variant={activeSection === 'alternative' ? 'default' : 'ghost'}
          onClick={() => setActiveSection('alternative')}
        >
          Alternative CRUD (Mock)
        </Button>
      </div>

      {/* Default CRUD with Mock Data */}
      {activeSection === 'default-mock' && <DefaultCrudMockDemo />}

      {/* Default CRUD with API Integration */}
      {activeSection === 'default-api' && <DefaultCrudApiDemo />}

      {/* Alternative CRUD */}
      {activeSection === 'alternative' && <AlternativeCrudDemo />}
    </div>
  )
}

// ============================================================================
// DEFAULT CRUD WITH MOCK DATA
// ============================================================================

function DefaultCrudMockDemo() {
  const [items, setItems] = useState<MockItem[]>(MOCK_ITEMS)
  const [searchDraft, setSearchDraft] = useState('')
  const [searchCommitted, setSearchCommitted] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MockItem | null>(null)
  const [viewingItem, setViewingItem] = useState<MockItem | null>(null)

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = [...items]

    // Apply search
    if (searchCommitted.trim()) {
      const searchLower = searchCommitted.toLowerCase()
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    if (sorting.length > 0) {
      const sort = sorting[0]
      filtered.sort((a, b) => {
        const aVal = a[sort.id as keyof MockItem]
        const bVal = b[sort.id as keyof MockItem]

        if (aVal === bVal) return 0

        const comparison = aVal < bVal ? -1 : 1
        return sort.desc ? -comparison : comparison
      })
    }

    return filtered
  }, [items, searchCommitted, sorting])

  // Paginate
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredItems.slice(start, start + pageSize)
  }, [filteredItems, page, pageSize])

  const pagination: PaginationState = {
    page,
    pageSize,
    totalItems: filteredItems.length,
    totalPages: Math.ceil(filteredItems.length / pageSize),
    hasNextPage: page < Math.ceil(filteredItems.length / pageSize),
    hasPrevPage: page > 1
  }

  const handleSearch = () => {
    setSearchCommitted(searchDraft)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
    setPage(1)
  }

  const handleCreate = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: MockItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSubmit = async (formData: Partial<MockItem>) => {
    if (editingItem) {
      // Update
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } as MockItem : item))
    } else {
      // Create
      const newItem: MockItem = {
        id: Math.max(...items.map(i => i.id), 0) + 1,
        name: formData.name || 'New Item',
        category: formData.category || 'Category A',
        status: formData.status || 'active',
        createdAt: new Date().toISOString()
      }
      setItems([newItem, ...items])
    }
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const columns: ColumnDef<MockItem>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 p-0 font-medium"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 p-0 font-medium"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 p-0 font-medium"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const variant = status === 'active' ? 'default' : status === 'pending' ? 'secondary' : 'outline'
        return <Badge variant={variant}>{status}</Badge>
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const item = row.original
        return (
          <CrudActionsMenu
            viewUrl="#"
            editUrl="#"
            onDeleteClick={() => handleDelete(item.id)}
          />
        )
      }
    }
  ]

  if (viewingItem) {
    return (
      <CrudDetailsPage
        data={viewingItem}
        title="Item Details"
        description="View item information"
        backUrl="#"
        fields={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <Badge>{String(value)}</Badge>
          },
          {
            key: 'createdAt',
            label: 'Created At',
            render: (value) => new Date(value as string).toLocaleString()
          }
        ]}
        headerActions={
          <>
            <Button onClick={() => handleEdit(viewingItem)}>Edit</Button>
            <DeleteButton
              onConfirm={() => {
                handleDelete(viewingItem.id)
                setViewingItem(null)
              }}
            />
          </>
        }
      />
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Default CRUD Demo (Mock Data)</CardTitle>
          <CardDescription>
            This demonstrates the default CRUD template with in-memory mock data.
            Features: Search (Enter key triggers), Sorting, Pagination, Create/Edit Modal, Delete confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CrudIndexPage
            data={paginatedItems}
            columns={columns}
            title="Items"
            description="Manage your items"
            searchValue={searchDraft}
            onSearchChange={setSearchDraft}
            onSearch={handleSearch}
            searchPlaceholder="Search by name or category..."
            pagination={pagination}
            onPageChange={handlePageChange}
            entityLabel="items"
            sorting={sorting}
            onSortingChange={handleSortingChange}
            enableSorting={true}
            primaryAction={
              <Button onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                New Item
              </Button>
            }
            emptyStateTitle="No items found"
            emptyStateDescription="Create your first item to get started."
            emptyStateAction={{
              label: 'Create Item',
              onClick: handleCreate
            }}
          />
        </CardContent>
      </Card>

      <CrudFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? 'Edit Item' : 'Create Item'}
        description={editingItem ? 'Update item information' : 'Add a new item'}
        mode={editingItem ? 'edit' : 'create'}
        onSubmit={async () => {
          const nameEl = document.getElementById('item-name') as HTMLInputElement
          const categoryEl = document.getElementById('item-category') as HTMLInputElement
          const statusEl = document.getElementById('item-status') as HTMLSelectElement
          
          const formData = {
            name: nameEl?.value || '',
            category: categoryEl?.value || '',
            status: (statusEl?.value || 'active') as MockItem['status']
          }
          await handleSubmit(formData)
        }}
        isSubmitting={false}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Name</Label>
            <Input
              id="item-name"
              defaultValue={editingItem?.name}
              placeholder="Item name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-category">Category</Label>
            <Input
              id="item-category"
              defaultValue={editingItem?.category}
              placeholder="Category"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-status">Status</Label>
            <select
              id="item-status"
              defaultValue={editingItem?.status}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </CrudFormModal>
    </>
  )
}

// ============================================================================
// DEFAULT CRUD WITH API INTEGRATION
// ============================================================================

function DefaultCrudApiDemo() {
  const {
    users,
    isLoading,
    searchQuery,
    fetchUsers,
    deleteUser,
    setSearchQuery,
    paginationInfo
  } = useUsers()

  const [searchDraft, setSearchDraft] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  React.useEffect(() => {
    fetchUsers(1, '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = () => {
    setSearchQuery(searchDraft)
    fetchUsers(1, searchDraft)
  }

  const handlePageChange = (page: number) => {
    fetchUsers(page, searchQuery)
  }

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
    // In a real implementation, you'd call the API with sort params
    // For now, we'll just update local state
    fetchUsers(1, searchQuery)
  }

  const pagination: PaginationState = paginationInfo
    ? {
        page: paginationInfo.currentPage || 1,
        pageSize: 10,
        totalItems: paginationInfo.totalUsers || 0,
        totalPages: paginationInfo.totalPages || 1,
        hasNextPage: paginationInfo.hasNextPage || false,
        hasPrevPage: paginationInfo.hasPrevPage || false
      }
    : {
        page: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
      }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 p-0 font-medium"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 p-0 font-medium"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue('name') || <span className="text-muted-foreground">N/A</span>
    },
    {
      accessorKey: 'roles',
      header: 'Roles',
      cell: ({ row }) => {
        const roles = row.getValue('roles') as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {roles.map(role => (
              <Badge key={role} variant="secondary" className="text-xs">
                {role.replace('ROLE_', '')}
              </Badge>
            ))}
          </div>
        )
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original
        return (
          <CrudActionsMenu
            viewUrl={`/users/${user.id}`}
            editUrl={`/users/${user.id}/edit`}
            onDeleteClick={async () => {
              await deleteUser(user.id)
              fetchUsers(pagination.page, searchQuery)
            }}
          />
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Default CRUD Demo (API Integrated)</CardTitle>
        <CardDescription>
          This demonstrates the default CRUD template integrated with the Users API endpoint.
          All operations (search, pagination, delete) trigger real API calls.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CrudIndexPage
          data={users}
          isLoading={isLoading}
          columns={columns}
          title="Users (API)"
          description="Users from the API endpoint"
          searchValue={searchDraft}
          onSearchChange={setSearchDraft}
          onSearch={handleSearch}
          searchPlaceholder="Search users by email or name..."
          pagination={pagination}
          onPageChange={handlePageChange}
          entityLabel="users"
          sorting={sorting}
          onSortingChange={handleSortingChange}
          enableSorting={true}
          primaryAction={
            <Button onClick={() => window.location.href = '/users/create'}>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          }
        />
      </CardContent>
    </Card>
  )
}

// ============================================================================
// ALTERNATIVE CRUD (Design System Variant)
// ============================================================================

function AlternativeCrudDemo() {
  const [items] = useState<MockItem[]>(MOCK_ITEMS.slice(0, 10))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alternative CRUD Demo (Design System)</CardTitle>
        <CardDescription>
          This demonstrates the alternative CRUD variant using Design System components.
          (Note: Full implementation would use DS row organisms - this is a placeholder structure)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Alternative CRUD implementation would use Design System row organisms here.
            For now, this serves as a placeholder showing the structure.
          </p>
          <div className="border rounded-lg divide-y">
            {items.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{item.status}</Badge>
                  <CrudActionsMenu
                    onDeleteClick={() => console.log('Delete', item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

