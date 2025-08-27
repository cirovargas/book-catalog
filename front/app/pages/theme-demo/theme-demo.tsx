import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
   ThemeTogglerSwitch } from '@/components/theme-toggler'
import { useTheme } from '@/components/theme-provider/theme-provider'
import { Sun, Moon, Monitor } from 'lucide-react'

export default function ThemeDemo() {
  const { theme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />
      case "dark":
        return <Moon className="h-5 w-5" />
      case "system":
        return <Monitor className="h-5 w-5" />
      default:
        return <Sun className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Theme Demo</h1>
          <p className="text-muted-foreground">
            Current theme: <span className="font-medium">{theme}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {getThemeIcon()}
            <span className="text-sm font-medium">{theme}</span>
          </div>
        </div>
      </div>

      {/* Theme Togglers Section */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Togglers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Switch Toggler:</span>
            <ThemeTogglerSwitch />
          </div>
        </CardContent>
      </Card>

      {/* UI Components Demo */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full">Submit</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Palette Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-background border"></div>
              <p className="text-xs text-center">Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-foreground border"></div>
              <p className="text-xs text-center">Foreground</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-primary border"></div>
              <p className="text-xs text-center">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-secondary border"></div>
              <p className="text-xs text-center">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-muted border"></div>
              <p className="text-xs text-center">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-accent border"></div>
              <p className="text-xs text-center">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-destructive border"></div>
              <p className="text-xs text-center">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-full rounded bg-card border"></div>
              <p className="text-xs text-center">Card</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <h3 className="text-2xl font-medium">Heading 3</h3>
          <p className="text-base">
            This is a paragraph with regular text. It demonstrates how text appears in the current theme.
          </p>
          <p className="text-sm text-muted-foreground">
            This is muted text that adapts to the theme.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
