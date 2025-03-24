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
  // Change default value from 'default' to 'light'
  const [theme, setThemeState] = useState<ThemeOption>('light');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Wrapper function to force class updates when theme changes
  const setTheme = (newTheme: ThemeOption) => {
    console.log("Explicitly setting theme to:", newTheme);
    
    // Immediately apply the class change for faster visual feedback
    document.documentElement.classList.remove('theme-default', 'theme-dark', 'theme-light', 'theme-forest', 'theme-ocean');
    document.documentElement.classList.add(`theme-${newTheme}`);
    
    // Then update state
    setThemeState(newTheme);
    
    // Save to localStorage
    localStorage.setItem('geomagique-theme', newTheme);
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    // Try-catch to handle any localStorage errors
    try {
      const savedTheme = localStorage.getItem('geomagique-theme') as ThemeOption;
      
      if (savedTheme && ['default', 'dark', 'light', 'forest', 'ocean'].includes(savedTheme)) {
        setTheme(savedTheme);
      } else {
        // If no valid theme is found in localStorage, set light theme as default
        setTheme('light');
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      // If there's an error, still ensure light theme is set
      setTheme('light');
    }
  }, []);

  // Ensure theme class is applied whenever theme state changes
  useEffect(() => {
    console.log("Theme state changed to:", theme);
    
    // Remove all theme classes
    document.documentElement.classList.remove('theme-default', 'theme-dark', 'theme-light', 'theme-forest', 'theme-ocean');
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${theme}`);
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
