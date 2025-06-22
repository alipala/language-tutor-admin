import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ArrayField,
  Datagrid,
  FunctionField,
  useRecordContext
} from 'react-admin';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const ConversationMessages = () => {
  const record = useRecordContext();
  const messages = record?.messages || [];
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Conversation Messages ({messages.length})
        </Typography>
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {messages.map((message: any, index: number) => (
            <Paper 
              key={index} 
              sx={{ 
                p: 2, 
                mb: 1, 
                backgroundColor: message.role === 'user' ? '#e3f2fd' : '#f5f5f5' 
              }}
            >
              <Typography variant="caption" color="textSecondary">
                {message.role === 'user' ? '👤 User' : '🤖 Assistant'} - {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {message.content}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const EnhancedAnalysis = () => {
  const record = useRecordContext();
  const analysis = record?.enhanced_analysis;
  
  if (!analysis) return null;
  
  const qualityScore = analysis.conversation_quality?.overall_score || 0;
  const engagement = analysis.conversation_quality?.engagement || {};
  const learningProgress = analysis.learning_progress || {};
  const aiInsights = analysis.ai_insights || {};
  
  return (
    <Grid container spacing={2}>
      {/* Quality Metrics */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Conversation Quality
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={`Overall Score: ${Math.round(qualityScore)}%`}
                color={qualityScore >= 80 ? 'success' : qualityScore >= 60 ? 'warning' : 'error'}
                size="large"
              />
            </Box>
            <Typography variant="body2" color="textSecondary">
              Engagement Score: {Math.round(engagement.score || 0)}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Avg Words per Message: {engagement.details?.avg_words_per_message || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Questions Asked: {engagement.details?.questions_asked || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Learning Progress */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Learning Progress
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Complexity Score: {Math.round(learningProgress.complexity_growth?.score || 0)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Vocabulary Diversity: {Math.round((learningProgress.improvement_indicators?.vocabulary_diversity || 0) * 100)}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Unique Words: {learningProgress.improvement_indicators?.total_unique_words || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* AI Insights */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              AI Insights (Confidence: {aiInsights.confidence_level || 0}%)
            </Typography>
            
            {aiInsights.breakthrough_moments && aiInsights.breakthrough_moments.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="success.main">
                  ✅ Breakthrough Moments:
                </Typography>
                <List dense>
                  {aiInsights.breakthrough_moments.map((moment: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={moment} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            
            {aiInsights.struggle_points && aiInsights.struggle_points.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="warning.main">
                  ⚠️ Areas for Improvement:
                </Typography>
                <List dense>
                  {aiInsights.struggle_points.map((point: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            
            {aiInsights.next_session_focus && aiInsights.next_session_focus.length > 0 && (
              <Box>
                <Typography variant="subtitle2" color="info.main">
                  🎯 Next Session Focus:
                </Typography>
                <List dense>
                  {aiInsights.next_session_focus.map((focus: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={focus} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export const ConversationShow = () => (
  <Show title="Conversation Details">
    <SimpleShowLayout>
      <Grid container spacing={3}>
        {/* Basic Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Information
              </Typography>
              <TextField source="id" label="Session ID" />
              <ReferenceField source="user_id" reference="users" label="User">
                <TextField source="email" />
              </ReferenceField>
              <TextField source="language" label="Language" />
              <TextField source="level" label="Level" />
              <TextField source="topic" label="Topic" />
              <NumberField source="message_count" label="Messages" />
              <NumberField 
                source="duration_minutes" 
                label="Duration (minutes)"
                options={{ maximumFractionDigits: 2 }}
              />
              <DateField source="created_at" label="Started" showTime />
              <DateField source="updated_at" label="Completed" showTime />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Summary
              </Typography>
              <TextField source="summary" label="AI Summary" multiline />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Messages */}
        <Grid item xs={12}>
          <FunctionField render={() => <ConversationMessages />} />
        </Grid>
        
        {/* Enhanced Analysis */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Enhanced Analysis
          </Typography>
          <FunctionField render={() => <EnhancedAnalysis />} />
        </Grid>
      </Grid>
    </SimpleShowLayout>
  </Show>
);
