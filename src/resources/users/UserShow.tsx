import React from 'react';
import {
  Show,
  TopToolbar,
  EditButton,
  ListButton,
  useRecordContext,
} from 'react-admin';
import { 
  Chip, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Stack, 
  Divider, 
  Grid,
  Paper,
  Button
} from '@mui/material';
import { 
  Person, 
  Email, 
  Language, 
  School, 
  CalendarToday, 
  CheckCircle, 
  Cancel,
  Security,
  Verified,
  Edit,
  ArrowBack,
  Badge,
  Timeline
} from '@mui/icons-material';

// Enhanced User Profile Header
const UserProfileHeader = () => {
  const record = useRecordContext();
  
  if (!record) return null;

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
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F75A5A 0%, #e54545 100%)',
          height: 120,
          position: 'relative',
        }}
      />
      <CardContent sx={{ pt: 0, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: -6, mb: 2 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              backgroundColor: getStatusColor(),
              fontSize: '2rem',
              fontWeight: 600,
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            {getInitials(record.name)}
          </Avatar>
          <Box sx={{ ml: 3, flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
              {record.name || 'Unnamed User'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label={getStatusLabel()}
                sx={{
                  backgroundColor: getStatusColor(),
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
              />
              {record.is_verified && (
                <Chip
                  icon={<Verified />}
                  label="Email Verified"
                  color="info"
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ fontSize: 18, color: '#666' }} />
              <Typography variant="body1" sx={{ color: '#666' }}>
                {record.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// User Details Section
const UserDetailsSection = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)',
        },
        gap: 3
      }}
    >
      {/* Basic Information */}
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
            Basic Information
          </Typography>
          
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                User ID
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                {record.id}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                Full Name
              </Typography>
              <Typography variant="body1">
                {record.name || 'Not provided'}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                Email Address
              </Typography>
              <Typography variant="body1">
                {record.email}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
            Account Status
          </Typography>
          
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                Account Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {record.is_active ? (
                  <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                ) : (
                  <Cancel sx={{ color: '#f44336', fontSize: 20 }} />
                )}
                <Typography variant="body1">
                  {record.is_active ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                Email Verification
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {record.is_verified ? (
                  <Verified sx={{ color: '#2196f3', fontSize: 20 }} />
                ) : (
                  <Cancel sx={{ color: '#ff9800', fontSize: 20 }} />
                )}
                <Typography variant="body1">
                  {record.is_verified ? 'Verified' : 'Unverified'}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Language sx={{ mr: 1, verticalAlign: 'middle' }} />
            Learning Preferences
          </Typography>
          
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                Preferred Language
              </Typography>
              {record.preferred_language ? (
                <Chip
                  label={record.preferred_language.toUpperCase()}
                  color="primary"
                  variant="outlined"
                />
              ) : (
                <Typography variant="body1" sx={{ color: '#999', fontStyle: 'italic' }}>
                  Not set
                </Typography>
              )}
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                Current Level
              </Typography>
              {record.preferred_level ? (
                <Chip
                  label={record.preferred_level}
                  color="secondary"
                  variant="outlined"
                />
              ) : (
                <Typography variant="body1" sx={{ color: '#999', fontStyle: 'italic' }}>
                  Not set
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
            <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
            Activity Timeline
          </Typography>
          
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                Account Created
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                <Typography variant="body1">
                  {new Date(record.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                Last Login
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                <Typography variant="body1">
                  {record.last_login ? 
                    new Date(record.last_login).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 
                    'Never logged in'
                  }
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

// Enhanced Show actions toolbar
const UserShowActions = () => (
  <TopToolbar
    sx={{
      '& .MuiButton-root': {
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        '&.RaListButton-root': {
          backgroundColor: 'white',
          color: '#666',
          border: '2px solid #ddd',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bbb',
          },
        },
        '&.RaEditButton-root': {
          backgroundColor: '#F75A5A',
          color: 'white',
          '&:hover': {
            backgroundColor: '#e54545',
          },
        },
      },
    }}
  >
    <ListButton icon={<ArrowBack />} label="Back to Users" />
    <EditButton icon={<Edit />} label="Edit User" />
  </TopToolbar>
);

// Custom Show Layout Component
const UserShowLayout = () => {
  const record = useRecordContext();

  if (!record) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Loading user details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <UserProfileHeader />
      <UserDetailsSection />
    </Box>
  );
};

// Main User show component with modern design
export const UserShow = () => (
  <Show 
    actions={<UserShowActions />}
    sx={{
      '& .RaShow-main': {
        backgroundColor: 'transparent',
      },
      '& .RaShow-card': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
      },
    }}
  >
    <UserShowLayout />
  </Show>
);
