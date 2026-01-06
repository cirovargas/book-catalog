import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TeamFlagAtom,
  AvatarAtom,
  IllustrationAtom,
  GraphicsAtom,
  FadeoutAtom,
  LogoAtom
} from '@/components/atoms/illustrations'

export default function AtomsPreview() {

  const illustrationVariants: Array<{ variant: Parameters<typeof IllustrationAtom>[0]['variant'] }> = [
    { variant: 'captain-armband' },
    { variant: 'football-goalpost' },
    { variant: 'football-boots' },
    { variant: 'football-equipament' },
    { variant: 'gooooool' },
    { variant: 'goalpost' },
    { variant: 'stadium' },
    { variant: 'shirt' },
    { variant: 'golden-boots' },
    { variant: 'locker-room' },
    { variant: 'first' },
    { variant: 'penalty' },
    { variant: 'bench' },
    { variant: 'red-card-1' },
    { variant: 'red-card-2' },
    { variant: 'golden-glove' },
    { variant: 'yellow-card' },
    { variant: 'whistle' },
    { variant: 'water' },
    { variant: 'strategy' },
    { variant: 'ball' },
    { variant: 'score-board-1' },
    { variant: 'score-board-2' },
    { variant: 'trophy' },
    { variant: 'ticket' },
    { variant: 'kicking' },
    { variant: 'board' },
    { variant: 'free-kick' },
    { variant: 'goalkeeper' },
    { variant: 'goalkeeper-gloves' }
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Atomic Components Preview</h1>
        <p className="text-muted-foreground">
          Visual inspection of all atomic components from the Figma Átomos section
        </p>
      </div>

      {/* Team Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Team Flags</CardTitle>
          <CardDescription>Generic team/organization flag placeholder component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Generic Placeholder (md size)</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <TeamFlagAtom variant="team-1" size="md" />
                  <span className="text-xs text-muted-foreground text-center">
                    Team Flag Placeholder
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Size Variants</h3>
              <div className="flex items-end gap-4">
                <div className="flex flex-col items-center gap-2">
                  <TeamFlagAtom variant="team-1" size="sm" />
                  <span className="text-xs text-muted-foreground">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TeamFlagAtom variant="team-1" size="md" />
                  <span className="text-xs text-muted-foreground">md</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TeamFlagAtom variant="team-1" size="lg" />
                  <span className="text-xs text-muted-foreground">lg</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TeamFlagAtom variant="team-1" size="xl" />
                  <span className="text-xs text-muted-foreground">xl</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avatars */}
      <Card>
        <CardHeader>
          <CardTitle>Avatars</CardTitle>
          <CardDescription>Avatar components with size, roundness, and picture variants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Size Variants (Round, Picture Off)</h3>
              <div className="flex items-end gap-4">
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="extra-tiny" roundness="round" picture="off" />
                  <span className="text-xs text-muted-foreground">extra-tiny</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="tiny" roundness="round" picture="off" />
                  <span className="text-xs text-muted-foreground">tiny</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="small" roundness="round" picture="off" />
                  <span className="text-xs text-muted-foreground">small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="regular" roundness="round" picture="off" />
                  <span className="text-xs text-muted-foreground">regular</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Roundness Variants (Regular Size, Picture Off)</h3>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="regular" roundness="round" picture="off" />
                  <span className="text-xs text-muted-foreground">round</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="regular" roundness="roundrect" picture="off" />
                  <span className="text-xs text-muted-foreground">roundrect</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Picture Variants (Regular Size, Round)</h3>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="regular" roundness="round" picture="off" />
                  <span className="text-xs text-muted-foreground">picture off</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AvatarAtom size="regular" roundness="round" picture="on" />
                  <span className="text-xs text-muted-foreground">picture on</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Illustrations */}
      <Card>
        <CardHeader>
          <CardTitle>Illustrations</CardTitle>
          <CardDescription>Sports-related illustration icons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">All Variants (md size)</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                {illustrationVariants.map(({ variant }) => (
                  <div key={variant} className="flex flex-col items-center gap-2">
                    <IllustrationAtom variant={variant} size="md" />
                    <span className="text-xs text-muted-foreground text-center">{variant}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Size Variants</h3>
              <div className="flex items-end gap-4">
                <div className="flex flex-col items-center gap-2">
                  <IllustrationAtom variant="trophy" size="sm" />
                  <span className="text-xs text-muted-foreground">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IllustrationAtom variant="trophy" size="md" />
                  <span className="text-xs text-muted-foreground">md</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IllustrationAtom variant="trophy" size="lg" />
                  <span className="text-xs text-muted-foreground">lg</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IllustrationAtom variant="trophy" size="xl" />
                  <span className="text-xs text-muted-foreground">xl</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphics */}
      <Card>
        <CardHeader>
          <CardTitle>Graphics</CardTitle>
          <CardDescription>Graphic elements (curved shapes, lines, glow, overlay)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">All Variants (md size)</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col items-center gap-2">
                  <GraphicsAtom variant="vector-blue" size="md" />
                  <span className="text-xs text-muted-foreground">curved-shape</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <GraphicsAtom variant="vector-yellow" size="md" />
                  <span className="text-xs text-muted-foreground">line</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Size Variants (Glow)</h3>
              <div className="flex items-end gap-4">
                <div className="flex flex-col items-center gap-2">
                  <GraphicsAtom variant="vector-blue" size="sm" />
                  <span className="text-xs text-muted-foreground">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <GraphicsAtom variant="vector-yellow" size="md" />
                  <span className="text-xs text-muted-foreground">md</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fadeout */}
      <Card>
        <CardHeader>
          <CardTitle>Fadeout Bar</CardTitle>
          <CardDescription>Fade out gradient element with directional variants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Direction Variants</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">Top</span>
                  <div className="relative w-full h-20 bg-muted rounded">
                    <FadeoutAtom direction="top" height="40px" className="absolute top-0 left-0 right-0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">Bottom</span>
                  <div className="relative w-full h-20 bg-muted rounded">
                    <FadeoutAtom direction="bottom" height="40px" className="absolute bottom-0 left-0 right-0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">Left</span>
                  <div className="relative w-full h-20 bg-muted rounded flex">
                    <FadeoutAtom direction="left" height="40px" className="h-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">Right</span>
                  <div className="relative w-full h-20 bg-muted rounded flex justify-end">
                    <FadeoutAtom direction="right" height="40px" className="h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo */}
      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
          <CardDescription>Generic logo placeholder component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">All Variants (md size)</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col items-center gap-2">
                  <LogoAtom variant="primary" size="md" />
                  <span className="text-xs text-muted-foreground">primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogoAtom variant="secondary" size="md" />
                  <span className="text-xs text-muted-foreground">secondary</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Size Variants</h3>
              <div className="flex items-end gap-4">
                <div className="flex flex-col items-center gap-2">
                  <LogoAtom variant="primary" size="sm" />
                  <span className="text-xs text-muted-foreground">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogoAtom variant="primary" size="md" />
                  <span className="text-xs text-muted-foreground">md</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogoAtom variant="primary" size="lg" />
                  <span className="text-xs text-muted-foreground">lg</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogoAtom variant="primary" size="xl" />
                  <span className="text-xs text-muted-foreground">xl</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
