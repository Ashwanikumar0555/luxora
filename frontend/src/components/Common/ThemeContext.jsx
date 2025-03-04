import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Create Context
const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  // Load theme from localStorage (if exists), otherwise default to 0 (Light Mode)
  const storedTheme = localStorage.getItem("themeStep");
  const [themeStep, setThemeStep] = useState(storedTheme ? parseInt(storedTheme) : 0);

  // Toggle Function for 4-Step Theme
  const toggleTheme = () => {
    const newThemeStep = (themeStep + 1) % 4; // Loops 0 → 1 → 2 → 3 → 0
    setThemeStep(newThemeStep);
    localStorage.setItem("themeStep", newThemeStep); // Save in localStorage
  };

  // Define Themes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeStep < 2 ? "light" : "dark", // Step 0 & 1 = Light, Step 2 & 3 = Dark
          primary: {
            main: ["#1976d2", "#ff9800", "#90caf9", "#673ab7"][themeStep],
          },
          secondary: {
            main: ["#dc004e", "#f57c00", "#f48fb1", "#ab47bc"][themeStep],
          },
          background: {
            default: ["#ffffff", "#f5f5f5", "#121212", "#1e1e1e"][themeStep],
            paper: ["#ffffff", "#eeeeee", "#1e1e1e", "#2c2c2c"][themeStep],
          },
          text: {
            primary: ["#000000", "#333", "#ffffff", "#e0e0e0"][themeStep],
          },
        },
      }),
    [themeStep]
  );

  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeStep");
    if (savedTheme) {
      setThemeStep(parseInt(savedTheme));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeStep, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Applies global styles */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom Hook for Theme Access
export const useThemeContext = () => useContext(ThemeContext);