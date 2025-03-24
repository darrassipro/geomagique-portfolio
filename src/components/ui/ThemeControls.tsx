import React from 'react';
import { Paintbrush, Maximize, Minimize } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const ThemeControls = () => {
  // Try-catch to debug any issues with the useTheme hook
  let themeContextValue;
  try {
    themeContextValue = useTheme();
  } catch (error) {
    console.error("Error accessing theme context:", error);
    // Fallback implementation in case of context issues
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            console.log("Direct theme toggle");
            // Direct DOM class toggle as a fallback
            const root = document.documentElement;
            if (root.classList.contains('theme-dark')) {
              root.classList.remove('theme-dark');
              root.classList.add('theme-light');
              localStorage.setItem('geomagique-theme', 'light');
            } else {
              root.classList.remove('theme-default');
              root.classList.add('theme-light');
              localStorage.setItem('geomagique-theme', 'light');
            }
          }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-background/50 hover:bg-primary/5 hover:text-primary transition-colors"
        >
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    );
  }

  const { theme, setTheme, isFullscreen, toggleFullscreen } = themeContextValue;

  const themes = [
    { name: 'Default', value: 'default', icon: <Paintbrush className="h-4 w-4" /> },
    { name: 'Dark', value: 'dark', icon: <Paintbrush className="h-4 w-4" /> },
    { name: 'Light', value: 'light', icon: <Paintbrush className="h-4 w-4" /> },
    { name: 'Forest', value: 'forest', icon: <Paintbrush className="h-4 w-4" /> },
    { name: 'Ocean', value: 'ocean', icon: <Paintbrush className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-background/50 hover:bg-primary/5 hover:text-primary transition-colors">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Change theme</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => {
                // Direct DOM manipulation for immediate visual feedback
                const root = document.documentElement;
                root.classList.remove('theme-default', 'theme-dark', 'theme-light', 'theme-forest', 'theme-ocean');
                root.classList.add(`theme-${t.value}`);
                
                // Update context state
                setTheme(t.value as any);
                
                // Backup: store in localStorage directly
                localStorage.setItem('geomagique-theme', t.value);
              }}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                theme === t.value && "bg-primary/10 text-primary font-medium"
              )}
            >
              {t.icon}
              <span>{t.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-background/50 hover:bg-primary/5 hover:text-primary transition-colors"
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="h-4 w-4" />
        ) : (
          <Maximize className="h-4 w-4" />
        )}
        <span className="sr-only">
          {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        </span>
      </button>
    </div>
  );
};
