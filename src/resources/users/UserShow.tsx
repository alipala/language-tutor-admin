import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  TopToolbar,
  EditButton,
  ListButton,
} from 'react-admin';
import { Chip, Box } from '@mui/material';

// Custom component for user status display
const UserStatusDisplay = ({ record }: { record?: any }) => {
  if (!record) return null;
  
  const getStatusColor = () => {
    if (!record.is_active) return 'error';
    if (!record.is_verified) return 'warning';
    return 'success';
  };

  const getStatusLabel = () => {
    if (!record.is_active) return 'Inactive';
    if (!record.is_verified) return 'Unverified';
    return 'Active';
  };

  return (
    <Chip
      label={getStatusLabel()}
      color={getStatusColor()}
      size="medium"
      variant="outlined"
    />
  );
};

// Custom component for language preferences
const LanguagePreferences = ({ record }: { record?: any }) => {
  if (!record) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Chip
        label={record.preferred_language || 'No language set'}
        size="small"
        variant="filled"
        color={record.preferred_language ? 'primary' : 'default'}
      />
      <Chip
        label={`Level: ${record.preferred_level || 'Not set'}`}
        size="small"
        variant="outlined"
        color={record.preferred_level ? 'secondary' : 'default'}
      />
    </Box>
  );
};

// Show actions toolbar
const UserShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

// Main User show component
export const UserShow = () => (
  <Show actions={<UserShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" label="User ID" />
      <TextField source="name" label="Full Name" />
      <EmailField source="email" label="Email Address" />
      <UserStatusDisplay />
      <LanguagePreferences />
      <BooleanField source="is_active" label="Active" />
      <BooleanField source="is_verified" label="Verified" />
      <DateField source="created_at" label="Created" showTime />
      <DateField source="last_login" label="Last Login" showTime />
    </SimpleShowLayout>
  </Show>
);
