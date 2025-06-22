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
import { Chip, Box, LinearProgress } from '@mui/material';

const LevelChip = () => {
  const record = useRecordContext();
  const level = record?.proficiency_level || '';
  
  const getColor = (level: string) => {
    if (level.startsWith('A')) return 'success';
    if (level.startsWith('B')) return 'warning';
    if (level.startsWith('C')) return 'error';
    return 'default';
  };
  
  return (
    <Chip 
      label={level} 
      size="small" 
      color={getColor(level)}
      variant="outlined"
    />
  );
};

const GoalsDisplay = () => {
  const record = useRecordContext();
  const goals = record?.goals || [];
  
  const goalColors: { [key: string]: string } = {
    'travel': '#2196f3',
    'business': '#4caf50', 
    'academic': '#ff9800',
    'daily': '#9c27b0'
  };
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {goals.slice(0, 3).map((goal: string, index: number) => (
        <Chip 
          key={index}
          label={goal.charAt(0).toUpperCase() + goal.slice(1)} 
          size="small" 
          sx={{ 
            backgroundColor: goalColors[goal] || '#757575',
            color: 'white',
            fontSize: '0.7rem'
          }}
        />
      ))}
      {goals.length > 3 && (
        <Chip 
          label={`+${goals.length - 3}`} 
          size="small" 
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
      )}
    </Box>
  );
};

const ProgressDisplay = () => {
  const record = useRecordContext();
  const completed = record?.completed_sessions || 0;
  const total = record?.total_sessions || 0;
  const percentage = record?.progress_percentage || 0;
  
  const getColor = (percentage: number) => {
    if (percentage >= 75) return '#4caf50';
    if (percentage >= 50) return '#ff9800';
    if (percentage >= 25) return '#2196f3';
    return '#f44336';
  };
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', mb: 0.5 }}>
        <span>{completed}/{total} sessions</span>
        <span>{Math.round(percentage)}%</span>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        sx={{ 
          height: 6,
          borderRadius: 3,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(percentage),
            borderRadius: 3
          }
        }}
      />
    </Box>
  );
};

const AssessmentScore = () => {
  const record = useRecordContext();
  const score = record?.assessment_data?.overall_score || 0;
  
  const getColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'error';
  };
  
  return (
    <Chip 
      label={`${Math.round(score)}%`} 
      size="small" 
      color={getColor(score)}
    />
  );
};

const DurationDisplay = () => {
  const record = useRecordContext();
  const months = record?.duration_months || 0;
  
  return (
    <Chip 
      label={`${months} months`} 
      size="small" 
      color="default"
      variant="outlined"
    />
  );
};

export const LearningPlansList = () => (
  <List
    title="Learning Plans"
    perPage={25}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="Plan ID" />
      <ReferenceField source="user_id" reference="users" label="User">
        <TextField source="email" />
      </ReferenceField>
      <TextField source="language" label="Language" />
      <FunctionField 
        label="Level" 
        render={() => <LevelChip />}
      />
      <FunctionField 
        label="Goals" 
        render={() => <GoalsDisplay />}
      />
      <FunctionField 
        label="Duration" 
        render={() => <DurationDisplay />}
      />
      <FunctionField 
        label="Progress" 
        render={() => <ProgressDisplay />}
      />
      <FunctionField 
        label="Assessment Score" 
        render={() => <AssessmentScore />}
      />
      <DateField source="created_at" label="Created" showTime />
    </Datagrid>
  </List>
);
