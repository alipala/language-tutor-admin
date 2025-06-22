import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  useRecordContext,
  CreateButton,
  TopToolbar,
  FilterButton,
  SelectInput,
  TextInput
} from 'react-admin';
import { Chip, Box } from '@mui/material';

const StatusChip = () => {
  const record = useRecordContext();
  const status = record?.status || 'published';
  
  const getColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };
  
  return (
    <Chip 
      label={status.charAt(0).toUpperCase() + status.slice(1)} 
      size="small" 
      color={getColor(status)}
      variant={status === 'published' ? 'filled' : 'outlined'}
    />
  );
};

const ContentPreview = () => {
  const record = useRecordContext();
  const preview = record?.content_preview || '';
  
  return (
    <Box sx={{ maxWidth: 300 }}>
      <span style={{ fontSize: '0.9rem', color: '#666' }}>
        {preview}
      </span>
    </Box>
  );
};

const PageListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const pageFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <SelectInput 
    source="status" 
    label="Status" 
    choices={[
      { id: 'published', name: 'Published' },
      { id: 'draft', name: 'Draft' },
      { id: 'archived', name: 'Archived' },
    ]} 
  />,
];

export const PagesList = () => (
  <List
    title="Content Management"
    perPage={25}
    sort={{ field: 'last_modified', order: 'DESC' }}
    actions={<PageListActions />}
    filters={pageFilters}
  >
    <Datagrid rowClick="edit">
      <TextField source="title" label="Page Title" />
      <TextField source="slug" label="URL Slug" />
      <FunctionField 
        label="Status" 
        render={() => <StatusChip />}
      />
      <FunctionField 
        label="Content Preview" 
        render={() => <ContentPreview />}
      />
      <TextField source="modified_by" label="Last Modified By" />
      <DateField source="last_modified" label="Last Modified" showTime />
    </Datagrid>
  </List>
);
