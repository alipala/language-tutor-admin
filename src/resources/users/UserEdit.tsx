import React, { useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  TopToolbar,
  ListButton,
  ShowButton,
  DeleteButton,
  useRecordContext,
  useDelete,
  useNotify,
  useRedirect,
} from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Warning, Delete } from '@mui/icons-material';

// Language options for the select input
const languageChoices = [
  { id: 'english', name: 'English' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'german', name: 'German' },
  { id: 'italian', name: 'Italian' },
  { id: 'portuguese', name: 'Portuguese' },
  { id: 'dutch', name: 'Dutch' },
  { id: 'russian', name: 'Russian' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'korean', name: 'Korean' },
];

// CEFR level options
const levelChoices = [
  { id: 'A1', name: 'A1 - Beginner' },
  { id: 'A2', name: 'A2 - Elementary' },
  { id: 'B1', name: 'B1 - Intermediate' },
  { id: 'B2', name: 'B2 - Upper Intermediate' },
  { id: 'C1', name: 'C1 - Advanced' },
  { id: 'C2', name: 'C2 - Proficient' },
];

// Custom Delete Button with Confirmation Modal
const DeleteUserWithConfirmation = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDelete();
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();

  console.log('DeleteUserWithConfirmation rendering, record:', record);

  if (!record) {
    console.log('DeleteUserWithConfirmation: No record found, returning null');
    return null;
  }

  const handleDelete = async () => {
    if (!record) return;
    
    try {
      await deleteUser('users', { id: record.id });
      notify(`User ${record.email} deleted successfully`, { type: 'success' });
      setDeleteModalOpen(false);
      redirect('/users');
    } catch (error) {
      notify('Error deleting user', { type: 'error' });
      console.error('Delete error:', error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleDeleteClick}
        variant="contained"
        color="error"
        startIcon={<Delete />}
        sx={{
          mt: 2,
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          minWidth: 140,
          boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)',
          },
        }}
      >
        Delete User
      </Button>

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

// Edit actions toolbar with Delete button
const UserEditActions = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDelete();
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();

  const handleDelete = async () => {
    if (!record) return;
    
    try {
      await deleteUser('users', { id: record.id });
      notify(`User ${record.email} deleted successfully`, { type: 'success' });
      setDeleteModalOpen(false);
      redirect('/users');
    } catch (error) {
      notify('Error deleting user', { type: 'error' });
      console.error('Delete error:', error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  if (!record) {
    return (
      <TopToolbar>
        <ListButton />
        <ShowButton />
      </TopToolbar>
    );
  }

  return (
    <>
      <TopToolbar>
        <ListButton />
        <ShowButton />
        <Button
          onClick={handleDeleteClick}
          variant="contained"
          color="error"
          startIcon={<Delete />}
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
          Delete
        </Button>
      </TopToolbar>

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

// Main User edit component
export const UserEdit = () => (
  <Edit actions={<UserEditActions />}>
    <SimpleForm>
      <TextInput source="name" label="Full Name" required />
      <TextInput source="email" label="Email Address" type="email" disabled />
      <BooleanInput source="is_active" label="Active" />
      <BooleanInput source="is_verified" label="Verified" />
      <SelectInput
        source="preferred_language"
        label="Preferred Language"
        choices={languageChoices}
        emptyText="No language selected"
      />
      <SelectInput
        source="preferred_level"
        label="Preferred Level"
        choices={levelChoices}
        emptyText="No level selected"
      />
      
      {/* Custom Delete Button with Confirmation */}
      <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '10px' }}>
        DEBUG: DeleteUserWithConfirmation should render here
      </div>
      <DeleteUserWithConfirmation />
      
      {/* Simple fallback button for testing */}
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => alert('Simple Delete Button Works!')}
      >
        SIMPLE DELETE BUTTON (FALLBACK)
      </Button>
    </SimpleForm>
  </Edit>
);
console.log('DeleteUserWithConfirmation component loaded');
