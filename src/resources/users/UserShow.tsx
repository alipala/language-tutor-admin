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
  Timeline,
  CreditCard,
  MonetizationOn,
  TrendingUp,
  Assessment,
  PlayCircle,
  Warning,
  Star,
  Schedule,
  AccountBalance
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
      <CardContent sx={{ pt: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: getStatusColor(),
              fontSize: '1.5rem',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              flexShrink: 0,
            }}
          >
            {getInitials(record.name)}
          </Avatar>
          <Box sx={{ ml: 3, flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
              {record.name || 'Unnamed User'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Email sx={{ fontSize: 18, color: '#666' }} />
              <Typography variant="body1" sx={{ color: '#666' }}>
                {record.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Subscription Details Section
const SubscriptionDetailsSection = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  const getSubscriptionStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'trialing': return '#9c27b0'; // Purple for trial
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
      case 'trialing': return 'Free Trial';
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
      default: return 'Unknown Plan';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const hasSubscription = record.subscription_plan && record.subscription_plan !== 'try_learn';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
        <CreditCard sx={{ mr: 1, verticalAlign: 'middle' }} />
        Subscription Details
      </Typography>
      
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: hasSubscription ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
          },
          gap: 3
        }}
      >
        {/* Subscription Status */}
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              <MonetizationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
              Subscription Status
            </Typography>
            
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                  Current Plan
                </Typography>
                <Chip
                  label={getPlanDisplayName(record.subscription_plan)}
                  sx={{
                    backgroundColor: getSubscriptionStatusColor(record.subscription_status),
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  }}
                />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                  Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {record.subscription_status === 'active' ? (
                    <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                  ) : record.subscription_status === 'expired' || record.subscription_status === 'canceled' ? (
                    <Cancel sx={{ color: '#f44336', fontSize: 20 }} />
                  ) : (
                    <Warning sx={{ color: '#ff9800', fontSize: 20 }} />
                  )}
                  <Typography variant="body1">
                    {getSubscriptionStatusLabel(record.subscription_status)}
                  </Typography>
                </Box>
              </Box>

              {record.subscription_period && (
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                    Billing Period
                  </Typography>
                  <Chip
                    label={record.subscription_period === 'annual' ? 'Annual' : 'Monthly'}
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Stripe & Payment Info */}
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
              Payment Information
            </Typography>
            
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                  Stripe Customer ID
                </Typography>
                {record.stripe_customer_id ? (
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', p: 1, borderRadius: 1, fontSize: '0.875rem' }}>
                    {record.stripe_customer_id}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ color: '#999', fontStyle: 'italic' }}>
                    No Stripe customer
                  </Typography>
                )}
              </Box>
              
              {record.subscription_price_id && (
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                    Price ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', p: 1, borderRadius: 1, fontSize: '0.875rem' }}>
                    {record.subscription_price_id}
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                  Subscription Started
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="body1">
                    {formatDate(record.current_period_start)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                  Expires At
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="body1">
                    {formatDate(record.current_period_end)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Usage & Limits (only show if has subscription) */}
        {hasSubscription && (
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Usage & Limits
              </Typography>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                    Practice Sessions Used
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlayCircle sx={{ color: '#2196f3', fontSize: 20 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {record.practice_sessions_used || 0}
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 500 }}>
                    Assessments Used
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Assessment sx={{ color: '#ff9800', fontSize: 20 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {record.assessments_used || 0}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 0.5, fontWeight: 500 }}>
                    Current Period
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {formatDate(record.current_period_start)} - {formatDate(record.current_period_end)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Learning Plan Preservation Status */}
      {record.learning_plan_preserved && (
        <Card sx={{ mt: 3, backgroundColor: '#fff3e0', border: '1px solid #ffb74d' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Star sx={{ color: '#ff9800', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#e65100' }}>
                Learning Plan Preserved
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#bf360c', mb: 2 }}>
              This user's learning plan and progress have been preserved after subscription expiry.
            </Typography>
            {record.learning_plan_data && (
              <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 1, border: '1px solid #ffcc02' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Preserved Data Available:
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  • Learning plan structure and goals
                  • Progress milestones and achievements
                  • Vocabulary and grammar improvements
                  • Conversation history (last 10 sessions)
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
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
      <SubscriptionDetailsSection />
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
