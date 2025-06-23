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
  useRecordContext,
  useDelete,
  useNotify,
  useRedirect,
  SaveButton,
  Toolbar,
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
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { 
  Warning, 
  Delete, 
  Person, 
  Email, 
  Language, 
  School,
  Security,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

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

// Custom Delete Confirmation Modal
interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: any;
  isLoading: boolean;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, onConfirm, user, isLoading }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 3,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      }
    }}
  >
    <DialogTitle sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      pb: 2,
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#fafafa'
    }}>
      <Warning sx={{ color: '#f44336', fontSize: 28 }} />
      <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
        Delete User Account
      </Typography>
    </DialogTitle>
    
    <DialogContent sx={{ pt: 3, pb: 2 }}>
      <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
        <AlertTitle sx={{ fontWeight: 600 }}>⚠️ Permanent Action</AlertTitle>
        This action cannot be undone. All user data will be permanently deleted.
      </Alert>
      
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
            User Information
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ color: '#666', fontSize: 20 }} />
              <Typography variant="body1">
                <strong>Name:</strong> {user?.name || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ color: '#666', fontSize: 20 }} />
              <Typography variant="body1">
                <strong>Email:</strong> {user?.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Security sx={{ color: '#666', fontSize: 20 }} />
              <Typography variant="body1">
                <strong>Status:</strong>
                <Chip 
                  label={user?.is_active ? 'Active' : 'Inactive'} 
                  color={user?.is_active ? 'success' : 'default'}
                  size="small"
                  sx={{ ml: 1 }}
                />
                <Chip 
                  label={user?.is_verified ? 'Verified' : 'Unverified'} 
                  color={user?.is_verified ? 'info' : 'warning'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Alert severity="warning" sx={{ borderRadius: 2 }}>
        <AlertTitle sx={{ fontWeight: 600 }}>📊 Data to be deleted:</AlertTitle>
        <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>
          • User account and profile information<br/>
          • All conversation sessions and chat history<br/>
          • Learning plans and progress tracking data<br/>
          • Assessment results and statistics<br/>
          • User preferences and settings
        </Typography>
      </Alert>
    </DialogContent>

    <DialogActions sx={{ 
      p: 3, 
      pt: 2,
      borderTop: '1px solid #e0e0e0',
      backgroundColor: '#fafafa',
      gap: 2
    }}>
      <Button 
        onClick={onClose} 
        variant="outlined"
        size="large"
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
          minWidth: 120,
          borderColor: '#ccc',
          color: '#666',
          '&:hover': {
            borderColor: '#999',
            backgroundColor: '#f5f5f5'
          }
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        size="large"
        disabled={isLoading}
        startIcon={<Delete />}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          minWidth: 140,
          boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(244, 67, 54, 0.4)',
          },
        }}
      >
        {isLoading ? 'Deleting...' : 'Delete User'}
      </Button>
    </DialogActions>
  </Dialog>
);

// Custom Toolbar with Save and Delete buttons
const UserEditToolbar = () => {
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

  return (
    <>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SaveButton 
          variant="contained"
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            minWidth: 120,
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
          }}
        />
        
        {record && (
          <Button
            onClick={() => setDeleteModalOpen(true)}
            variant="outlined"
            color="error"
            size="large"
            startIcon={<Delete />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 140,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: 'rgba(244, 67, 54, 0.04)',
              },
            }}
          >
            Delete User
          </Button>
        )}
      </Toolbar>

      {record && (
        <DeleteUserModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          user={record}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

// Top Actions with enhanced styling
const UserEditActions = () => {
  const record = useRecordContext();

  return (
    <TopToolbar sx={{ gap: 1 }}>
      <ListButton 
        variant="outlined"
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        }}
      />
      <ShowButton 
        variant="outlined"
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        }}
      />
    </TopToolbar>
  );
};

// User Status Display Component
const UserStatusDisplay = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
          Account Status
        </Typography>
        <Stack direction="row" spacing={2}>
          <Chip
            icon={record.is_active ? <CheckCircle /> : <Cancel />}
            label={record.is_active ? 'Active Account' : 'Inactive Account'}
            color={record.is_active ? 'success' : 'default'}
            variant="outlined"
          />
          <Chip
            icon={record.is_verified ? <CheckCircle /> : <Cancel />}
            label={record.is_verified ? 'Email Verified' : 'Email Unverified'}
            color={record.is_verified ? 'info' : 'warning'}
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

// Main User Edit Component
export const UserEdit = () => (
  <Edit actions={<UserEditActions />}>
    <SimpleForm toolbar={<UserEditToolbar />}>
      {/* User Status Display */}
      <UserStatusDisplay />
      
      {/* Basic Information Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
            Basic Information
          </Typography>
          
          <TextInput 
            source="name" 
            label="Full Name" 
            required 
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextInput 
            source="email" 
            label="Email Address" 
            type="email" 
            disabled 
            fullWidth
            helperText="Email address cannot be changed"
          />
        </CardContent>
      </Card>

      {/* Account Settings Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
            Account Settings
          </Typography>
          
          <Stack spacing={2}>
            <BooleanInput 
              source="is_active" 
              label="Account Active" 
              helperText="Deactivating will prevent user from logging in"
            />
            <BooleanInput 
              source="is_verified" 
              label="Email Verified" 
              helperText="Verified users have confirmed their email address"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Learning Preferences Section */}
      <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Language sx={{ mr: 1, verticalAlign: 'middle' }} />
            Learning Preferences
          </Typography>
          
          <Stack spacing={2}>
            <SelectInput
              source="preferred_language"
              label="Preferred Language"
              choices={languageChoices}
              emptyText="No language selected"
              fullWidth
            />
            <SelectInput
              source="preferred_level"
              label="Current Level"
              choices={levelChoices}
              emptyText="No level selected"
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>
    </SimpleForm>
  </Edit>
);
