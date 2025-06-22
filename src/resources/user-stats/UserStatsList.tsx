import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  DateField,
  FunctionField,
  useRecordContext
} from 'react-admin';
import { Chip, Box } from '@mui/material';

const LevelChip = () => {
  const record = useRecordContext();
  const level = record?.level || 1;
  
  const getColor = (level: number) => {
    if (level >= 10) return 'error';
    if (level >= 5) return 'warning';
    return 'success';
  };
  
  return (
    <Chip 
      label={`Level ${level}`} 
      size="small" 
      color={getColor(level)}
    />
  );
};

const StreakIndicator = () => {
  const record = useRecordContext();
  const streak = record?.streak || 0;
  const longestStreak = record?.longest_streak || 0;
  
  return (
    <Box>
      <Chip 
        label={`${streak} days`} 
        size="small" 
        color={streak > 0 ? 'success' : 'default'}
        sx={{ mr: 1 }}
      />
      <Chip 
        label={`Best: ${longestStreak}`} 
        size="small" 
        variant="outlined"
      />
    </Box>
  );
};

const XPProgress = () => {
  const record = useRecordContext();
  const totalXP = record?.total_xp || 0;
  const levelProgress = record?.level_progress || 0;
  
  return (
    <Box>
      <div>{totalXP.toLocaleString()} XP</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>
        {Math.round(levelProgress)}% to next level
      </div>
    </Box>
  );
};

export const UserStatsList = () => (
  <List
    title="User Statistics"
    perPage={25}
    sort={{ field: 'total_xp', order: 'DESC' }}
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <ReferenceField source="user_id" reference="users" label="User">
        <TextField source="email" />
      </ReferenceField>
      <FunctionField 
        label="Level" 
        render={() => <LevelChip />}
      />
      <FunctionField 
        label="XP & Progress" 
        render={() => <XPProgress />}
      />
      <NumberField source="total_sessions" label="Sessions" />
      <NumberField 
        source="total_minutes" 
        label="Minutes"
        options={{ maximumFractionDigits: 0 }}
      />
      <FunctionField 
        label="Streak" 
        render={() => <StreakIndicator />}
      />
      <NumberField source="completed_assessments" label="Assessments" />
      <DateField source="last_activity_date" label="Last Activity" />
    </Datagrid>
  </List>
);
