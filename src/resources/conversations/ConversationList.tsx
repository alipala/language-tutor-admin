import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ChipField,
  FunctionField,
  useRecordContext
} from 'react-admin';
import { Chip } from '@mui/material';

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

export const ConversationList = () => (
  <List
    title="Conversation Sessions"
    perPage={25}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <ReferenceField source="user_id" reference="users" label="User">
        <TextField source="email" />
      </ReferenceField>
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
