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

// Delete button with confirmation modal
const DeleteUserButton = ({ record }: { record?: any }) => {
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
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        size="small"
        sx={{
          color: '#d32f2f',
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
          },
        }}
      >
        <Delete fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 1 }}>
          <Warning sx={{ color: '#d32f2f', fontSize: 32 }} />
          <Typography variant="h6" component="div">
            Confirm User Deletion
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>This action cannot be undone!</AlertTitle>
            You are about to permanently delete this user and all their associated data.
          </Alert>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>User Details:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Name: {record.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Email: {record.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • ID: {record.id}
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Data that will be deleted:</AlertTitle>
            <Typography variant="body2">
              • User account and profile information<br/>
              • All conversation sessions<br/>
              • All learning plans and progress<br/>
              • Any associated user statistics
            </Typography>
          </Alert>

          <Typography variant="body2" color="text.secondary">
            Please type the user's email address to confirm deletion:
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              borderColor: '#666',
              color: '#666',
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
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c',
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
    </>
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
      <ShowButton />
      <EditButton />
      <DeleteUserButton />
    </Datagrid>
  </List>
);
