import React, { useState, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ChipField,
  FunctionField,
  useRecordContext,
  useDataProvider
} from 'react-admin';
import { Chip, Box } from '@mui/material';

const LanguageChip = () => {
  const record = useRecordContext();
  if (!record?.language) return null;
  
  return (
    <Chip 
      label={record.language.toUpperCase()} 
      size="small" 
      color="primary" 
      variant="outlined"
    />
  );
};

const LevelChip = () => {
  const record = useRecordContext();
  if (!record?.level) return null;
  
  const getColor = (level: string) => {
    if (level.startsWith('A')) return 'success';
    if (level.startsWith('B')) return 'warning';
    if (level.startsWith('C')) return 'error';
    return 'default';
  };
  
  return (
    <Chip 
      label={record.level} 
      size="small" 
      color={getColor(record.level)}
    />
  );
};

const QualityScore = () => {
  const record = useRecordContext();
  const score = record?.enhanced_analysis?.conversation_quality?.overall_score;
  
  if (!score) return <span>-</span>;
  
  const getColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
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

const UserDisplay = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (record?.user_id) {
      dataProvider.getOne('users', { id: record.user_id })
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [record?.user_id, dataProvider]);
  
  if (loading) return <span>Loading...</span>;
  if (!user) return <span>Unknown User</span>;
  
  return (
    <Box>
      <div style={{ fontWeight: 'bold' }}>{user.name || 'No Name'}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>{user.email}</div>
    </Box>
  );
};

export const ConversationList = () => (
  <List
    title="Conversation Sessions"
    perPage={25}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <FunctionField 
        label="User" 
        render={() => <UserDisplay />}
      />
      <FunctionField 
        label="Language" 
        render={() => <LanguageChip />}
      />
      <FunctionField 
        label="Level" 
        render={() => <LevelChip />}
      />
      <TextField source="topic" label="Topic" />
      <NumberField source="message_count" label="Messages" />
      <NumberField 
        source="duration_minutes" 
        label="Duration (min)"
        options={{ maximumFractionDigits: 1 }}
      />
      <FunctionField 
        label="Quality Score" 
        render={() => <QualityScore />}
      />
      <DateField source="created_at" label="Created" showTime />
    </Datagrid>
  </List>
);
