'use client'

import * as React from 'react'
import { Grid, List, Settings, LayoutGrid, FileText, User as UserIcon, Home, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import {
  SegmentedControl,
  ProfileMolecule,
  EmptyStateMolecule,
  ScrollbarMolecule,
  CheckboxGroupMolecule,
  VerticalFieldMolecule,
  PageHeaderMolecule,
  ButtonMolecule,
  ToastMolecule,
  MenuItemMolecule,
  LinkMolecule,
  EventTagMolecule
} from '@/components/molecules'
import { Button } from '@/components/ui/button'
import type { User } from '@/types/user'

export default function MoleculesPreview() {
  const [segmentedValue, setSegmentedValue] = React.useState('grid')
  const [checkboxValues, setCheckboxValues] = React.useState<string[]>(['option1'])
  const [inputValue, setInputValue] = React.useState('Value')

  const mockUser: User = {
    id: 1,
    email: 'leo@gmail.com',
    name: 'Leonardo Paiva',
    avatar: undefined,
    roles: ['user']
  }

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  const handleToastSuccess = () => {
    ToastMolecule.success('Success!', 'Operation completed successfully')
  }

  const handleToastError = () => {
    ToastMolecule.error('Error!', 'Something went wrong')
  }

  const handleToastWarning = () => {
    ToastMolecule.warning('Warning!', 'Please review this action')
  }

  const handleToastInfo = () => {
    ToastMolecule.info('Info', 'This is an informational message')
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Molecules Preview</h1>
        <p className="text-muted-foreground mt-2">Design System Molecules Components</p>
      </div>

      <Separator />

      {/* Segmented Control */}
      <Card>
        <CardHeader>
          <CardTitle>Segmented Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Basic segmented control with icons</p>
            <SegmentedControl
              items={[
                { value: 'grid', label: 'Label', icon: Grid },
                { value: 'list', label: 'Label', icon: List }
              ]}
              value={segmentedValue}
              onValueChange={setSegmentedValue}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">With disabled items</p>
            <SegmentedControl
              items={[
                { value: 'grid', label: 'Grid', icon: Grid },
                { value: 'list', label: 'List', icon: List, disabled: true }
              ]}
              defaultValue="grid"
            />
          </div>
        </CardContent>
      </Card>

      {/* Menu Item */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Using existing SidebarMenuItem components</p>
            <div className="max-w-xs border rounded-lg p-2 bg-card">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <LayoutGrid className="size-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FileText className="size-4" />
                    <span>Documents</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Logged in state</p>
              <ProfileMolecule user={mockUser} onLogout={handleLogout} />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Logged out state</p>
              <ProfileMolecule user={null} loginUrl="/login" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Empty State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-12">
            <EmptyStateMolecule
              title="No items found"
              description="Support text"
              action={{
                label: 'Call to outcome',
                onClick: () => console.log('Action clicked')
              }}
              illustration={
                <div className="size-24 rounded-lg bg-muted flex items-center justify-center">
                  <LayoutGrid className="size-12 text-muted-foreground" />
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Scrollbar */}
      <Card>
        <CardHeader>
          <CardTitle>Scrollbar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Vertical scrollbar (6px × 48px)</p>
            <div className="flex gap-4 items-center">
              <div className="border rounded-lg p-4 h-32 overflow-y-auto w-32">
                <div className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="text-sm">Item {i + 1}</div>
                  ))}
                </div>
              </div>
              <ScrollbarMolecule orientation="vertical" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Horizontal scrollbar (48px × 6px)</p>
            <div className="flex flex-col gap-4">
              <div className="border rounded-lg p-4 w-64 overflow-x-auto">
                <div className="flex gap-4 w-max">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="text-sm whitespace-nowrap">Item {i + 1}</div>
                  ))}
                </div>
              </div>
              <ScrollbarMolecule orientation="horizontal" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toast */}
      <Card>
        <CardHeader>
          <CardTitle>Toast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Trigger different toast variants</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleToastSuccess} variant="default">
              Success Toast
            </Button>
            <Button onClick={handleToastError} variant="destructive">
              Error Toast
            </Button>
            <Button onClick={handleToastWarning} variant="outline">
              Warning Toast
            </Button>
            <Button onClick={handleToastInfo} variant="secondary">
              Info Toast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Checkbox Group */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Group</CardTitle>
        </CardHeader>
        <CardContent>
          <CheckboxGroupMolecule
            label="Label"
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3', disabled: true }
            ]}
            value={checkboxValues}
            onChange={setCheckboxValues}
          />
        </CardContent>
      </Card>

      {/* Vertical Field */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Field</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <VerticalFieldMolecule label="Label" required>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Value" />
          </VerticalFieldMolecule>
          <VerticalFieldMolecule label="Label" hint="Select an item">
            <Input placeholder="Select an item" readOnly />
          </VerticalFieldMolecule>
          <VerticalFieldMolecule label="Label" error="This field is required">
            <Input aria-invalid="true" />
          </VerticalFieldMolecule>
          <VerticalFieldMolecule label="Label">
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Type your message here."
            />
          </VerticalFieldMolecule>
        </CardContent>
      </Card>

      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
        </CardHeader>
        <CardContent>
          <PageHeaderMolecule
            backLink={{ label: 'Back', href: '/dashboard' }}
            breadcrumbs={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Users', href: '/users' },
              { label: 'Profile' }
            ]}
            title="Page Title"
          />
        </CardContent>
      </Card>

      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">All color variants (LG size, enabled)</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonMolecule variant="primary" size="lg">
                Primary
              </ButtonMolecule>
              <ButtonMolecule variant="secondary" size="lg">
                Secondary
              </ButtonMolecule>
              <ButtonMolecule variant="error" size="lg">
                Error
              </ButtonMolecule>
              <ButtonMolecule variant="neutral" size="lg">
                Neutral
              </ButtonMolecule>
              <ButtonMolecule variant="tertiary" size="lg">
                Tertiary
              </ButtonMolecule>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">All color variants (LG size, disabled)</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonMolecule variant="primary" size="lg" disabled>
                Primary
              </ButtonMolecule>
              <ButtonMolecule variant="secondary" size="lg" disabled>
                Secondary
              </ButtonMolecule>
              <ButtonMolecule variant="error" size="lg" disabled>
                Error
              </ButtonMolecule>
              <ButtonMolecule variant="neutral" size="lg" disabled>
                Neutral
              </ButtonMolecule>
              <ButtonMolecule variant="tertiary" size="lg" disabled>
                Tertiary
              </ButtonMolecule>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Molecule - Legacy Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Molecule - Legacy Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Legacy variants (backward compatibility)</p>
            <div className="flex flex-wrap gap-2">
              <ButtonMolecule variant="outline">Outline</ButtonMolecule>
              <ButtonMolecule variant="ghost">Ghost</ButtonMolecule>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              <ButtonMolecule variant="primary" size="sm">
                Small
              </ButtonMolecule>
              <ButtonMolecule variant="primary" size="default">
                Default
              </ButtonMolecule>
              <ButtonMolecule variant="primary" size="lg">
                Large
              </ButtonMolecule>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Item Molecule */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Item Molecule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Variants</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule variant="active" icon={Home} label="Label" showCaret />
              <MenuItemMolecule variant="inactive" icon={CreditCard} label="Label" showCaret />
              <MenuItemMolecule variant="disabled" icon={CreditCard} label="Label" showCaret />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Without icon</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule variant="active" label="Label" showCaret />
              <MenuItemMolecule variant="inactive" label="Label" showCaret />
              <MenuItemMolecule variant="disabled" label="Label" showCaret />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Without caret</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule variant="active" icon={Home} label="Label" />
              <MenuItemMolecule variant="inactive" icon={CreditCard} label="Label" />
              <MenuItemMolecule variant="disabled" icon={CreditCard} label="Label" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Navigation with Link (to prop)</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule
                icon={Home}
                label="Dashboard"
                to="/dashboard"
              />
              <MenuItemMolecule
                icon={Settings}
                label="Settings"
                to="/theme-demo"
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Navigation with href</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule
                icon={FileText}
                label="External Link"
                href="https://example.com"
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">With submenu (items prop)</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule
                icon={Settings}
                label="Settings"
                items={[
                  { label: 'General', to: '/dashboard', onClick: () => console.log('General clicked') },
                  { label: 'Team', to: '/users', onClick: () => console.log('Team clicked') },
                  { label: 'Billing', href: '#billing', onClick: () => console.log('Billing clicked') },
                  { label: 'Disabled Item', to: '/disabled', disabled: true }
                ]}
              />
              <MenuItemMolecule
                icon={LayoutGrid}
                label="More Options"
                items={[
                  { label: 'Option 1', onClick: () => console.log('Option 1') },
                  { label: 'Option 2', onClick: () => console.log('Option 2') },
                  { label: 'Option 3', onClick: () => console.log('Option 3') }
                ]}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Button with onClick (no navigation)</p>
            <div className="flex flex-wrap items-center gap-4">
              <MenuItemMolecule
                icon={Home}
                label="Click Me"
                onClick={() => console.log('Button clicked')}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Active state is automatically detected based on current route. Try navigating to /dashboard or /users to see active highlighting.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Link Molecule */}
      <Card>
        <CardHeader>
          <CardTitle>Link Molecule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Variants</p>
            <div className="flex flex-col gap-4">
              <LinkMolecule variant="default" to="/dashboard">
                Default Link
              </LinkMolecule>
              <LinkMolecule variant="back" to="/dashboard">
                Voltar
              </LinkMolecule>
              <LinkMolecule variant="action" to="/dashboard">
                Action Link
              </LinkMolecule>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">With custom icon</p>
            <div className="flex flex-col gap-4">
              <LinkMolecule variant="default" to="/dashboard" iconLeft={Settings}>
                Settings
              </LinkMolecule>
              <LinkMolecule variant="action" to="/dashboard" iconLeft={UserIcon}>
                Profile
              </LinkMolecule>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Disabled state</p>
            <div className="flex flex-col gap-4">
              <LinkMolecule variant="back" disabled>
                Disabled Back Link
              </LinkMolecule>
              <LinkMolecule variant="action" disabled>
                Disabled Action Link
              </LinkMolecule>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">External link (href)</p>
            <div className="flex flex-col gap-4">
              <LinkMolecule variant="default" href="https://example.com" target="_blank" rel="noopener noreferrer">
                External Link
              </LinkMolecule>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Tag Molecule */}
      <Card>
        <CardHeader>
          <CardTitle>Event Tag Molecule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Image on right (default)</p>
            <div className="max-w-md">
              <EventTagMolecule
                title="Campeonato Brasileiro Série A"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Brasileirão Logo"
                onClick={() => console.log('Event tag clicked')}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Image on left</p>
            <div className="max-w-md">
              <EventTagMolecule
                title="Campeonato Brasileiro Série A"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Brasileirão Logo"
                imagePosition="left"
                onClick={() => console.log('Event tag clicked')}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">With long title (wraps on small widths)</p>
            <div className="max-w-md">
              <EventTagMolecule
                title="Campeonato Brasileiro Série A - Temporada 2024 com muitos detalhes e informações"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Brasileirão Logo"
                onClick={() => console.log('Event tag clicked')}
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">With link (to prop)</p>
            <div className="max-w-md">
              <EventTagMolecule
                title="Event with Link"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Event Logo"
                to="/dashboard"
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Non-clickable (no onClick/href/to)</p>
            <div className="max-w-md">
              <EventTagMolecule
                title="Static Event Tag"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Event Logo"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

