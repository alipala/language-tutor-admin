import React from 'react';
import {
  List,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
  useListContext,
  useRedirect,
  useNotify,
  useRefresh,
  TextInput,
  SelectInput,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  BooleanField,
  ChipField
} from 'react-admin';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Avatar, 
  Stack, 
  Divider, 
  Container,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from '@mui/material';
import { 
  Person, 
  Email, 
  Language, 
  CalendarToday, 
  CheckCircle, 
  Cancel,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  PersonAdd,
  FileDownload,
  CreditCard,
  MonetizationOn,
  Schedule,
  Star,
  Warning,
  ViewList,
  ViewModule,
  FilterList
} from '@mui/icons-material';

// Enhanced User Card Component with Subscription Details
const UserCard = ({ record }: { record: any }) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const refresh = useRefresh();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      // This would typically use the dataProvider
      notify(`User ${record.email} deletion initiated`, { type: 'info' });
      setDeleteModalOpen(false);
      handleMenuClose();
      refresh();
    } catch (error) {
      notify('Error deleting user', { type: 'error' });
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

  const getSubscriptionStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'canceling': return '#ff9800';
      case 'canceled': return '#f44336';
      case 'past_due': return '#ff5722';
      case 'expired': return '#9e9e9e';
      default: return '#2196f3'; // try_learn (free)
    }
  };

  const getSubscriptionStatusLabel = (status?: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'canceling': return 'Canceling';
      case 'canceled': return 'Canceled';
      case 'past_due': return 'Past Due';
      case 'expired': return 'Expired';
      default: return 'Free Tier';
    }
  };

  const getPlanDisplayName = (plan?: string) => {
    switch (plan) {
      case 'try_learn': return 'Try & Learn (Free)';
      case 'fluency_builder': return 'Fluency Builder';
      case 'team_mastery': return 'Team Mastery';
      default: return 'Free Tier';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
          borderRadius: '12px', // rounded-xl equivalent
          overflow: 'visible',
          border: '2px solid #e5e7eb'
        }}
        onClick={() => redirect(`/users/${record.id}/show`)}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: getStatusColor(),
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
                  sx={{
                    backgroundColor: getStatusColor(),
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: '6px' // Less rounded
                  }}
                />
              </Box>
            </Box>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: '#666',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
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
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '0.75rem', borderRadius: '6px' }}
                />
                {record.preferred_level && (
                  <Chip
                    label={record.preferred_level}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: '0.75rem', borderRadius: '6px' }}
                  />
                )}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Joined {formatDate(record.created_at)}
              </Typography>
            </Box>
          </Stack>

          {/* Subscription Section */}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditCard sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                Subscription
              </Typography>
            </Box>
            <Chip
              label={getSubscriptionStatusLabel(record.subscription_status)}
              sx={{
                backgroundColor: getSubscriptionStatusColor(record.subscription_status),
                color: 'white',
                fontWeight: 500,
                fontSize: '0.75rem',
                borderRadius: '6px'
              }}
            />
          </Box>

          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                Plan:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                {getPlanDisplayName(record.subscription_plan)}
              </Typography>
            </Box>

            {record.subscription_expires_at && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Expires:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, color: '#666' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {formatDate(record.subscription_expires_at)}
                  </Typography>
                </Box>
              </Box>
            )}

            {record.stripe_customer_id && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Stripe ID:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#666' }}>
                  {record.stripe_customer_id.slice(-8)}...
                </Typography>
              </Box>
            )}

            {record.learning_plan_preserved && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, p: 1, backgroundColor: '#fff3e0', borderRadius: '6px' }}>
                <Star sx={{ fontSize: 16, color: '#ff9800' }} />
                <Typography variant="body2" sx={{ color: '#e65100', fontSize: '0.75rem', fontWeight: 500 }}>
                  Learning Plan Preserved
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Button
              size="small"
              startIcon={<Visibility />}
              onClick={(e) => {
                e.stopPropagation();
                redirect(`/users/${record.id}/show`);
              }}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 500,
                color: '#666',
                border: '1px solid #ddd',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#bbb',
                },
              }}
              variant="outlined"
            >
              View Details
            </Button>
            <Button
              size="small"
              startIcon={<Edit />}
              onClick={(e) => {
                e.stopPropagation();
                redirect(`/users/${record.id}`);
              }}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 500,
                color: '#666',
                border: '1px solid #ddd',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#bbb',
                },
              }}
              variant="outlined"
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: '8px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }
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
        <MenuItem onClick={() => setDeleteModalOpen(true)}>
          <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
          <ListItemText>Delete User</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete User</DialogTitle>
        <DialogContent>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            mb: 2
          }}>
            <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
              Are you sure you want to delete this user?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              This action cannot be undone. All user data will be permanently removed.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            startIcon={<Delete />}
            variant="contained"
            color="error"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Loading State Component
const LoadingState = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
    <Typography>Loading users...</Typography>
  </Box>
);

