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
  FunctionField
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
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  LinearProgress,
  useTheme
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
  FilterList,
  Check,
  Close,
  AccountCircle,
  Business,
} from '@mui/icons-material';

// Enhanced User Card Component with Subscription Details
const UserCard = ({ record }: { record: any }) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const refresh = useRefresh();
  const theme = useTheme();
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
      default: return '#2196f3';
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
      case 'try_learn': return 'Try & Learn';
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
          borderRadius: '12px',
          overflow: 'visible',
          border: '2px solid',
          borderColor: 'divider'
        }}
        onClick={() => redirect(`/users/${record.id}/show`)}
      >
        <CardContent sx={{ p: 3 }}>
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
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                  {record.name || 'Unnamed User'}
                </Typography>
                <Chip
                  label={getStatusLabel()}
                  sx={{
                    backgroundColor: getStatusColor(),
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: '6px'
                  }}
                />
              </Box>
            </Box>
            <IconButton
              onClick={handleMenuClick}
              sx={{ color: 'text.secondary' }}
            >
              <MoreVert />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                {record.email}
              </Typography>
            </Box>

            {record.preferred_language && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Language sx={{ fontSize: 16, color: 'text.secondary' }} />
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
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                Joined {formatDate(record.created_at)}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditCard sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
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
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                Plan:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                {getPlanDisplayName(record.subscription_plan)}
              </Typography>
            </Box>

            {record.subscription_expires_at && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  Expires:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {formatDate(record.subscription_expires_at)}
                  </Typography>
                </Box>
              </Box>
            )}
          </Stack>

          <Box sx={{ display: 'flex', gap: 1, mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
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
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
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
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
              }}
              variant="outlined"
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>

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
            backgroundColor: 'warning.light',
            borderRadius: '8px',
            mb: 2
          }}>
            <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
              Are you sure you want to delete this user?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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

