'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  HeaderOrganism,
  ModalOrganism,
  DashboardCardOrganism,
  TotalizerOrganism,
  ToolbarOrganism,
  FooterOrganism,
  EventCardOrganism,
  TooltipOrganism,
  RowDashboard,
  RowCompany,
  RowPeople,
  RowApprove,
  RowEvent,
  RowCredenciamento,
  RowCredenciamento2,
  RowCredenciamento3,
  RowCredenciamentoPessoas
} from '@/components/organisms'
import type { User } from '@/types/user'

export default function OrganismsPreview() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [modal2Open, setModal2Open] = React.useState(false)

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

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Organisms Preview</h1>
        <p className="text-muted-foreground mt-2">Design System Organisms Components</p>
      </div>

      <Separator />

      {/* Header Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Header Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Logged in state</p>
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
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Logged out state</p>
            <div className="border rounded-lg overflow-hidden">
              <HeaderOrganism />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">With custom items</p>
            <div className="border rounded-lg overflow-hidden">
              <HeaderOrganism
                items={[
                  { label: 'Dashboard', to: '/dashboard' },
                  { label: 'Users', to: '/users' },
                  {
                    label: 'More',
                    children: [
                      { label: 'Settings', to: '/settings' },
                      { label: 'Theme', to: '/theme-demo' }
                    ]
                  }
                ]}
                user={{
                  name: 'John Doe',
                  email: 'john@example.com'
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Modal Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Basic modal with illustration</p>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <ModalOrganism
              open={modalOpen}
              onOpenChange={setModalOpen}
              title="Heading"
              description="Body"
              illustration={
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                  <span className="text-4xl">⚽</span>
                </div>
              }
              primaryAction={{
                label: 'Label',
                onClick: () => {
                  console.log('Primary action clicked')
                  setModalOpen(false)
                }
              }}
              secondaryAction={{
                label: 'Label',
                onClick: () => setModalOpen(false)
              }}
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Modal with form field</p>
            <Button onClick={() => setModal2Open(true)}>Open Modal with Form</Button>
            <ModalOrganism
              open={modal2Open}
              onOpenChange={setModal2Open}
              title="Enter your email"
              description="Please provide your email address"
              illustration={
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-3xl">📧</span>
                </div>
              }
              primaryAction={{
                label: 'Submit',
                onClick: () => {
                  console.log('Submit clicked')
                  setModal2Open(false)
                }
              }}
              secondaryAction={{
                label: 'Cancel',
                onClick: () => setModal2Open(false)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="brasil@email.com.br" />
              </div>
            </ModalOrganism>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Card Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Card Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Default with chart placeholder</p>
            <DashboardCardOrganism
              teamA={{ name: 'São Bernardo do Campo', state: 'SP' }}
              teamB={{ name: 'Ponte preta', state: 'SP' }}
              location="Vitorino Gonçalves Dias - PR"
              dateTime="22/10/2025 às 20:00 hs"
              chart={
                <div className="w-32 h-32 rounded-full border-8 border-green-500 border-t-yellow-500 flex items-center justify-center">
                  <span className="text-2xl font-bold">95%</span>
                </div>
              }
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">With custom badges</p>
            <DashboardCardOrganism
              teamA={{ name: 'Team A', state: 'SP' }}
              teamB={{ name: 'Team B', state: 'RJ' }}
              location="Stadium Name - City"
              dateTime="01/01/2025 às 15:00 hs"
              badges={[
                { label: 'Pending', value: 5, variant: 'secondary' },
                { label: 'Approved', value: 20, variant: 'secondary' }
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Totalizer Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Totalizer Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Default totalizer with all tones</p>
            <TotalizerOrganism
              items={[
                { value: 32293, label: 'Pendentes', tone: 'warning' },
                { value: 4185, label: 'Aprovados', tone: 'success' },
                { value: 7814, label: 'Reprovados', tone: 'danger' },
                { value: 32196, label: 'Total', tone: 'info' }
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Toolbar Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Toolbar Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Default toolbar actions</p>
            <ToolbarOrganism />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Custom toolbar actions</p>
            <ToolbarOrganism
              actions={[
                { label: 'Save', count: 5, tone: 'success', onClick: () => console.log('Save') },
                { label: 'Delete', count: 2, tone: 'danger', onClick: () => console.log('Delete') },
                { label: 'Export', tone: 'primary', onClick: () => console.log('Export') }
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Event Card Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Event Card Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Three variants (primary/warning/disabled)</p>
            <div className="flex flex-wrap gap-4">
              <EventCardOrganism
                teamA={{ name: 'São Bernardo do Campo', state: 'SP' }}
                teamB={{ name: 'Ponte preta', state: 'SP' }}
                location="Estádio Beira - Rio - RS"
                dateTime="22/10/2025 às 20:00 hs"
                timeRemaining="10 horas restantes"
                tone="primary"
                status="open"
                onButtonClick={() => console.log('Credenciar clicked')}
              />
              <EventCardOrganism
                teamA={{ name: 'São Bernardo do Campo', state: 'SP' }}
                teamB={{ name: 'Ponte preta', state: 'SP' }}
                location="Estádio Beira - Rio - RS"
                dateTime="22/10/2025 às 20:00 hs"
                timeRemaining="2 horas restantes"
                tone="warning"
                status="closing"
                onButtonClick={() => console.log('Credenciar clicked')}
              />
              <EventCardOrganism
                teamA={{ name: 'São Bernardo do Campo', state: 'SP' }}
                teamB={{ name: 'Ponte preta', state: 'SP' }}
                location="Estádio Beira - Rio - RS"
                dateTime="22/10/2025 às 20:00 hs"
                timeRemaining="Encerrado"
                tone="disabled"
                status="closed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Default footer</p>
            <div className="border rounded-lg overflow-hidden">
              <FooterOrganism />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Custom footer</p>
            <div className="border rounded-lg overflow-hidden">
              <FooterOrganism
                copyright="© 2025 Custom App. All rights reserved."
                links={[
                  { label: 'About', to: '/about' },
                  { label: 'Contact', to: '/contact' },
                  { label: 'Support', href: 'https://example.com/support' }
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip Organism */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip Organism</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Tooltip variants</p>
            <div className="flex flex-wrap items-center justify-center gap-4 p-4">
              <TooltipOrganism content="Default tooltip" variant="default" side="top">
                <Button variant="outline">Default</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Dark tooltip" variant="dark" side="top">
                <Button variant="outline">Dark</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Light tooltip" variant="light" side="top">
                <Button variant="outline">Light</Button>
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
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Tooltip positions (default variant)</p>
            <div className="flex flex-wrap items-center justify-center gap-8 p-8">
              <TooltipOrganism content="Tooltip text" side="top">
                <Button variant="outline">Top</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Tooltip text" side="bottom">
                <Button variant="outline">Bottom</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Tooltip text" side="left">
                <Button variant="outline">Left</Button>
              </TooltipOrganism>
              <TooltipOrganism content="Tooltip text" side="right">
                <Button variant="outline">Right</Button>
              </TooltipOrganism>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">All variants with different positions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Top</p>
                <div className="flex flex-col items-center gap-2">
                  <TooltipOrganism content="Dark tooltip" variant="dark" side="top">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Success tooltip" variant="success" side="top">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Error tooltip" variant="error" side="top">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Bottom</p>
                <div className="flex flex-col items-center gap-2">
                  <TooltipOrganism content="Light tooltip" variant="light" side="bottom">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Info tooltip" variant="info" side="bottom">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Warning tooltip" variant="warning" side="bottom">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Left</p>
                <div className="flex flex-col items-center gap-2">
                  <TooltipOrganism content="Dark tooltip" variant="dark" side="left">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Success tooltip" variant="success" side="left">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Error tooltip" variant="error" side="left">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Right</p>
                <div className="flex flex-col items-center gap-2">
                  <TooltipOrganism content="Light tooltip" variant="light" side="right">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Info tooltip" variant="info" side="right">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                  <TooltipOrganism content="Warning tooltip" variant="warning" side="right">
                    <Button variant="outline" size="sm">Hover</Button>
                  </TooltipOrganism>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Row Templates (Table Templates)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* RowDashboard */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowDashboard</p>
            <div className="border rounded-lg overflow-hidden">
              <RowDashboard
                eventTitle="Título do evento"
                location="Localização"
                badges={[
                  { label: 'Pendentes', value: 20, variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
                  { label: 'Aprovados', value: 80, variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-300' },
                  { label: 'Impressos', value: 0, variant: 'secondary', className: 'bg-blue-100 text-blue-800 border-blue-300' },
                  { label: 'Cadastros', value: 100, variant: 'secondary', className: 'bg-gray-100 text-gray-800 border-gray-300' }
                ]}
              />
            </div>
          </div>

          {/* RowCompany */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowCompany</p>
            <div className="border rounded-lg overflow-hidden">
              <RowCompany
                companyName="TV Tocantins LTDA"
                tradeName="TV Anhanguera"
                cnpj="02.526.333/001-84"
                status={{ label: 'Ativo', variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-300' }}
                onViewClick={() => console.log('View')}
                onEditClick={() => console.log('Edit')}
              />
              <RowCompany
                companyName="TV Tocantins LTDA"
                tradeName="TV Anhanguera"
                cnpj="02.526.333/001-84"
                status={{ label: 'Ativo', variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-300' }}
                selectable
                selected
                onSelectedChange={(checked) => console.log('Selected:', checked)}
              />
            </div>
          </div>

          {/* RowPeople */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowPeople</p>
            <div className="border rounded-lg overflow-hidden">
              <RowPeople
                id="15113"
                name="Rogério Rodrigues da Silva"
                email="gero&fotografia@gmail.com"
                phone="(11) 98322-3912"
                onEditClick={() => console.log('Edit')}
                onDeleteClick={() => console.log('Delete')}
              />
              <RowPeople
                id="15113"
                name="Rogério Rodrigues da Silva"
                email="gero&fotografia@gmail.com"
                phone="(11) 98322-3912"
                selectable
                selected
                onSelectedChange={(checked) => console.log('Selected:', checked)}
              />
            </div>
          </div>

          {/* RowApprove */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowApprove</p>
            <div className="border rounded-lg overflow-hidden">
              <RowApprove
                id="46288"
                companyName="TV Anhanguera"
                cnpj="02.526.333/0001-84"
                email="tv.anhanguera@gmail.com"
                status={{ label: 'Pendente', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' }}
                onSearchClick={() => console.log('Search')}
                onApproveClick={() => console.log('Approve')}
                onRejectClick={() => console.log('Reject')}
              />
              <RowApprove
                id="46288"
                companyName="TV Anhanguera"
                cnpj="02.526.333/0001-84"
                email="tv.anhanguera@gmail.com"
                status={{ label: 'Pendente', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' }}
                selectable
                selected
                onSelectedChange={(checked) => console.log('Selected:', checked)}
              />
            </div>
          </div>

          {/* RowEvent */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowEvent</p>
            <div className="border rounded-lg overflow-hidden">
              <RowEvent
                id="4628800"
                matchup="Ferroviária - SP x Bahia - BA"
                location="Estádio Beira - Rio - RS"
                dateTime="22/10/2025 às 20:00 hs"
                competition="Copa do Brasil - Feminino"
                onWorkflowClick={() => console.log('Workflow')}
                onCredentialClick={() => console.log('Credential')}
                onEditClick={() => console.log('Edit')}
              />
            </div>
          </div>

          {/* RowCredenciamento */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowCredenciamento</p>
            <div className="border rounded-lg overflow-hidden">
              <RowCredenciamento
                code="00013085"
                eventName="Campeonato Brasileiro - Série A"
                status={{ label: 'Aprovado', variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-300' }}
              />
            </div>
          </div>

          {/* RowCredenciamento2 */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowCredenciamento2</p>
            <div className="border rounded-lg overflow-hidden">
              <RowCredenciamento2
                id="4628800"
                category="Autonomos"
                count={23}
                onCredentialClick={() => console.log('Credential')}
                onEditClick={() => console.log('Edit')}
              />
            </div>
          </div>

          {/* RowCredenciamento3 */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowCredenciamento3</p>
            <div className="border rounded-lg overflow-hidden">
              <RowCredenciamento3
                id="0000023407"
                startDate="13/10/2025 - 00:00"
                endDate="22/10/2025 - 18:00"
                description="Amarelo - BRA x URU - 2018 FIFAWCRQ"
                onCredentialClick={() => console.log('Credential')}
                onEditClick={() => console.log('Edit')}
              />
            </div>
          </div>

          {/* RowCredenciamentoPessoas */}
          <div className="space-y-4">
            <p className="text-sm font-medium">RowCredenciamentoPessoas</p>
            <div className="border rounded-lg overflow-hidden">
              <RowCredenciamentoPessoas
                id="4628800"
                name="João Luiz Dela Coleta"
                document="40708987428494"
                role="Comentarista"
                portal="Portal nova 15"
                status={{ label: 'Pendente', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' }}
                onApproveClick={() => console.log('Approve')}
                onRejectClick={() => console.log('Reject')}
                onMoreClick={() => console.log('More')}
              />
              <RowCredenciamentoPessoas
                id="4628800"
                name="João Luiz Dela Coleta"
                document="40708987428494"
                role="Comentarista"
                portal="Portal nova 15"
                status={{ label: 'Pendente', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' }}
                selectable
                selected
                onSelectedChange={(checked) => console.log('Selected:', checked)}
              />
              <RowCredenciamentoPessoas
                id="4628800"
                name="João Luiz Dela Coleta"
                document="40708987428494"
                role="Comentarista"
                portal="Portal nova 15"
                status={{ label: 'Pendente', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' }}
                variant="disabled"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