// Empty State Component
const EmptyState = () => (
  <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
    <Person sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
    <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
      No users found
    </Typography>
    <Typography variant="body2" sx={{ color: '#999' }}>
      Users will appear here once they sign up for the platform.
    </Typography>
  </Paper>
);

// View Toggle Component
const ViewToggle = ({ view, onViewChange }: { view: 'list' | 'grid', onViewChange: (view: 'list' | 'grid') => void }) => (
  <ToggleButtonGroup
    value={view}
    exclusive
    onChange={(_, newView) => newView && onViewChange(newView)}
    size="small"
    sx={{
      '& .MuiToggleButton-root': {
        borderRadius: '8px',
        border: '1px solid #ddd',
        color: '#666',
        '&.Mui-selected': {
          backgroundColor: '#F75A5A',
          color: 'white',
          '&:hover': {
            backgroundColor: '#e54545',
          },
        },
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    }}
  >
    <ToggleButton value="list">
      <Tooltip title="List View">
        <ViewList />
      </Tooltip>
    </ToggleButton>
    <ToggleButton value="grid">
      <Tooltip title="Grid View">
        <ViewModule />
      </Tooltip>
    </ToggleButton>
  </ToggleButtonGroup>
);

// Grid Layout Component
const UserGridLayout = () => {
  const { data, isLoading, total } = useListContext();

  if (isLoading) return <LoadingState />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <Container maxWidth={false} sx={{ px: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fill, minmax(400px, 1fr))',
            lg: 'repeat(auto-fill, minmax(450px, 1fr))',
          },
          gap: 3,
          p: 3,
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

// List Layout Component (Default)
const UserListLayout = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return <LoadingState />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <Datagrid
      rowClick="show"
      sx={{
        '& .RaDatagrid-table': {
          backgroundColor: 'white',
        },
        '& .RaDatagrid-headerCell': {
          fontWeight: 600,
          backgroundColor: '#f8f9fa',
        },
        '& .MuiTableCell-root': {
          borderBottom: '1px solid #e5e7eb',
        },
      }}
    >
      <TextField source="name" label="Name" />
      <EmailField source="email" label="Email" />
      <ChipField 
        source="subscription_status" 
        label="Subscription" 
        sx={{
          '& .MuiChip-root': {
            borderRadius: '6px',
          },
        }}
      />
      <TextField source="subscription_plan" label="Plan" />
      <BooleanField source="is_active" label="Active" />
      <BooleanField source="is_verified" label="Verified" />
      <DateField source="created_at" label="Joined" />
    </Datagrid>
  );
};

// Main Layout Component with View Toggle
const UserMainLayout = () => {
  const [view, setView] = React.useState<'list' | 'grid'>('list'); // Default to list

  return (
    <Box>
      {/* View Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, px: 3 }}>
        <ViewToggle view={view} onViewChange={setView} />
      </Box>
      
      {/* Content */}
      {view === 'list' ? <UserListLayout /> : <UserGridLayout />}
    </Box>
  );
};

// Filter Components
const userFilters = [
  <TextInput
    key="search"
    source="q"
    label="Search users"
    placeholder="Search by name, email, or ID"
    alwaysOn
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px', // Less rounded
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
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
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
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
      },
    }}
  />,
  <SelectInput
    key="language"
    source="preferred_language"
    label="Language"
    choices={[
      { id: 'english', name: 'English' },
      { id: 'dutch', name: 'Dutch' },
      { id: 'spanish', name: 'Spanish' },
      { id: 'french', name: 'French' },
      { id: 'german', name: 'German' },
      { id: 'italian', name: 'Italian' },
      { id: 'portuguese', name: 'Portuguese' },
    ]}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
      },
    }}
  />,
];

// Enhanced Toolbar with buttons in same line
const UserListToolbar = () => (
  <TopToolbar
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: 2,
      '& .MuiButton-root': {
        borderRadius: '8px', // Less rounded like main page
        textTransform: 'none',
        fontWeight: 600,
        minHeight: '40px',
        '&.RaFilterButton-root': {
          backgroundColor: 'white',
          color: '#666',
          border: '2px solid #e5e7eb',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bbb',
          },
        },
        '&.RaCreateButton-root': {
          backgroundColor: '#F75A5A',
          color: 'white',
          '&:hover': {
            backgroundColor: '#e54545',
          },
        },
        '&.RaExportButton-root': {
          backgroundColor: '#2196f3',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        },
      },
    }}
  >
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <FilterButton />
      <CreateButton
        icon={<PersonAdd />}
        label="Add User"
        sx={{ minWidth: 120 }}
      />
      <ExportButton 
        icon={<FileDownload />}
        label="Export"
      />
    </Box>
  </TopToolbar>
);

// Main UserList Component
export const UserList = () => {
  console.log('🎨 Enhanced UserList component loaded with list/grid toggle and improved design!');
  
  return (
    <List
      filters={userFilters}
      sort={{ field: 'created_at', order: 'DESC' }}
      perPage={20}
      actions={<UserListToolbar />}
      sx={{
        '& .RaList-main': {
          backgroundColor: '#f8f9fa',
        },
        '& .RaList-content': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <UserMainLayout />
    </List>
  );
};
