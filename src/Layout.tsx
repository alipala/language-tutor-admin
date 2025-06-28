import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, AppBar, TitlePortal } from "react-admin";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton, Box, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState, createContext, useContext } from 'react';

// Dark Mode Context
const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

// Create themes
const createAppTheme = (darkMode: boolean) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#F75A5A',
      light: '#ff8a80',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7043',
      light: '#ffab91',
      dark: '#d84315',
      contrastText: '#ffffff',
    },
    background: {
      default: darkMode ? '#121212' : '#fafafa',
      paper: darkMode ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#ffffff' : '#2c3e50',
      secondary: darkMode ? '#b0b0b0' : '#7f8c8d',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f39c12',
    },
    success: {
      main: '#27ae60',
    },
    info: {
      main: '#3498db',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: darkMode ? '#ffffff' : '#2c3e50',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: darkMode ? '#ffffff' : '#2c3e50',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: darkMode ? '#ffffff' : '#2c3e50',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: darkMode ? '#ffffff' : '#2c3e50',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: darkMode ? '#ffffff' : '#2c3e50',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: darkMode ? '#ffffff' : '#2c3e50',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    // App Bar styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          color: darkMode ? '#ffffff' : '#2c3e50',
          boxShadow: darkMode 
            ? '0 2px 20px rgba(0, 0, 0, 0.3)' 
            : '0 2px 20px rgba(0, 0, 0, 0.08)',
          borderBottom: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.05)',
          '& .MuiToolbar-root': {
            minHeight: '72px',
            paddingLeft: '24px',
            paddingRight: '24px',
          },
          '& .RaAppBar-title': {
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#F75A5A',
            textDecoration: 'none',
          },
        },
      },
    },
    // Sidebar styling
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          borderRight: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: darkMode 
            ? '4px 0 20px rgba(0, 0, 0, 0.3)' 
            : '4px 0 20px rgba(0, 0, 0, 0.08)',
          '& .RaMenuItemLink-root': {
            borderRadius: '12px',
            margin: '4px 12px',
            padding: '12px 16px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(247, 90, 90, 0.08)',
              transform: 'translateX(4px)',
            },
            '&.RaMenuItemLink-active': {
              backgroundColor: '#F75A5A',
              color: '#ffffff',
              '& .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '& .MuiListItemText-primary': {
                fontWeight: 600,
              },
            },
          },
          '& .MuiListItemIcon-root': {
            color: '#F75A5A',
            minWidth: '40px',
          },
          '& .MuiListItemText-primary': {
            fontSize: '0.95rem',
            fontWeight: 500,
            color: darkMode ? '#ffffff' : 'inherit',
          },
        },
      },
    },
    // Button styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(247, 90, 90, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          backgroundColor: '#F75A5A',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#e54545',
          },
        },
        outlined: {
          borderColor: '#F75A5A',
          color: '#F75A5A',
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: 'rgba(247, 90, 90, 0.08)',
          },
        },
      },
    },
    // Card styling
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: darkMode 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          '&:hover': {
            boxShadow: darkMode 
              ? '0 8px 30px rgba(0, 0, 0, 0.4)' 
              : '0 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    // Paper styling
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: darkMode 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.05)',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        },
        elevation1: {
          boxShadow: darkMode 
            ? '0 2px 10px rgba(0, 0, 0, 0.2)' 
            : '0 2px 10px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: darkMode 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: darkMode 
            ? '0 8px 30px rgba(0, 0, 0, 0.4)' 
            : '0 8px 30px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    // Input styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: darkMode ? '#2a2a2a' : '#ffffff',
            transition: 'all 0.2s ease-in-out',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F75A5A',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F75A5A',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F75A5A',
          },
        },
      },
    },
    // Chip styling
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#F75A5A',
          color: '#ffffff',
        },
        colorSecondary: {
          backgroundColor: '#ff7043',
          color: '#ffffff',
        },
      },
    },
    // Table styling
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode ? '#2a2a2a' : '#fafafa',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: darkMode ? '#ffffff' : '#2c3e50',
            fontSize: '0.95rem',
            borderBottom: '2px solid rgba(247, 90, 90, 0.1)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(247, 90, 90, 0.04)',
            transform: 'scale(1.01)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: darkMode ? '#ffffff' : 'inherit',
          borderBottom: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    // Pagination styling
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: '8px',
            fontWeight: 500,
            color: darkMode ? '#ffffff' : 'inherit',
            '&.Mui-selected': {
              backgroundColor: '#F75A5A',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#e54545',
              },
            },
          },
        },
      },
    },
  },
});

// Custom AppBar with Dark Mode Toggle
const CustomAppBar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <AppBar>
      <TitlePortal />
      <IconButton
        onClick={toggleDarkMode}
        sx={{
          color: 'text.primary',
          backgroundColor: 'rgba(247, 90, 90, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(247, 90, 90, 0.2)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </AppBar>
  );
};

// Custom Layout Component
const CustomLayout = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useDarkMode();
  
  return (
    <RALayout
      appBar={CustomAppBar}
      sx={{
        '& .RaLayout-content': {
          backgroundColor: darkMode ? '#121212' : '#fafafa',
          minHeight: '100vh',
        },
        '& .RaLayout-contentWithSidebar': {
          marginTop: '72px',
        },
      }}
    >
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createAppTheme(darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomLayout>{children}</CustomLayout>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};
