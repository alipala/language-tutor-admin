import React, { useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  useRecordContext,
  SaveButton,
  Toolbar,
  DeleteButton,
  TopToolbar,
  ListButton,
  ShowButton
} from 'react-admin';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RichTextInput = ({ source, label }: { source: string; label: string }) => {
  const record = useRecordContext();
  const [value, setValue] = useState(record?.[source] || '');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'script', 'indent', 'direction',
    'color', 'background', 'align', 'link', 'image', 'video'
  ];

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={{ minHeight: '300px' }}
      />
      <input
        type="hidden"
        name={source}
        value={value}
      />
    </Box>
  );
};

const JSONEditor = ({ source, label }: { source: string; label: string }) => {
  const record = useRecordContext();
  const [value, setValue] = useState(
    JSON.stringify(record?.[source] || {}, null, 2)
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: '100%',
          minHeight: '400px',
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          resize: 'vertical'
        }}
        placeholder="Enter JSON content structure..."
      />
      <input
        type="hidden"
        name={source}
        value={value}
      />
    </Box>
  );
};

const PageEditActions = () => (
  <TopToolbar>
    <ListButton />
    <ShowButton />
  </TopToolbar>
);

const PageEditToolbar = () => (
  <Toolbar>
    <SaveButton />
    <DeleteButton />
  </Toolbar>
);

export const PagesEdit = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Edit actions={<PageEditActions />}>
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="page edit tabs">
          <Tab label="Basic Info" />
          <Tab label="Content Editor" />
          <Tab label="JSON Editor" />
          <Tab label="SEO & Meta" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <SimpleForm toolbar={<PageEditToolbar />}>
            <TextInput source="title" label="Page Title" fullWidth required />
            <TextInput source="slug" label="URL Slug" fullWidth required />
            <SelectInput
              source="status"
              label="Status"
              choices={[
                { id: 'draft', name: 'Draft' },
                { id: 'published', name: 'Published' },
                { id: 'archived', name: 'Archived' },
              ]}
              defaultValue="draft"
            />
          </SimpleForm>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Rich Text Content Editor
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Use this editor for simple content pages. For complex layouts, use the JSON editor.
            </Typography>
            <RichTextInput source="rich_content" label="Page Content" />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              JSON Structure Editor
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Edit the complete page structure as JSON. This allows for complex layouts with sections, components, and data.
            </Typography>
            <JSONEditor source="content" label="Page Content Structure" />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <SimpleForm toolbar={<PageEditToolbar />}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              SEO & Meta Information
            </Typography>
            <TextInput 
              source="meta_title" 
              label="Meta Title" 
              fullWidth 
              helperText="Recommended: 50-60 characters"
            />
            <TextInput 
              source="meta_description" 
              label="Meta Description" 
              fullWidth 
              multiline 
              rows={3}
              helperText="Recommended: 150-160 characters"
            />
          </SimpleForm>
        </TabPanel>
      </Paper>
    </Edit>
  );
};
