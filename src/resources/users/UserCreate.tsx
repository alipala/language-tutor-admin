import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  PasswordInput,
  required,
  email,
  minLength,
} from 'react-admin';
import { Box, Typography, Divider } from '@mui/material';

const validateEmail = [required(), email()];
const validatePassword = [required(), minLength(8)];
const validateName = [required(), minLength(2)];

const languageChoices = [
  { id: 'english', name: 'English' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'german', name: 'German' },
  { id: 'italian', name: 'Italian' },
  { id: 'portuguese', name: 'Portuguese' },
  { id: 'dutch', name: 'Dutch' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'korean', name: 'Korean' },
  { id: 'russian', name: 'Russian' },
  { id: 'arabic', name: 'Arabic' },
];

const levelChoices = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'elementary', name: 'Elementary' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'upper-intermediate', name: 'Upper Intermediate' },
  { id: 'advanced', name: 'Advanced' },
  { id: 'proficient', name: 'Proficient' },
];

export const UserCreate = () => (
  <Create
    title="Create New User"
    sx={{
      '& .RaCreate-main': {
        backgroundColor: '#fafafa',
      },
    }}
  >
    <SimpleForm
      sx={{
        maxWidth: 600,
        '& .MuiPaper-root': {
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(247, 90, 90, 0.1)',
          border: '1px solid rgba(247, 90, 90, 0.1)',
        },
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#F75A5A', fontWeight: 600 }}>
        Account Information
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <TextInput
          source="name"
          validate={validateName}
          fullWidth
          sx={{ flex: 1 }}
          helperText="Full name of the user"
        />
        <TextInput
          source="email"
          type="email"
          validate={validateEmail}
          fullWidth
          sx={{ flex: 1 }}
          helperText="User's email address (used for login)"
        />
      </Box>

      <PasswordInput
        source="password"
        validate={validatePassword}
        fullWidth
        helperText="Minimum 8 characters. Will be securely hashed."
        sx={{
          '& .MuiInputBase-root': {
            '&:hover': {
              borderColor: '#F75A5A',
            },
            '&.Mui-focused': {
              borderColor: '#F75A5A',
            },
          },
        }}
      />

      <Divider sx={{ my: 3, borderColor: 'rgba(247, 90, 90, 0.2)' }} />

      <Typography variant="h6" gutterBottom sx={{ color: '#F75A5A', fontWeight: 600 }}>
        Learning Preferences
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <SelectInput
          source="preferred_language"
          choices={languageChoices}
          fullWidth
          sx={{ flex: 1 }}
          helperText="Primary language to learn"
        />
        <SelectInput
          source="preferred_level"
          choices={levelChoices}
          fullWidth
          sx={{ flex: 1 }}
          helperText="Current proficiency level"
        />
      </Box>

      <Divider sx={{ my: 3, borderColor: 'rgba(247, 90, 90, 0.2)' }} />

      <Typography variant="h6" gutterBottom sx={{ color: '#F75A5A', fontWeight: 600 }}>
        Account Status
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <BooleanInput
          source="is_active"
          label="Active Account"
          defaultValue={true}
          helperText="User can log in and use the platform"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#F75A5A',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#F75A5A',
            },
          }}
        />
        <BooleanInput
          source="is_verified"
          label="Email Verified"
          defaultValue={false}
          helperText="Email address has been verified"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#F75A5A',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#F75A5A',
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(247, 90, 90, 0.05)', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
          💡 <strong>Security Note:</strong> The password will be automatically hashed using bcrypt before storage. 
          The original password cannot be retrieved from the database.
        </Typography>
      </Box>
    </SimpleForm>
  </Create>
);
