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
  AlertTitle,
  Fade,
  Tooltip
} from '@mui/material';
import { 
  Search, 
  PersonAdd, 
  FileDownload, 
  Delete, 
  Warning, 
  Edit, 
  Visibility, 
  MoreVert 
} from '@mui/icons-material';

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

// Action Buttons Component - Simplified approach
const ActionButtons = ({ record }: { record?: any }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return <span>-</span>;

  const handleDelete = async () => {
    try {
      await deleteUser('users', { id: record.id });
      notify(`User ${record.email} deleted successfully`, { type: 'success' });
      refresh();
      setDeleteModalOpen(false);
    } catch (error) {
      notify('Error deleting user', { type: 'error' });
      console.error('Delete error:', error);
    }
  };

  const handleShowUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `#/users/${record.id}/show`;
  };

  const handleEditUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `#/users/${record.id}`;
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
        <Tooltip title="View User">
          <IconButton
            onClick={handleShowUser}
            size="small"
            sx={{
              color: '#2196f3',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit User">
          <IconButton
            onClick={handleEditUser}
            size="small"
            sx={{
              color: '#ff9800',
              '&:hover': {
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete User">
          <IconButton
            onClick={handleDeleteClick}
            size="small"
            sx={{
              color: '#f44336',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
              },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          pb: 1,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Warning sx={{ color: '#f44336', fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Confirm User Deletion
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle sx={{ fontWeight: 600 }}>This action cannot be undone!</AlertTitle>
            You are about to permanently delete this user and all their associated data.
          </Alert>
          
          <Box sx={{ 
            mb: 3, 
            p: 2, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 2,
            border: '1px solid #e9ecef'
          }}>
            <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, color: '#495057' }}>
              User Details:
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: '#6c757d' }}>
              <strong>Name:</strong> {record.name || 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: '#6c757d' }}>
              <strong>Email:</strong> {record.email}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6c757d' }}>
              <strong>ID:</strong> {record.id}
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <AlertTitle sx={{ fontWeight: 600 }}>Data that will be deleted:</AlertTitle>
            <Typography variant="body2" sx={{ mt: 1 }}>
              • User account and profile information<br/>
              • All conversation sessions and chat history<br/>
              • All learning plans and progress data<br/>
              • User statistics and analytics data
            </Typography>
          </Alert>
        </DialogContent>

        <DialogActions sx={{ 
          p: 3, 
          pt: 2,
          borderTop: '1px solid #f0f0f0',
          gap: 1
        }}>
          <Button 
            onClick={() => setDeleteModalOpen(false)} 
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 100,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 120,
              boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)',
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
      '& .RaDatagrid-table': {
        minWidth: '100%',
      },
      '& .RaDatagrid-headerCell': {
        fontWeight: 600,
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #e9ecef',
      },
      '& .RaDatagrid-rowCell': {
        borderBottom: '1px solid #f0f0f0',
        padding: '12px 8px',
      },
    }}
  >
    <Datagrid 
      rowClick="show" 
      bulkActionButtons={false}
      sx={{
        '& .MuiTableContainer-root': {
          overflowX: 'auto',
        },
      }}
    >
      <TextField source="id" label="ID" sx={{ maxWidth: 120 }} />
      <TextField source="name" label="Name" sx={{ minWidth: 120 }} />
      <EmailField source="email" label="Email" sx={{ minWidth: 200 }} />
      <UserStatusField />
      <LanguageField />
      <TextField source="preferred_level" label="Level" sx={{ minWidth: 80 }} />
      <DateField source="created_at" label="Created" showTime sx={{ minWidth: 150 }} />
      <ActionButtons />
    </Datagrid>
  </List>
);
