import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  EditButton,
  ShowButton,
  DeleteButton,
  CreateButton,
  TopToolbar,
  FilterButton,
  SelectInput,
  TextInput,
  DateInput,
  BooleanInput,
  useRecordContext,
  ChipField,
  FunctionField
} from 'react-admin';
import { Chip, Box } from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  LocalOffer as OfferIcon
} from '@mui/icons-material';

const NotificationFilters = [
  <TextInput source="title" label="Title" alwaysOn />,
  <SelectInput
    source="notification_type"
    label="Type"
    choices={[
      { id: 'Maintenance', name: 'Maintenance' },
      { id: 'Special Offer', name: 'Special Offer' },
      { id: 'Information', name: 'Information' },
    ]}
  />,
  <BooleanInput source="is_sent" label="Sent" />,
  <DateInput source="created_at" label="Created After" />,
];

const NotificationTypeField = () => {
  const record = useRecordContext();
  if (!record) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return '#ff9800';
      case 'Special Offer':
        return '#4caf50';
      case 'Information':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return <BuildIcon fontSize="small" />;
      case 'Special Offer':
        return <OfferIcon fontSize="small" />;
      case 'Information':
        return <InfoIcon fontSize="small" />;
      default:
        return <NotificationsIcon fontSize="small" />;
    }
  };

  return (
    <Chip
      icon={getTypeIcon(record.notification_type)}
      label={record.notification_type}
      size="small"
      style={{
        backgroundColor: getTypeColor(record.notification_type),
        color: 'white',
      }}
    />
  );
};

const TargetUsersField = () => {
  const record = useRecordContext();
  if (!record) return null;

  if (!record.target_user_ids || record.target_user_ids.length === 0) {
    return <Chip label="All Users" color="primary" size="small" />;
  }

  return (
    <Chip 
      label={`${record.target_user_ids.length} Specific Users`} 
      color="secondary" 
      size="small" 
    />
  );
};

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

export const NotificationList = () => (
  <List
    filters={NotificationFilters}
    actions={<ListActions />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid rowClick="show">
      <TextField source="title" />
      <NotificationTypeField label="Type" />
      <TargetUsersField label="Target" />
      <BooleanField source="send_immediately" label="Immediate" />
      <DateField source="scheduled_send_time" label="Scheduled" showTime />
      <BooleanField source="is_sent" label="Sent" />
      <DateField source="sent_at" label="Sent At" showTime />
      <DateField source="created_at" label="Created" showTime />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
