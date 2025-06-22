import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Modern coral theme
const coralTheme = createTheme({
  palette: {
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
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
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
      color: '#2c3e50',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#2c3e50',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#2c3e50',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#2c3e50',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#2c3e50',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#2c3e50',
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
          backgroundColor: '#ffffff',
          color: '#2c3e50',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
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
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)',
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
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
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
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    // Input styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#ffffff',
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
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafafa',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#2c3e50',
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
    // Pagination styling
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: '8px',
            fontWeight: 500,
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

export const Layout = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={coralTheme}>
    <CssBaseline />
    <RALayout
      sx={{
        '& .RaLayout-content': {
          backgroundColor: '#fafafa',
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
  </ThemeProvider>
);
