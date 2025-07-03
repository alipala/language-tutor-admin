import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  BooleanField,
  RichTextField,
  useRecordContext,
  TopToolbar,
  EditButton,
  DeleteButton,
  ListButton
} from 'react-admin';
import { 
  Box, 
  Typography, 
  Chip, 
  Card, 
  CardContent, 
  Divider,
  Alert
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  LocalOffer as OfferIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon
} from '@mui/icons-material';

const NotificationTypeChip = () => {
  const record = useRecordContext();
  if (!record) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return '#ff9800';
      case 'Special Offer':
        return '#4caf50';
      case 'Information':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return <BuildIcon fontSize="small" />;
      case 'Special Offer':
        return <OfferIcon fontSize="small" />;
      case 'Information':
        return <InfoIcon fontSize="small" />;
      default:
        return <NotificationsIcon fontSize="small" />;
    }
  };

  return (
    <Chip
      icon={getTypeIcon(record.notification_type)}
      label={record.notification_type}
      style={{
        backgroundColor: getTypeColor(record.notification_type),
        color: 'white',
      }}
    />
  );
};

const TargetUsersDisplay = () => {
  const record = useRecordContext();
  if (!record) return null;

  if (!record.target_user_ids || record.target_user_ids.length === 0) {
    return (
      <Box>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Target Audience
        </Typography>
        <Chip label="All Users" color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Target Audience
      </Typography>
      <Chip 
        label={`${record.target_user_ids.length} Specific Users`} 
        color="secondary" 
      />
    </Box>
  );
};

const NotificationStatus = () => {
  const record = useRecordContext();
  if (!record) return null;

  const getStatusInfo = () => {
    if (record.is_sent) {
      return {
        color: 'success' as const,
        icon: <SendIcon fontSize="small" />,
        label: 'Sent',
        description: `Sent on ${new Date(record.sent_at).toLocaleString()}`
      };
    } else if (record.send_immediately) {
      return {
        color: 'warning' as const,
        icon: <ScheduleIcon fontSize="small" />,
        label: 'Pending',
        description: 'Will be sent immediately upon creation'
      };
    } else {
      return {
        color: 'info' as const,
        icon: <ScheduleIcon fontSize="small" />,
        label: 'Scheduled',
        description: `Scheduled for ${new Date(record.scheduled_send_time).toLocaleString()}`
      };
    }
  };

  const status = getStatusInfo();

  return (
    <Box>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Status
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          icon={status.icon}
          label={status.label}
          color={status.color}
        />
      </Box>
      <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
        {status.description}
      </Typography>
    </Box>
  );
};

const NotificationContent = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification Content
        </Typography>
        <Box 
          sx={{ 
            '& h1, & h2, & h3': { 
              marginTop: 2, 
              marginBottom: 1,
              fontWeight: 'bold'
            },
            '& p': { 
              marginBottom: 1 
            },
            '& ul, & ol': { 
              paddingLeft: 2 
            }
          }}
          dangerouslySetInnerHTML={{ __html: record.content }}
        />
      </CardContent>
    </Card>
  );
};

const ShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
    <DeleteButton />
  </TopToolbar>
);

export const NotificationShow = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          <TextField source="title" />
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <NotificationTypeChip />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 3 }}>
          <TargetUsersDisplay />
          <NotificationStatus />
          
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Created By
            </Typography>
            <TextField source="created_by" />
          </Box>
          
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Created At
            </Typography>
            <DateField source="created_at" showTime />
          </Box>
        </Box>

        {/* Scheduling Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Scheduling Details
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Send Immediately
              </Typography>
              <BooleanField source="send_immediately" />
            </Box>
            
            {/* Show scheduled time if not immediate */}
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Scheduled Send Time
              </Typography>
              <DateField source="scheduled_send_time" showTime emptyText="Not scheduled" />
            </Box>
            
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Actually Sent At
              </Typography>
              <DateField source="sent_at" showTime emptyText="Not sent yet" />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <NotificationContent />
      </Box>
    </SimpleShowLayout>
  </Show>
);
