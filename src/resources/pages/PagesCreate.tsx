import React, { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  SaveButton,
  Toolbar,
  TopToolbar,
  ListButton
} from 'react-admin';
import { Box, Typography, Paper, Tabs, Tab, Button } from '@mui/material';
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

const PageCreateActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const PageCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const TemplateSelector = ({ onSelectTemplate }: { onSelectTemplate: (template: string) => void }) => {
  const templates = [
    { id: 'about', name: 'About Us Page', description: 'Company information, team, values' },
    { id: 'careers', name: 'Careers Page', description: 'Job listings, benefits, company culture' },
    { id: 'press', name: 'Press Kit', description: 'Media resources, press releases' },
    { id: 'privacy', name: 'Privacy Policy', description: 'Legal privacy policy document' },
    { id: 'terms', name: 'Terms of Service', description: 'Legal terms and conditions' },
    { id: 'custom', name: 'Custom Page', description: 'Start with a blank page' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Choose a Template
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Select a pre-built template to get started quickly, or create a custom page from scratch.
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
        {templates.map((template) => (
          <Paper
            key={template.id}
            sx={{
              p: 2,
              cursor: 'pointer',
              border: '1px solid #e0e0e0',
              '&:hover': {
                borderColor: '#1976d2',
                boxShadow: 1
              }
            }}
            onClick={() => onSelectTemplate(template.id)}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {template.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {template.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export const PagesCreate = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template);
    setTabValue(1); // Move to basic info tab
  };

  if (!selectedTemplate) {
    return (
      <Create actions={<PageCreateActions />}>
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      </Create>
    );
  }

  return (
    <Create actions={<PageCreateActions />}>
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="page create tabs">
          <Tab label="Basic Info" />
          <Tab label="Content" />
          <Tab label="SEO & Meta" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <SimpleForm toolbar={<PageCreateToolbar />}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Page Information
            </Typography>
            <TextInput source="title" label="Page Title" fullWidth required />
            <TextInput 
              source="slug" 
              label="URL Slug" 
              fullWidth 
              required 
              helperText="This will be the URL path (e.g., 'about-us' becomes /about-us)"
            />
            <SelectInput
              source="status"
              label="Status"
              choices={[
                { id: 'draft', name: 'Draft' },
                { id: 'published', name: 'Published' },
              ]}
              defaultValue="draft"
            />
            <input type="hidden" name="template" value={selectedTemplate} />
          </SimpleForm>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Page Content
            </Typography>
            {selectedTemplate === 'custom' ? (
              <Box>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                  Create your custom page content using the rich text editor or JSON structure.
                </Typography>
                <ReactQuill
                  theme="snow"
                  placeholder="Start writing your page content..."
                  style={{ minHeight: '300px' }}
                />
              </Box>
            ) : (
              <Box>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                  This page will be created using the {selectedTemplate} template. 
                  You can customize the content after creation.
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="body2">
                    Template: <strong>{selectedTemplate}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    The page will be pre-populated with appropriate sections and content structure.
                    You can edit all content after the page is created.
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <SimpleForm toolbar={<PageCreateToolbar />}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              SEO & Meta Information
            </Typography>
            <TextInput 
              source="meta_title" 
              label="Meta Title" 
              fullWidth 
              helperText="Recommended: 50-60 characters. Leave blank to auto-generate from page title."
            />
            <TextInput 
              source="meta_description" 
              label="Meta Description" 
              fullWidth 
              multiline 
              rows={3}
              helperText="Recommended: 150-160 characters. Leave blank to auto-generate."
            />
          </SimpleForm>
        </TabPanel>
      </Paper>
    </Create>
  );
};
