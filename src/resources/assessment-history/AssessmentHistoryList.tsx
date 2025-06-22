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

const OverallScoreChip = () => {
  const record = useRecordContext();
  const score = record?.overall_score || 0;
  
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

const SkillScores = () => {
  const record = useRecordContext();
  const skillScores = record?.skill_scores || {};
  
  const skills = [
    { key: 'pronunciation', label: 'Pronunciation', color: '#2196f3' },
    { key: 'grammar', label: 'Grammar', color: '#4caf50' },
    { key: 'vocabulary', label: 'Vocabulary', color: '#ff9800' },
    { key: 'fluency', label: 'Fluency', color: '#9c27b0' },
    { key: 'coherence', label: 'Coherence', color: '#f44336' }
  ];
  
  return (
    <Box sx={{ minWidth: 200 }}>
      {skills.map(skill => {
        const score = skillScores[skill.key] || 0;
        return (
          <Box key={skill.key} sx={{ mb: 0.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span>{skill.label}</span>
              <span>{score}%</span>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={score} 
              sx={{ 
                height: 4,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: skill.color
                }
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const LevelChip = () => {
  const record = useRecordContext();
  const level = record?.level || '';
  
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

const StrengthsAndImprovements = () => {
  const record = useRecordContext();
  const strengths = record?.strengths || [];
  const improvements = record?.areas_for_improvement || [];
  
  return (
    <Box sx={{ minWidth: 250 }}>
      {strengths.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4caf50' }}>
            Strengths:
          </div>
          {strengths.slice(0, 2).map((strength: string, index: number) => (
            <Chip 
              key={index}
              label={strength} 
              size="small" 
              color="success"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
            />
          ))}
        </Box>
      )}
      {improvements.length > 0 && (
        <Box>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ff9800' }}>
            Improve:
          </div>
          {improvements.slice(0, 2).map((improvement: string, index: number) => (
            <Chip 
              key={index}
              label={improvement} 
              size="small" 
              color="warning"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export const AssessmentHistoryList = () => (
  <List
    title="Assessment History"
    perPage={25}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="Assessment ID" />
      <ReferenceField source="user_id" reference="users" label="User">
        <TextField source="email" />
      </ReferenceField>
      <TextField source="language" label="Language" />
      <FunctionField 
        label="Level" 
        render={() => <LevelChip />}
      />
      <FunctionField 
        label="Overall Score" 
        render={() => <OverallScoreChip />}
      />
      <FunctionField 
        label="Skill Breakdown" 
        render={() => <SkillScores />}
      />
      <FunctionField 
        label="Analysis" 
        render={() => <StrengthsAndImprovements />}
      />
      <DateField source="created_at" label="Assessed" showTime />
    </Datagrid>
  </List>
);