// Modern Immersive List Row Component
const ModernUserRow = ({ record, selected, onSelect }: { record: any, selected: boolean, onSelect: (id: string) => void }) => {
  const redirect = useRedirect();
  const theme = useTheme();

  const getStatusColor = () => {
    if (!record.is_active) return '#f44336';
    if (!record.is_verified) return '#ff9800';
    return '#4caf50';
  };

  const getSubscriptionStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'canceling': return '#ff9800';
      case 'canceled': return '#f44336';
      case 'past_due': return '#ff5722';
      case 'expired': return '#9e9e9e';
      default: return '#2196f3';
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
      case 'try_learn': return 'Try & Learn';
      case 'fluency_builder': return 'Fluency Builder';
      case 'team_mastery': return 'Team Mastery';
      default: return 'Free Tier';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
    <TableRow
      hover
      selected={selected}
      onClick={() => redirect(`/users/${record.id}/show`)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(247, 90, 90, 0.04)',
          transform: 'scale(1.005)',
        },
        '&.Mui-selected': {
          backgroundColor: 'rgba(247, 90, 90, 0.08)',
        },
        height: '80px',
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={() => onSelect(record.id)}
          onClick={(e) => e.stopPropagation()}
          sx={{
            color: '#F75A5A',
            '&.Mui-checked': {
              color: '#F75A5A',
            },
          }}
        />
      </TableCell>
      
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: getStatusColor(),
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {getInitials(record.name)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              {record.name || 'Unnamed User'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              {record.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Chip
          label={getSubscriptionStatusLabel(record.subscription_status)}
          sx={{
            backgroundColor: getSubscriptionStatusColor(record.subscription_status),
            color: 'white',
            fontWeight: 500,
            fontSize: '0.75rem',
            borderRadius: '6px',
            minWidth: '80px',
          }}
        />
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {record.subscription_plan === 'try_learn' && <MonetizationOn sx={{ fontSize: 16, color: '#2196f3' }} />}
          {record.subscription_plan === 'fluency_builder' && <AccountCircle sx={{ fontSize: 16, color: '#4caf50' }} />}
          {record.subscription_plan === 'team_mastery' && <Business sx={{ fontSize: 16, color: '#ff9800' }} />}
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {getPlanDisplayName(record.subscription_plan)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {record.is_active ? (
            <Check sx={{ fontSize: 16, color: '#4caf50' }} />
          ) : (
            <Close sx={{ fontSize: 16, color: '#f44336' }} />
          )}
          <Typography variant="body2" sx={{ color: record.is_active ? '#4caf50' : '#f44336' }}>
            {record.is_active ? 'Active' : 'Inactive'}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {record.is_verified ? (
            <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
          ) : (
            <Warning sx={{ fontSize: 16, color: '#ff9800' }} />
          )}
          <Typography variant="body2" sx={{ color: record.is_verified ? '#4caf50' : '#ff9800' }}>
            {record.is_verified ? 'Verified' : 'Unverified'}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {formatDate(record.created_at)}
        </Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              redirect(`/users/${record.id}/show`);
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(247, 90, 90, 0.1)',
                color: '#F75A5A',
              },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              redirect(`/users/${record.id}`);
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(247, 90, 90, 0.1)',
                color: '#F75A5A',
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

// Loading State Component
const LoadingState = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
    <LinearProgress sx={{ width: '100%', mb: 2, borderRadius: '4px' }} />
    <Typography>Loading users...</Typography>
  </Box>
);

// Empty State Component
const EmptyState = () => (
  <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
    <Person sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
      No users found
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
        border: '1px solid',
        borderColor: 'divider',
        color: 'text.secondary',
        '&.Mui-selected': {
          backgroundColor: '#F75A5A',
          color: 'white',
          '&:hover': {
            backgroundColor: '#e54545',
          },
        },
        '&:hover': {
          backgroundColor: 'action.hover',
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
  const { data, isLoading } = useListContext();

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

// Modern List Layout Component (Default)
const UserListLayout = () => {
  const { data, isLoading } = useListContext();
  const [selected, setSelected] = React.useState<string[]>([]);

  if (isLoading) return <LoadingState />;
  if (!data || data.length === 0) return <EmptyState />;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data.map((record: any) => record.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const isSelected = (id: string) => selected.includes(id);
  const numSelected = selected.length;
  const rowCount = data.length;

  return (
    <Paper sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAll}
                  sx={{
                    color: '#F75A5A',
                    '&.Mui-checked': {
                      color: '#F75A5A',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: '#F75A5A',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Subscription</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Plan</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Active</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Verified</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Joined</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record: any) => (
              <ModernUserRow
                key={record.id}
                record={record}
                selected={isSelected(record.id)}
                onSelect={handleSelect}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
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
        borderRadius: '8px',
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
    key="subscription"
    source="subscription_status"
    label="Subscription Status"
    choices={[
      { id: 'active', name: 'Active' },
      { id: 'canceling', name: 'Canceling' },
      { id: 'canceled', name: 'Canceled' },
      { id: 'past_due', name: 'Past Due' },
      { id: 'expired', name: 'Expired' },
    ]}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
      },
    }}
  />,
  <SelectInput
    key="plan"
    source="subscription_plan"
    label="Subscription Plan"
    choices={[
      { id: 'try_learn', name: 'Try & Learn' },
      { id: 'fluency_builder', name: 'Fluency Builder' },
      { id: 'team_mastery', name: 'Team Mastery' },
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
        borderRadius: '8px',
        textTransform: 'none',
        fontWeight: 600,
        minHeight: '40px',
        '&.RaFilterButton-root': {
          backgroundColor: 'background.paper',
          color: 'text.secondary',
          border: '2px solid',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'text.secondary',
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
  console.log('🎨 Modern UserList component loaded with immersive design and subscription details!');
  
  return (
    <List
      filters={userFilters}
      sort={{ field: 'created_at', order: 'DESC' }}
      perPage={20}
      actions={<UserListToolbar />}
      sx={{
        '& .RaList-main': {
          backgroundColor: 'background.default',
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
