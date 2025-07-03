import React, { useState, useEffect } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useNotify,
  useRedirect,
  useCreate,
  useGetList
} from 'react-admin';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  TextField,
  Avatar,
  IconButton,
  useTheme,
  alpha,
  Stack,
  Switch,
  FormControlLabel,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  NotificationsActive,
  Person,
  Send,
  Close,
  Search,
  PersonAdd,
  CheckCircle,
  RadioButtonUnchecked,
  Edit,
  Visibility,
  CalendarToday,
  Add,
  Info,
  LocalOffer,
  Build,
  ExpandMore,
  Group,
  Schedule
} from '@mui/icons-material';

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, label }: any) => {
  const [editorValue, setEditorValue] = useState(value || '');
  const theme = useTheme();

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ 
        fontWeight: 600, 
        color: theme.palette.text.primary,
        mb: 1
      }}>
        {label} *
      </Typography>
      <TextField
        multiline
        rows={8}
        fullWidth
        value={editorValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your notification message here..."
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { 
              borderColor: theme.palette.divider
            },
            '&:hover fieldset': { 
              borderColor: theme.palette.primary.main
            },
            '&.Mui-focused fieldset': { 
              borderColor: theme.palette.primary.main
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '14px',
            lineHeight: 1.6
          }
        }}
      />
      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
        You can use basic HTML tags like &lt;b&gt;, &lt;i&gt;, &lt;br&gt; for formatting
      </Typography>
    </Box>
  );
};

