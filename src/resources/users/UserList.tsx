import React, { useState } from 'react';
import {
  List,
  TextField,
  EmailField,
  DateField,
  EditButton,
  ShowButton,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  TextInput,
  SelectInput,
  useDelete,
  useNotify,
  useRedirect,
  useListContext,
} from 'react-admin';
import { 
  Chip, 
  Box, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Alert,
  AlertTitle,
  Tooltip,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  Paper,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Container
} from '@mui/material';
import { 
  PersonAdd, 
  FileDownload, 
  Delete, 
  Warning, 
  Edit, 
  Visibility, 
  MoreVert,
  Person,
  Email,
  CheckCircle,
  Cancel,
  Language,
  School,
  CalendarToday,
  FilterList
} from '@mui/icons-material';

// Enhanced User Card Component
const UserCard = ({ record }: { record: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, { isLoading }] = useDelete();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deleteUser('users', { id: record.id });
      notify(`User ${record.email} deleted successfully`, { type: 'success' });
      setDeleteModalOpen(false);
      handleMenuClose();
    } catch (error) {
      notify('Error deleting user', { type: 'error' });
      console.error('Delete error:', error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusColor = () => {
    if (!record.is_active) return '#f44336';
    if (!record.is_verified) return '#ff9800';
    return '#4caf50';
  };

  const getStatusLabel = () => {
    if (!record.is_active) return 'Inactive';
    if (!record.is_verified) return 'Unverified';
    return 'Active';
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          border: '1px solid #e0e0e0',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(247, 90, 90, 0.15)',
            borderColor: '#F75A5A',
          }
        }}
        onClick={() => redirect(`/users/${record.id}/show`)}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header with Avatar and Actions */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: getStatusColor(),
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {getInitials(record.name)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
                  {record.name || 'Unnamed User'}
                </Typography>
                <Chip
                  label={getStatusLabel()}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(),
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
            </Box>
            
            <IconButton 
              onClick={handleMenuClick}
              size="small"
              sx={{ 
                opacity: 0.7,
                '&:hover': { opacity: 1, backgroundColor: 'rgba(247, 90, 90, 0.1)' }
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* User Details */}
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                {record.email}
              </Typography>
            </Box>

            {record.preferred_language && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Language sx={{ fontSize: 16, color: '#666' }} />
                <Chip 
                  label={record.preferred_language.toUpperCase()} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
                {record.preferred_level && (
                  <Chip 
                    label={record.preferred_level} 
                    size="small" 
                    variant="outlined"
                    color="secondary"
                    sx={{ fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Joined {new Date(record.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>

          {/* Quick Actions */}
          <Box sx={{ display: 'flex', gap: 1, mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Button
              size="small"
              startIcon={<Visibility />}
              onClick={(e) => {
                e.stopPropagation();
                redirect(`/users/${record.id}/show`);
              }}
              sx={{ 
                flex: 1,
                textTransform: 'none',
                borderRadius: 2,
                color: '#4caf50',
                borderColor: '#4caf50',
                '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
              }}
              variant="outlined"
            >
              View
            </Button>
            <Button
              size="small"
              startIcon={<Edit />}
              onClick={(e) => {
                e.stopPropagation();
                redirect(`/users/${record.id}`);
              }}
              sx={{ 
                flex: 1,
                textTransform: 'none',
                borderRadius: 2,
                color: '#F75A5A',
                borderColor: '#F75A5A',
                '&:hover': { backgroundColor: 'rgba(247, 90, 90, 0.1)' }
              }}
              variant="outlined"
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }
        }}
      >
        <MenuItem onClick={() => {
          redirect(`/users/${record.id}/show`);
          handleMenuClose();
        }}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          redirect(`/users/${record.id}`);
          handleMenuClose();
        }}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit User</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => {
            setDeleteModalOpen(true);
            handleMenuClose();
          }}
          sx={{ color: '#f44336' }}
        >
          <ListItemIcon><Delete fontSize="small" sx={{ color: '#f44336' }} /></ListItemIcon>
          <ListItemText>Delete User</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          pb: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Warning sx={{ color: '#f44336', fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete User Account
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            <AlertTitle sx={{ fontWeight: 600 }}>⚠️ Permanent Action</AlertTitle>
            This action cannot be undone. All user data will be permanently deleted.
          </Alert>
          
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            mb: 2
          }}>
            <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
              User: {record.name || 'Unnamed User'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Email: {record.email}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={isLoading}
            startIcon={<Delete />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            {isLoading ? 'Deleting...' : 'Delete User'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Custom List Component with Card Layout
const UserCardList = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Loading users...</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
        <Person sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
        <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
          No users found
        </Typography>
        <Typography variant="body2" sx={{ color: '#999' }}>
          Try adjusting your search filters or create a new user.
        </Typography>
      </Paper>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: 0 }}>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3
        }}
      >
        {data.map((record: any) => (
          <Fade in timeout={300} key={record.id}>
            <div>
              <UserCard record={record} />
            </div>
          </Fade>
        ))}
      </Box>
    </Container>
  );
};

// Enhanced search filters
const userFilters = [
  <TextInput 
    key="search"
    source="q" 
    label="Search users..." 
    placeholder="Search by name, email, or ID"
    alwaysOn 
    sx={{
      '& .MuiInputBase-root': {
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: '#F75A5A',
        },
        '&.Mui-focused': {
          borderColor: '#F75A5A',
          boxShadow: '0 0 0 3px rgba(247, 90, 90, 0.2)',
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
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }}
  />,
];

// Modern toolbar with enhanced styling
const UserListActions = () => (
  <TopToolbar
    sx={{
      backgroundColor: 'transparent',
      mb: 3,
      '& .MuiButton-root': {
        borderRadius: 3,
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&.RaCreateButton-root': {
          backgroundColor: '#F75A5A',
          color: 'white',
          px: 3,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#e54545',
            boxShadow: '0 4px 12px rgba(247, 90, 90, 0.3)',
          },
        },
        '&.RaFilterButton-root': {
          backgroundColor: 'white',
          color: '#F75A5A',
          border: '2px solid #F75A5A',
          px: 3,
          py: 1.5,
          '&:hover': {
            backgroundColor: 'rgba(247, 90, 90, 0.1)',
          },
        },
        '&.RaExportButton-root': {
          backgroundColor: 'white',
          color: '#666',
          border: '2px solid #ddd',
          px: 3,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bbb',
          },
        },
      },
    }}
  >
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <FilterButton />
      <CreateButton 
        icon={<PersonAdd />} 
        label="Add New User"
        sx={{ minWidth: 140 }}
      />
      <ExportButton icon={<FileDownload />} />
    </Box>
  </TopToolbar>
);

// Main Users list component with modern card-based design
export const UserList = () => {
  console.log('🎨 MODERN UserList component loaded!');
  
  return (
    <List
      actions={<UserListActions />}
      filters={userFilters}
      sort={{ field: 'created_at', order: 'DESC' }}
      perPage={20}
      sx={{
        '& .RaList-main': {
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          p: 3,
        },
        '& .RaList-content': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: 'none',
        },
      }}
    >
      <UserCardList />
    </List>
  );
};
