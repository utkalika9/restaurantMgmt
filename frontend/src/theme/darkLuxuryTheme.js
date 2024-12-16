// src/theme/darkLuxury.js
import { createTheme } from '@mui/material/styles';

const darkLuxuryColors = {
  base: '#121212',
  surface: '#1e1e1e',
  overlay: '#2c2c2c',
  muted: '#757575',
  subtle: '#a0a0a0',
  text: '#ffffff',
  love: '#b71c1c',
  gold: '#ffd700',
  rose: '#d4af37',
  pine: '#4caf50',
  foam: '#00bcd4',
  iris: '#9c27b0',
  highlightLow: '#1a1a1a',
  highlightMed: '#333333',
  highlightHigh: '#4d4d4d',
};

const darkLuxuryTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: darkLuxuryColors.base,
      paper: darkLuxuryColors.surface,
    },
    primary: {
      main: darkLuxuryColors.gold,
    },
    secondary: {
      main: darkLuxuryColors.rose,
    },
    error: {
      main: darkLuxuryColors.love,
    },
    warning: {
      main: darkLuxuryColors.gold,
    },
    info: {
      main: darkLuxuryColors.foam,
    },
    success: {
      main: darkLuxuryColors.pine,
    },
    text: {
      primary: darkLuxuryColors.text,
      secondary: darkLuxuryColors.subtle,
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkLuxuryColors.overlay,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap');
        body {
          background-color: ${darkLuxuryColors.base};
          color: ${darkLuxuryColors.text};
        }
      `,
    },
  },
});

export default darkLuxuryTheme;