// User Selector Component
const UserSelector = ({ value, onChange }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(value || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sendToAll, setSendToAll] = useState((!value || value.length === 0));
  const theme = useTheme();
  
  const { data: users, isLoading } = useGetList('users', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'name', order: 'ASC' },
    filter: {}
  });

  const filteredUsers = users?.filter((user: any) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleUserToggle = (userId: string) => {
    const newSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];
    
    setSelectedUsers(newSelection);
    setSendToAll(false);
    onChange(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
      setSendToAll(true);
      onChange([]);
    } else {
      const allUserIds = filteredUsers.map((user: any) => user.id);
      setSelectedUsers(allUserIds);
      setSendToAll(false);
      onChange(allUserIds);
    }
  };

  const handleSendToAllToggle = () => {
    if (sendToAll) {
      setSendToAll(false);
    } else {
      setSendToAll(true);
      setSelectedUsers([]);
      onChange([]);
    }
  };

  const getSelectedUserNames = () => {
    return selectedUsers.map(userId => {
      const user = users?.find((u: any) => u.id === userId);
      return user?.name || 'Unknown User';
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ 
        fontWeight: 600, 
        color: theme.palette.text.primary,
        mb: 1
      }}>
        Recipients *
      </Typography>
      
      <FormControl fullWidth>
        <Select
          value={sendToAll ? 'all' : 'specific'}
          onChange={(e) => {
            if (e.target.value === 'all') {
              setSendToAll(true);
              setSelectedUsers([]);
              onChange([]);
            } else {
              setSendToAll(false);
              setOpen(true);
            }
          }}
          displayEmpty
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { 
                borderColor: theme.palette.divider
              },
              '&:hover fieldset': { 
                borderColor: theme.palette.primary.main
              },
              '&.Mui-focused fieldset': { 
                borderColor: theme.palette.primary.main
              },
            }
          }}
        >
          <MenuItem value="all">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Group sx={{ fontSize: 20, color: theme.palette.primary.main }} />
              <Typography sx={{ fontWeight: 500 }}>Send to All Users</Typography>
            </Stack>
          </MenuItem>
          <MenuItem value="specific">
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonAdd sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
              <Typography>Select Specific Users</Typography>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>

      {selectedUsers.length > 0 && !sendToAll && (
        <Fade in={selectedUsers.length > 0}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected:
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getSelectedUserNames().slice(0, 6).map((name, index) => (
                <Chip
                  key={index}
                  label={name}
                  size="small"
                  onDelete={() => handleUserToggle(selectedUsers[index])}
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontSize: '12px'
                  }}
                />
              ))}
              {selectedUsers.length > 6 && (
                <Chip
                  label={`+${selectedUsers.length - 6} more`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '12px' }}
                />
              )}
            </Box>
          </Box>
        </Fade>
      )}

      {/* User Selection Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { minHeight: '70vh' }
        }}
      >
        <DialogTitle sx={{ pb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Select Recipients
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Choose specific users to receive this notification
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} size="small">
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Stack spacing={2}>
              <TextField
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  )
                }}
              />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2" color="textSecondary">
                  {selectedUsers.length} of {filteredUsers.length} users selected
                </Typography>
                <Button
                  onClick={handleSelectAll}
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  {selectedUsers.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                </Button>
              </Stack>
            </Stack>
          </Box>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length}
                      checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Joined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user: any) => (
                  <TableRow 
                    key={user.id}
                    hover
                    sx={{ 
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.04)
                      }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserToggle(user.id)}
                        size="small"
                        sx={{ 
                          color: theme.palette.primary.main,
                          '&.Mui-checked': {
                            color: theme.palette.primary.main,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                          <Person sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.name || 'Unnamed User'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            onClick={() => setOpen(false)} 
            variant="contained"
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              px: 3
            }}
          >
            Done ({selectedUsers.length} selected)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Scheduling Component
const SchedulingComponent = ({ sendImmediately, onSendImmediatelyChange, scheduledTime, onScheduledTimeChange }: any) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ 
        fontWeight: 600, 
        color: theme.palette.text.primary,
        mb: 2
      }}>
        Delivery Schedule
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={sendImmediately}
            onChange={(e) => onSendImmediatelyChange(e.target.checked)}
            color="primary"
          />
        }
        label="Send Immediately"
        sx={{ mb: 2 }}
      />

      {!sendImmediately && (
        <Fade in={!sendImmediately}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Schedule for later:
            </Typography>
            <TextField
              type="datetime-local"
              fullWidth
              size="medium"
              variant="outlined"
              value={scheduledTime ? new Date(scheduledTime.getTime() - scheduledTime.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
              onChange={(e) => onScheduledTimeChange(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Schedule sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: theme.palette.divider
                  },
                  '&:hover fieldset': { 
                    borderColor: theme.palette.primary.main
                  },
                  '&.Mui-focused fieldset': { 
                    borderColor: theme.palette.primary.main
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '14px',
                  fontWeight: 500
                }
              }}
            />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

// Confirmation Dialog
const ConfirmationDialog = ({ open, onClose, onConfirm, data }: any) => {
  const theme = useTheme();

  const getUserCount = () => {
    if (!data.target_user_ids || data.target_user_ids.length === 0) {
      return 'All users';
    }
    return `${data.target_user_ids.length} selected user${data.target_user_ids.length > 1 ? 's' : ''}`;
  };

  const getScheduleText = () => {
    if (data.send_immediately) {
      return 'Immediately';
    }
    return new Date(data.scheduled_send_time).toLocaleString();
  };

  const getTypeIcon = () => {
    switch (data.notification_type) {
      case 'Maintenance': return <Build sx={{ fontSize: 20 }} />;
      case 'Special Offer': return <LocalOffer sx={{ fontSize: 20 }} />;
      case 'Information': return <Info sx={{ fontSize: 20 }} />;
      default: return <NotificationsActive sx={{ fontSize: 20 }} />;
    }
  };

  const getTypeColor = () => {
    switch (data.notification_type) {
      case 'Maintenance': return theme.palette.warning.main;
      case 'Special Offer': return theme.palette.success.main;
      case 'Information': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle sx={{ pb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
            <Send />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Confirm Notification
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Review your notification before sending
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: '8px', 
                      bgcolor: alpha(getTypeColor(), 0.1),
                      color: getTypeColor()
                    }}>
                      {getTypeIcon()}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {data.title}
                      </Typography>
                      <Chip 
                        label={data.notification_type}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(getTypeColor(), 0.1),
                          color: getTypeColor(),
                          fontWeight: 500,
                          fontSize: '11px'
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
                
                <Divider />
                
                <Box sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.grey[50],
                  border: `1px solid ${theme.palette.divider}`
                }}>
                  <Typography variant="body2">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </Typography>
                </Box>
                
                <Stack direction="row" spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                      Recipients
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {getUserCount()}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                      Delivery
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {getScheduleText()}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            px: 3
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          startIcon={<Send />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            px: 3
          }}
        >
          Send Notification
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main Component
export const NotificationCreate = () => {
  const [content, setContent] = useState('');
  const [targetUsers, setTargetUsers] = useState<string[]>([]);
  const [sendImmediately, setSendImmediately] = useState(true);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();
  const theme = useTheme();

  const handleSubmit = (data: any) => {
    const submissionData = {
      ...data,
      content,
      target_user_ids: targetUsers.length > 0 ? targetUsers : null,
      send_immediately: sendImmediately,
      scheduled_send_time: !sendImmediately && scheduledTime ? scheduledTime.toISOString() : null,
    };
    setFormData(submissionData);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      console.log('Sending notification data:', formData);
      await create('notifications', { data: formData });
      notify('Notification created successfully!', { type: 'success' });
      redirect('/notifications');
    } catch (error) {
      console.error('Error creating notification:', error);
      notify('Error creating notification', { type: 'error' });
    }
    setShowConfirmation(false);
  };

  return (
    <Create title=" ">
      <SimpleForm onSubmit={handleSubmit} toolbar={<></>}>
        <Card sx={{ width: '100%', maxWidth: 'none' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Create Push Notification
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Send notifications to your users with customizable content and scheduling
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Left Column */}
              <Box sx={{ flex: 1 }}>
                {/* Title */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    mb: 1
                  }}>
                    Title *
                  </Typography>
                  <TextInput
                    source="title"
                    label=""
                    validate={required()}
                    fullWidth
                    placeholder="Enter notification title"
                  />
                </Box>

                {/* Notification Type */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    mb: 1
                  }}>
                    Notification Type *
                  </Typography>
                  <SelectInput
                    source="notification_type"
                    choices={[
                      { id: 'Information', name: 'Information' },
                      { id: 'Special Offer', name: 'Special Offer' },
                      { id: 'Maintenance', name: 'Maintenance' }
                    ]}
                    validate={required()}
                    fullWidth
                  />
                </Box>

                {/* Recipients */}
                <UserSelector
                  value={targetUsers}
                  onChange={setTargetUsers}
                />

                {/* Scheduling */}
                <SchedulingComponent
                  sendImmediately={sendImmediately}
                  onSendImmediatelyChange={setSendImmediately}
                  scheduledTime={scheduledTime}
                  onScheduledTimeChange={setScheduledTime}
                />
              </Box>

              {/* Right Column */}
              <Box sx={{ flex: 1 }}>
                {/* Message Content */}
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  label="Message Content"
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => redirect('/notifications')}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 4
                }}
              >
                Create Notification
              </Button>
            </Box>
          </CardContent>
        </Card>
      </SimpleForm>

      <ConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        data={formData}
      />
    </Create>
  );
};
