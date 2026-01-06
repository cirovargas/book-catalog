'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  HeaderOrganism,
  ModalOrganism,
  DashboardCardOrganism,
  TotalizerOrganism,
  ToolbarOrganism,
  FooterOrganism,
  EventCardOrganism,
  TooltipOrganism,
  RowPresetDefault,
  RowPresetWithActions,
  RowPresetWithMeta,
  RowPresetWithAvatar,
  RowDashboard,
  RowCompany,
  RowPeople,
  RowApprove,
  RowEvent
} from '@/components/organisms'
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
import {
  LogoAtom,
  TeamFlagAtom,
  AvatarAtom,
  IllustrationAtom
} from '@/components/atoms/illustrations'
import { Grid, List, Home, Settings } from 'lucide-react'
import type { User } from '@/types/user'

export default function ComponentsGallery() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [segmentedValue, setSegmentedValue] = React.useState('grid')
  const [checkboxValues, setCheckboxValues] = React.useState<string[]>(['option1'])
  const [inputValue, setInputValue] = React.useState('Value')

  const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'Jane Doe',
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

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Components Gallery</h1>
        <p className="text-muted-foreground">
          Comprehensive showcase of all available components: Atoms, Molecules, and Organisms
        </p>
      </div>

      <Separator />

      {/* ATOMS SECTION */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Atoms</h2>
          <p className="text-sm text-muted-foreground">Basic building blocks of the design system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Logo Atom</CardTitle>
            <CardDescription>Generic logo placeholder component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <LogoAtom variant="primary" size="sm" />
              <LogoAtom variant="primary" size="md" />
              <LogoAtom variant="primary" size="lg" />
              <LogoAtom variant="primary" size="xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Flag Atom</CardTitle>
            <CardDescription>Generic team/organization flag placeholder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <TeamFlagAtom variant="team-1" size="sm" />
              <TeamFlagAtom variant="team-1" size="md" />
              <TeamFlagAtom variant="team-1" size="lg" />
              <TeamFlagAtom variant="team-1" size="xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avatar Atom</CardTitle>
            <CardDescription>User avatar component</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <AvatarAtom size="sm" />
              <AvatarAtom size="md" />
              <AvatarAtom size="lg" />
              <AvatarAtom size="xl" />
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* MOLECULES SECTION */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Molecules</h2>
          <p className="text-sm text-muted-foreground">Combinations of atoms forming functional units</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Segmented Control</CardTitle>
          </CardHeader>
          <CardContent>
            <SegmentedControl
              items={[
                { value: 'grid', label: 'Grid', icon: Grid },
                { value: 'list', label: 'List', icon: List }
              ]}
              value={segmentedValue}
              onValueChange={setSegmentedValue}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Molecule</CardTitle>
            <CardDescription>User profile with authentication states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Logged in</p>
              <ProfileMolecule user={mockUser} onLogout={handleLogout} />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Logged out</p>
              <ProfileMolecule user={null} loginUrl="/login" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empty State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-12">
              <EmptyStateMolecule
                title="No items found"
                description="Start by adding your first item"
                action={{
                  label: 'Add Item',
                  onClick: () => console.log('Action clicked')
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vertical Field</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalFieldMolecule label="Label" required>
              <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Value" />
            </VerticalFieldMolecule>
            <VerticalFieldMolecule label="Label" hint="Helper text">
              <Input placeholder="Placeholder" />
            </VerticalFieldMolecule>
            <VerticalFieldMolecule label="Label" error="Error message">
              <Input aria-invalid="true" />
            </VerticalFieldMolecule>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Checkbox Group</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckboxGroupMolecule
              label="Options"
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

        <Card>
          <CardHeader>
            <CardTitle>Page Header</CardTitle>
          </CardHeader>
          <CardContent>
            <PageHeaderMolecule
              backLink={{ label: 'Back', href: '/dashboard' }}
              breadcrumbs={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Components', href: '/components' },
                { label: 'Gallery' }
              ]}
              title="Components Gallery"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Molecule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <ButtonMolecule variant="primary">Primary</ButtonMolecule>
              <ButtonMolecule variant="secondary">Secondary</ButtonMolecule>
              <ButtonMolecule variant="error">Error</ButtonMolecule>
              <ButtonMolecule variant="neutral">Neutral</ButtonMolecule>
              <ButtonMolecule variant="tertiary">Tertiary</ButtonMolecule>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toast</CardTitle>
            <CardDescription>Click buttons to trigger different toast types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleToastSuccess} variant="default">
                Success Toast
              </Button>
              <Button onClick={handleToastError} variant="destructive">
                Error Toast
              </Button>
              <Button onClick={() => ToastMolecule.warning('Warning!', 'Please review')} variant="outline">
                Warning Toast
              </Button>
              <Button onClick={() => ToastMolecule.info('Info', 'Information message')} variant="secondary">
                Info Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <MenuItemMolecule variant="active" icon={Home} label="Active" showCaret />
              <MenuItemMolecule variant="inactive" icon={Settings} label="Inactive" showCaret />
              <MenuItemMolecule variant="disabled" icon={Settings} label="Disabled" showCaret />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link Molecule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <LinkMolecule variant="default" to="/dashboard">
                Default Link
              </LinkMolecule>
              <LinkMolecule variant="back" to="/dashboard">
                Back
              </LinkMolecule>
              <LinkMolecule variant="action" to="/dashboard">
                Action Link
              </LinkMolecule>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md space-y-4">
              <EventTagMolecule
                title="Championship Series A"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Championship Logo"
                onClick={() => console.log('Event tag clicked')}
              />
              <EventTagMolecule
                title="Event with Link"
                imageSrc="https://via.placeholder.com/150x100/1e3a8a/ffffff?text=Logo"
                imageAlt="Event Logo"
                to="/dashboard"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* ORGANISMS SECTION */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Organisms</h2>
          <p className="text-sm text-muted-foreground">Complex components combining molecules and atoms</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Header</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <HeaderOrganism
                user={{
                  name: mockUser.name || 'User',
                  email: mockUser.email,
                  avatarSrc: mockUser.avatar
                }}
                onLogout={handleLogout}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modal / Dialog</CardTitle>
            <CardDescription>Interactive modal with overlay. Test: Open, close via Cancel, close via ESC, click overlay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <ModalOrganism
              open={modalOpen}
              onOpenChange={setModalOpen}
              title="Modal Title"
              description="This is a modal dialog. Try closing it via ESC key, clicking Cancel, or clicking the overlay."
              illustration={
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
              }
              primaryAction={{
                label: 'Confirm',
                onClick: () => {
                  console.log('Primary action clicked')
                  setModalOpen(false)
                }
              }}
              secondaryAction={{
                label: 'Cancel',
                onClick: () => setModalOpen(false)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@example.com" />
              </div>
            </ModalOrganism>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>Hover over buttons to see tooltips. Test in both light and dark mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 p-4">
              <TooltipOrganism content="Default tooltip" variant="default" side="top">
                <Button variant="outline">Default</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Info tooltip" variant="info" side="top">
                <Button variant="outline">Info</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Success tooltip" variant="success" side="top">
                <Button variant="outline">Success</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Warning tooltip" variant="warning" side="top">
                <Button variant="outline">Warning</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Error tooltip" variant="error" side="top">
                <Button variant="outline">Error</Button>
              </TooltipOrganism>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toolbar</CardTitle>
          </CardHeader>
          <CardContent>
            <ToolbarOrganism
              actions={[
                { label: 'Save', count: 5, tone: 'success', onClick: () => console.log('Save') },
                { label: 'Delete', count: 2, tone: 'danger', onClick: () => console.log('Delete') },
                { label: 'Export', tone: 'primary', onClick: () => console.log('Export') }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Totalizer</CardTitle>
          </CardHeader>
          <CardContent>
            <TotalizerOrganism
              items={[
                { value: 32293, label: 'Pending', tone: 'warning' },
                { value: 4185, label: 'Approved', tone: 'success' },
                { value: 7814, label: 'Rejected', tone: 'danger' },
                { value: 32196, label: 'Total', tone: 'info' }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <FooterOrganism />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Card</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardCardOrganism
              teamA={{ name: 'Team Alpha', state: 'NY' }}
              teamB={{ name: 'Team Beta', state: 'CA' }}
              location="Main Stadium - City"
              dateTime="01/15/2025 at 20:00"
              chart={
                <div className="w-32 h-32 rounded-full border-8 border-green-500 border-t-yellow-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">95%</span>
                </div>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <EventCardOrganism
                teamA={{ name: 'Team Alpha', state: 'NY' }}
                teamB={{ name: 'Team Beta', state: 'CA' }}
                location="Main Stadium - City"
                dateTime="01/15/2025 at 20:00"
                timeRemaining="10 hours remaining"
                tone="primary"
                status="open"
                onButtonClick={() => console.log('Register clicked')}
              />
              <EventCardOrganism
                teamA={{ name: 'Team Alpha', state: 'NY' }}
                teamB={{ name: 'Team Beta', state: 'CA' }}
                location="Main Stadium - City"
                dateTime="01/15/2025 at 20:00"
                timeRemaining="2 hours remaining"
                tone="warning"
                status="closing"
                onButtonClick={() => console.log('Register clicked')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Row Presets (Table Row Layouts)</CardTitle>
            <CardDescription>Generic table row presets for different data layouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Default Preset</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowPresetDefault
                  code="00013085"
                  eventName="Championship Event - Series A"
                  status={{ label: 'Approved', variant: 'secondary' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">With Actions</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowPresetWithActions
                  id="4628800"
                  category="Freelancers"
                  count={23}
                  onActionClick={() => console.log('View details')}
                  onEditClick={() => console.log('Edit')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">With Meta</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowPresetWithMeta
                  id="0000023407"
                  startDate="01/10/2025 - 00:00"
                  endDate="01/15/2025 - 18:00"
                  description="Media Coverage - Event Series 2025"
                  onActionClick={() => console.log('View details')}
                  onEditClick={() => console.log('Edit')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">With Avatar</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowPresetWithAvatar
                  id="4628800"
                  name="John Smith"
                  document="123456789"
                  role="Commentator"
                  portal="Portal Main"
                  status={{ label: 'Pending', variant: 'secondary' }}
                  onApproveClick={() => console.log('Approve')}
                  onRejectClick={() => console.log('Reject')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Dashboard Row</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowDashboard
                  eventTitle="Event Title"
                  location="Location"
                  badges={[
                    { label: 'Pending', value: 20, variant: 'secondary' },
                    { label: 'Approved', value: 80, variant: 'secondary' }
                  ]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Company Row</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowCompany
                  companyName="Acme Corporation Inc."
                  tradeName="Acme Corp"
                  cnpj="12.345.678/0001-90"
                  status={{ label: 'Active', variant: 'secondary' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">People Row</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowPeople
                  id="15113"
                  name="Jane Doe"
                  email="jane.doe@example.com"
                  phone="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Approve Row</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowApprove
                  id="46288"
                  companyName="Acme Corporation"
                  cnpj="12.345.678/0001-90"
                  email="contact@acme.com"
                  status={{ label: 'Pending', variant: 'secondary' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Event Row</h3>
              <div className="border rounded-lg overflow-hidden">
                <RowEvent
                  id="4628800"
                  matchup="Team Alpha - NY x Team Beta - CA"
                  location="Main Stadium - City"
                  dateTime="01/15/2025 at 20:00"
                  competition="Championship Series - Division A"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scroll Area</CardTitle>
            <CardDescription>Test scrolling functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full border rounded-lg p-4 overflow-y-auto">
              <div className="space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="text-sm">Scrollable item {i + 1}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
