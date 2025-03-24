import { createContext, useContext, useEffect, useState } from 'react';

// Define available themes
export type ThemeOption = 'default' | 'dark' | 'light' | 'forest' | 'ocean';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeOption>('default');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('geomagique-theme') as ThemeOption;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove('theme-default', 'theme-dark', 'theme-light', 'theme-forest', 'theme-ocean');
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('geomagique-theme', theme);
  }, [theme]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isFullscreen, toggleFullscreen }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
