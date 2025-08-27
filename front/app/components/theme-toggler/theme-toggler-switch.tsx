import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ThemeTogglerSwitch() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        id="theme-mode"
        checked={isDark}
        onCheckedChange={handleThemeToggle}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4" />
    </div>
  )
}
