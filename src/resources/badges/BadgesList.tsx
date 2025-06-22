import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  useRecordContext
} from 'react-admin';
import { Chip, Box, Avatar } from '@mui/material';
import { 
  EmojiEvents, 
  Chat, 
  School, 
  LocalFireDepartment, 
  Star,
  TrendingUp 
} from '@mui/icons-material';

const BadgeIcon = () => {
  const record = useRecordContext();
  const iconName = record?.icon || 'star';
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-circle':
        return <Chat />;
      case 'school':
        return <School />;
      case 'streak':
        return <LocalFireDepartment />;
      case 'trending-up':
        return <TrendingUp />;
      case 'trophy':
        return <EmojiEvents />;
      default:
        return <Star />;
    }
  };
  
  const getColor = (iconName: string) => {
    switch (iconName) {
      case 'message-circle':
        return '#2196f3';
      case 'school':
        return '#4caf50';
      case 'streak':
        return '#ff9800';
      case 'trending-up':
        return '#9c27b0';
      case 'trophy':
        return '#ffc107';
      default:
        return '#757575';
    }
  };
  
  return (
    <Avatar 
      sx={{ 
        bgcolor: getColor(iconName), 
        width: 40, 
        height: 40 
      }}
    >
      {getIcon(iconName)}
    </Avatar>
  );
};

const BadgeType = () => {
  const record = useRecordContext();
  const badgeId = record?.id || '';
  
  const getType = (id: string) => {
    if (id.includes('conversation')) return 'Conversation';
    if (id.includes('streak')) return 'Streak';
    if (id.includes('assessment')) return 'Assessment';
    if (id.includes('level')) return 'Level';
    return 'Achievement';
  };
  
  const getColor = (type: string) => {
    switch (type) {
      case 'Conversation':
        return 'primary';
      case 'Streak':
        return 'warning';
      case 'Assessment':
        return 'success';
      case 'Level':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  const type = getType(badgeId);
  
  return (
    <Chip 
      label={type} 
      size="small" 
      color={getColor(type) as "primary" | "secondary" | "success" | "warning" | "default"}
      variant="outlined"
    />
  );
};

export const BadgesList = () => (
  <List
    title="Badge System"
    perPage={25}
    sort={{ field: 'name', order: 'ASC' }}
  >
    <Datagrid rowClick="show">
      <FunctionField 
        label="Icon" 
        render={() => <BadgeIcon />}
      />
      <TextField source="id" label="Badge ID" />
      <TextField source="name" label="Name" />
      <TextField source="description" label="Description" />
      <FunctionField 
        label="Type" 
        render={() => <BadgeType />}
      />
    </Datagrid>
  </List>
);
