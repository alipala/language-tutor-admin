import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, BooleanField } from 'react-admin';
import { Box, Typography } from '@mui/material';

// SIMPLE TEST VERSION - Main Users list component
export const UserList = () => {
  console.log('🎨 MODERN UserList component loaded!');
  
  // Add a visible indicator that this component is being used
  React.useEffect(() => {
    document.title = 'Modern Users - Language Tutor Admin';
    console.log('🚀 MODERN CARD LAYOUT ACTIVE!');
    // Add an alert to make it super obvious
    alert('🎉 MODERN UserList component is now active!');
  }, []);
  
  return (
    <Box sx={{ p: 4, backgroundColor: '#ff0000', color: 'white', textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        🎉 MODERN USERLIST IS WORKING! 🎉
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        This red box proves our custom component is loading!
      </Typography>
      
      <Box sx={{ backgroundColor: 'white', borderRadius: 2, p: 2 }}>
        <List>
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <BooleanField source="is_active" />
            <BooleanField source="is_verified" />
            <DateField source="created_at" />
          </Datagrid>
        </List>
      </Box>
    </Box>
  );
};
