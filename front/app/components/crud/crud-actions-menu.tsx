import { Link } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Eye, Edit, MoreHorizontal, Trash2 } from 'lucide-react'

type CrudActionsMenuProps = {
  viewUrl?: string
  editUrl?: string

  /** Chamado quando o usuário seleciona "Delete" no menu */
  onDeleteClick?: () => void

  labels?: {
    view?: string
    edit?: string
    delete?: string
  }

  hide?: {
    view?: boolean
    edit?: boolean
    delete?: boolean
  }

  extra?: React.ReactNode
}

export function CrudActionsMenu({
                                  viewUrl,
                                  editUrl,
                                  onDeleteClick,
                                  labels,
                                  hide,
                                  extra
                                }: CrudActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          aria-label="Open menu"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* VIEW */}
        {!hide?.view && viewUrl && (
          <DropdownMenuItem asChild>
            <Link to={viewUrl} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
              {labels?.view ?? 'View'}
            </Link>
          </DropdownMenuItem>
        )}

        {/* EDIT */}
        {!hide?.edit && editUrl && (
          <DropdownMenuItem asChild>
            <Link to={editUrl} className="flex items-center">
              <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
              {labels?.edit ?? 'Edit'}
            </Link>
          </DropdownMenuItem>
        )}

        {/* EXTRA SLOT (opcional) */}
        {extra}

        {/* DELETE */}
        {!hide?.delete && onDeleteClick && (
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              onDeleteClick()
            }}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
            {labels?.delete ?? 'Delete'}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
