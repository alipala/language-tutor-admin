import React, { useState } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  EditButton,
  ShowButton,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  TextInput,
  SelectInput,
  BooleanInput,
  useDelete,
  useNotify,
  useRefresh,
} from 'react-admin';
import { 
  Chip, 
  Box, 
  Typography, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Alert,
  AlertTitle
} from '@mui/material';
import { Search, PersonAdd, FileDownload, Delete, Warning } from '@mui/icons-material';

// Custom component for user status
const UserStatusField = ({ record }: { record?: any }) => {
  if (!record) return null;
  
  const getStatusColor = () => {
    if (!record.is_active) return 'error';
    if (!record.is_verified) return 'warning';
    return 'success';
  };

  const getStatusLabel = () => {
    if (!record.is_active) return 'Inactive';
    if (!record.is_verified) return 'Unverified';
    return 'Active';
  };

  return (
    <Chip
      label={getStatusLabel()}
      color={getStatusColor()}
      size="small"
      variant="outlined"
    />
  );
};

// Custom component for preferred language
const LanguageField = ({ record }: { record?: any }) => {
  if (!record?.preferred_language) return <span>-</span>;
  
  return (
    <Chip
      label={record.preferred_language.toUpperCase()}
      size="small"
      variant="filled"
    />
  );
};

// Intelligent search filters
const userFilters = [
  <TextInput 
    key="search"
    source="q" 
    label="Search" 
    placeholder="Search by name, email, or ID..."
    alwaysOn 
    sx={{
      '& .MuiInputBase-root': {
        backgroundColor: 'white',
        borderRadius: 2,
        '&:hover': {
          borderColor: '#F75A5A',
        },
        '&.Mui-focused': {
          borderColor: '#F75A5A',
          boxShadow: '0 0 0 2px rgba(247, 90, 90, 0.2)',
        },
      },
    }}
  />,
  <SelectInput
    key="active"
    source="is_active"
    label="Account Status"
    choices={[
      { id: true, name: 'Active' },
      { id: false, name: 'Inactive' },
    ]}
    emptyText="All Statuses"
    sx={{
      '& .MuiInputBase-root': {
        backgroundColor: 'white',
        borderRadius: 2,
      },
    }}
  />,
  <SelectInput
    key="verified"
    source="is_verified"
    label="Email Status"
    choices={[
      { id: true, name: 'Verified' },
      { id: false, name: 'Unverified' },
    ]}
    emptyText="All Email Statuses"
    sx={{
      '& .MuiInputBase-root': {
        backgroundColor: 'white',
        borderRadius: 2,
      },
    }}
  />,
  <SelectInput
    key="language"
    source="preferred_language"
    label="Language"
    choices={[
      { id: 'english', name: 'English' },
      { id: 'spanish', name: 'Spanish' },
      { id: 'french', name: 'French' },
      { id: 'german', name: 'German' },
      { id: 'dutch', name: 'Dutch' },
      { id: 'chinese', name: 'Chinese' },
      { id: 'japanese', name: 'Japanese' },
      { id: 'korean', name: 'Korean' },
    ]}
    emptyText="All Languages"
    sx={{
      '& .MuiInputBase-root': {
        backgroundColor: 'white',
        borderRadius: 2,
      },
    }}
  />,
];

// List actions toolbar with coral theme
const UserListActions = () => (
  <TopToolbar
    sx={{
      backgroundColor: 'transparent',
      '& .MuiButton-root': {
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        '&.RaCreateButton-root': {
          backgroundColor: '#F75A5A',
          color: 'white',
          '&:hover': {
            backgroundColor: '#e54545',
          },
        },
        '&.RaFilterButton-root': {
          backgroundColor: 'white',
          color: '#F75A5A',
          border: '1px solid #F75A5A',
          '&:hover': {
            backgroundColor: 'rgba(247, 90, 90, 0.1)',
          },
        },
        '&.RaExportButton-root': {
          backgroundColor: 'white',
          color: '#666',
          border: '1px solid #ddd',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    }}
  >
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <FilterButton />
      <CreateButton 
        icon={<PersonAdd />} 
        label="Add User"
        sx={{
          minWidth: 120,
        }}
      />
      <ExportButton />
    </Box>
  </TopToolbar>
);

// Modern action buttons with hover effects
const ActionButtons = ({ record }: { record?: any }) => {
  const [open, setOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const handleDelete = async () => {
    try {
      await deleteUser('users', { id: record.id });
      notify(`User ${record.email} deleted successfully`, { type: 'success' });
      refresh();
      setOpen(false);
    } catch (error) {
      notify('Error deleting user', { type: 'error' });
      console.error('Delete error:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 0.5,
        opacity: 0.7,
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      {/* Show Button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          // Navigate to show page
          window.location.href = `/_admin/#/users/${record.id}/show`;
        }}
        size="small"
        sx={{
          color: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          border: '1px solid rgba(33, 150, 243, 0.2)',
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
          },
        }}
        title="View User Details"
      >
        <Search fontSize="small" />
      </IconButton>

      {/* Edit Button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          // Navigate to edit page
          window.location.href = `/_admin/#/users/${record.id}`;
        }}
        size="small"
        sx={{
          color: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          border: '1px solid rgba(255, 152, 0, 0.2)',
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(255, 152, 0, 0.3)',
          },
        }}
        title="Edit User"
      >
        <PersonAdd fontSize="small" />
      </IconButton>

      {/* Delete Button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        size="small"
        sx={{
          color: '#f44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          border: '1px solid rgba(244, 67, 54, 0.2)',
          borderRadius: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(244, 67, 54, 0.3)',
          },
        }}
        title="Delete User"
      >
        <Delete fontSize="small" />
      </IconButton>

      {/* Confirmation Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 1 }}>
          <Warning sx={{ color: '#f44336', fontSize: 32 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Confirm User Deletion
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            <AlertTitle sx={{ fontWeight: 600 }}>This action cannot be undone!</AlertTitle>
            You are about to permanently delete this user and all their associated data.
          </Alert>
          
          <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
              User Details:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Name: <strong>{record.name}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Email: <strong>{record.email}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • ID: <strong>{record.id}</strong>
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
            <AlertTitle sx={{ fontWeight: 600 }}>Data that will be deleted:</AlertTitle>
            <Typography variant="body2">
              • User account and profile information<br/>
              • All conversation sessions<br/>
              • All learning plans and progress<br/>
              • Any associated user statistics
            </Typography>
          </Alert>

          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            This action will permanently remove all user data from the system.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              borderColor: '#666',
              color: '#666',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#333',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: '#f44336',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              '&:disabled': {
                backgroundColor: '#ffcdd2',
              },
            }}
          >
            {isLoading ? 'Deleting...' : 'Delete User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Main Users list component with modern styling
export const UserList = () => (
  <List
    actions={<UserListActions />}
    filters={userFilters}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
    sx={{
      '& .RaList-main': {
        backgroundColor: '#fafafa',
      },
      '& .MuiPaper-root': {
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
      },
    }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <EmailField source="email" label="Email" />
      <UserStatusField />
      <LanguageField />
      <TextField source="preferred_level" label="Level" />
      <DateField source="created_at" label="Created" showTime />
      <DateField source="last_login" label="Last Login" showTime />
      <ActionButtons />
    </Datagrid>
  </List>
);
