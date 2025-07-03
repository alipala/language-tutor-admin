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
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Collapse,
  Tooltip,
  LinearProgress,
  Backdrop
} from '@mui/material';
import Grid from '@mui/material/Grid';
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
  Schedule,
  Title,
  Message,
  People,
  AccessTime,
  Preview,
  Rocket,
  AutoAwesome,
  Notifications,
  Campaign,
  Warning,
  CheckCircleOutline
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Enhanced Rich Text Editor Component
const ModernRichTextEditor = ({ value, onChange, label }: any) => {
  const [editorValue, setEditorValue] = useState(value || '');
  const [focused, setFocused] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        border: `2px solid ${focused ? theme.palette.primary.main : theme.palette.divider}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: focused ? theme.palette.primary.main : theme.palette.text.secondary,
          boxShadow: focused ? `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}` : 'none'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main
          }}>
            <Message sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {label}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Craft your notification message with rich formatting
            </Typography>
          </Box>
        </Stack>

        <TextField
          multiline
          rows={8}
          fullWidth
          value={editorValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your notification message here... You can use HTML tags like <b>bold</b>, <i>italic</i>, <br> for line breaks"
          variant="outlined"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              '& fieldset': { 
                border: 'none'
              },
              '&:hover fieldset': { 
                border: 'none'
              },
              '&.Mui-focused fieldset': { 
                border: 'none'
              },
            },
            '& .MuiInputBase-input': {
              fontSize: '15px',
              lineHeight: 1.7,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }
          }}
        />
        
        <Box sx={{ mt: 2, p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Info sx={{ fontSize: 16, color: theme.palette.info.main }} />
            <Typography variant="caption" color="textSecondary">
              <strong>Pro tip:</strong> Use HTML tags for formatting: &lt;b&gt;bold&lt;/b&gt;, &lt;i&gt;italic&lt;/i&gt;, &lt;br&gt; for line breaks
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

// Enhanced User Selector Component
const ModernUserSelector = ({ value, onChange }: any) => {
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
    <Card 
      elevation={0}
      sx={{ 
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.text.secondary,
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.main
          }}>
            <People sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              Target Audience
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Choose who will receive this notification
            </Typography>
          </Box>
        </Stack>
        
        <Stack spacing={3}>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={sendToAll}
                  onChange={handleSendToAllToggle}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: theme.palette.success.main,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.success.main,
                    },
                  }}
                />
              }
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Group sx={{ fontSize: 18, color: theme.palette.success.main }} />
                  <Typography sx={{ fontWeight: 500 }}>Send to All Users</Typography>
                </Stack>
              }
            />
          </Box>

          {!sendToAll && (
            <Fade in={!sendToAll}>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => setOpen(true)}
                  startIcon={<PersonAdd />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  Select Specific Users
                </Button>

                {selectedUsers.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
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
                            fontSize: '12px',
                            fontWeight: 500,
                            '& .MuiChip-deleteIcon': {
                              color: theme.palette.primary.main
                            }
                          }}
                        />
                      ))}
                      {selectedUsers.length > 6 && (
                        <Chip
                          label={`+${selectedUsers.length - 6} more`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '12px', fontWeight: 500 }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Fade>
          )}
        </Stack>
      </CardContent>

      {/* Enhanced User Selection Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { 
            minHeight: '70vh',
            borderRadius: 3,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.3)}`
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ 
                bgcolor: theme.palette.primary.main,
                width: 48,
                height: 48
              }}>
                <People />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Select Recipients
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Choose specific users to receive this notification
                </Typography>
              </Box>
            </Stack>
            <IconButton 
              onClick={() => setOpen(false)} 
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.2)
                }
              }}
            >
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
                size="medium"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.8)
                  }
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
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2
                  }}
                >
                  {selectedUsers.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                </Button>
              </Stack>
            </Stack>
          </Box>
          
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length}
                      checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      sx={{
                        color: theme.palette.primary.main,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Joined</TableCell>
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
                        <Avatar sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: theme.palette.primary.main,
                          fontSize: '14px',
                          fontWeight: 600
                        }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
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
        
        <DialogActions sx={{ 
          p: 3, 
          borderTop: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`
        }}>
          <Button 
            onClick={() => setOpen(false)} 
            variant="contained"
            startIcon={<CheckCircle />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Done ({selectedUsers.length} selected)
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

// Enhanced Scheduling Component with MUI DateTimePicker
const ModernSchedulingComponent = ({ sendImmediately, onSendImmediatelyChange, scheduledTime, onScheduledTimeChange }: any) => {
  const theme = useTheme();

  return (
    <Card 
      elevation={0}
      sx={{ 
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.text.secondary,
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${alpha(theme.palette.warning.main, 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.warning.main, 0.1),
            color: theme.palette.warning.main
          }}>
            <AccessTime sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              Delivery Schedule
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Choose when to send your notification
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={sendImmediately}
                onChange={(e) => onSendImmediatelyChange(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: theme.palette.warning.main,
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: theme.palette.warning.main,
                  },
                }}
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rocket sx={{ fontSize: 18, color: theme.palette.warning.main }} />
                <Typography sx={{ fontWeight: 500 }}>Send Immediately</Typography>
              </Stack>
            }
          />

          <Collapse in={!sendImmediately}>
            <Box sx={{ 
              p: 3, 
              bgcolor: alpha(theme.palette.info.main, 0.05), 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
            }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Schedule sx={{ fontSize: 18, color: theme.palette.info.main }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.info.main }}>
                  Schedule for Later
                </Typography>
              </Stack>
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date & Time"
                  value={scheduledTime ? dayjs(scheduledTime) : null}
                  onChange={(newValue: Dayjs | null) => {
                    onScheduledTimeChange(newValue ? newValue.toDate() : null);
                  }}
                  minDateTime={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: theme.palette.background.paper,
                          '& fieldset': {
                            borderColor: alpha(theme.palette.info.main, 0.3)
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.info.main
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.info.main
                          }
                        }
                      }
                    }
                  }}
                />
              </LocalizationProvider>
              
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Notification will be automatically sent at the specified time
              </Typography>
            </Box>
          </Collapse>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Enhanced Confirmation Dialog
const ModernConfirmationDialog = ({ open, onClose, onConfirm, data, isLoading }: any) => {
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
      case 'Maintenance': return <Build sx={{ fontSize: 24 }} />;
      case 'Special Offer': return <LocalOffer sx={{ fontSize: 24 }} />;
      case 'Information': return <Info sx={{ fontSize: 24 }} />;
      default: return <NotificationsActive sx={{ fontSize: 24 }} />;
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
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 3,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.3)}`
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 3, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(getTypeColor(), 0.05)} 100%)`
        }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar sx={{ 
              bgcolor: getTypeColor(),
              width: 56,
              height: 56,
              boxShadow: `0 8px 25px ${alpha(getTypeColor(), 0.3)}`
            }}>
              <Preview sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Ready to Send?
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Review your notification before sending it to users
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Paper 
              elevation={0}
              sx={{ 
                overflow: 'hidden',
                border: `2px solid ${alpha(getTypeColor(), 0.2)}`,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(getTypeColor(), 0.02)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`
              }}
            >
              <Box sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 3, 
                        bgcolor: alpha(getTypeColor(), 0.1),
                        color: getTypeColor()
                      }}>
                        {getTypeIcon()}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          {data.title}
                        </Typography>
                        <Chip 
                          label={data.notification_type}
                          size="medium"
                          sx={{ 
                            bgcolor: alpha(getTypeColor(), 0.15),
                            color: getTypeColor(),
                            fontWeight: 600,
                            fontSize: '12px',
                            borderRadius: 2
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>
                  
                  <Divider sx={{ borderColor: alpha(getTypeColor(), 0.1) }} />
                  
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: alpha(theme.palette.success.main, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                      }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                          <People sx={{ fontSize: 16, color: theme.palette.success.main }} />
                          <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                            Recipients
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {getUserCount()}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: alpha(theme.palette.warning.main, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                      }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                          <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                            Delivery
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {getScheduleText()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </Paper>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 4, 
          borderTop: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(getTypeColor(), 0.02)} 100%)`
        }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            disabled={isLoading}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              borderColor: theme.palette.divider
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            variant="contained" 
            startIcon={isLoading ? <AutoAwesome className="animate-spin" /> : <Send />}
            disabled={isLoading}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              bgcolor: getTypeColor(),
              '&:hover': {
                bgcolor: getTypeColor(),
                filter: 'brightness(0.9)'
              }
            }}
          >
            {isLoading ? 'Sending...' : 'Send Notification'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(4px)'
        }}
        open={isLoading}
      >
        <Stack alignItems="center" spacing={2}>
          <AutoAwesome sx={{ fontSize: 48, animation: 'spin 2s linear infinite' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Sending your notification...
          </Typography>
        </Stack>
      </Backdrop>
    </>
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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      console.log('Sending notification data:', formData);
      await create('notifications', { data: formData });
      notify('🎉 Notification created successfully!', { type: 'success' });
      redirect('/notifications');
    } catch (error) {
      console.error('Error creating notification:', error);
      notify('❌ Error creating notification', { type: 'error' });
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  return (
    <Create title=" ">
      <SimpleForm onSubmit={handleSubmit} toolbar={<></>}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Modern Header */}
          <Box sx={{ mb: 6 }}>
            <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
              <Avatar sx={{ 
                bgcolor: theme.palette.primary.main,
                width: 64,
                height: 64,
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`
              }}>
                <Campaign sx={{ fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}>
                  Create Push Notification
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400 }}>
                  Engage your users with personalized notifications and smart scheduling
                </Typography>
              </Box>
            </Stack>
            
            <Box sx={{ 
              height: 4, 
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.success.main} 100%)`,
              borderRadius: 2,
              mb: 2
            }} />
          </Box>

          <Grid container spacing={4}>
            {/* Left Column - Form Fields */}
            <Grid item xs={12} lg={6}>
              <Stack spacing={4}>
                {/* Title & Type Card */}
                <Card 
                  elevation={0}
                  sx={{ 
                    border: `2px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.text.secondary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main
                      }}>
                        <Title sx={{ fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          Notification Details
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Set the title and type for your notification
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack spacing={3}>
                      <Box>
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
                          placeholder="Enter a compelling notification title..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: theme.palette.divider
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
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
                            { id: 'Information', name: '📢 Information' },
                            { id: 'Special Offer', name: '🎉 Special Offer' },
                            { id: 'Maintenance', name: '🔧 Maintenance' }
                          ]}
                          validate={required()}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: theme.palette.divider
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main
                              }
                            }
                          }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Recipients */}
                <ModernUserSelector
                  value={targetUsers}
                  onChange={setTargetUsers}
                />

                {/* Scheduling */}
                <ModernSchedulingComponent
                  sendImmediately={sendImmediately}
                  onSendImmediatelyChange={setSendImmediately}
                  scheduledTime={scheduledTime}
                  onScheduledTimeChange={setScheduledTime}
                />
              </Stack>
            </Grid>

            {/* Right Column - Message Content */}
            <Grid item xs={12} lg={6}>
              <ModernRichTextEditor
                value={content}
                onChange={setContent}
                label="Message Content"
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ mt: 6, display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => redirect('/notifications')}
              size="large"
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderColor: theme.palette.text.primary,
                  color: theme.palette.text.primary
                }
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Rocket />}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                px: 6,
                py: 1.5,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`
                }
              }}
            >
              Create Notification
            </Button>
          </Box>
        </Container>
      </SimpleForm>

      <ModernConfirmationDialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        data={formData}
        isLoading={isLoading}
      />
    </Create>
  );
};
