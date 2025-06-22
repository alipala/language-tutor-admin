import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  TopToolbar,
  ListButton,
  ShowButton,
} from 'react-admin';

// Language options for the select input
const languageChoices = [
  { id: 'english', name: 'English' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'german', name: 'German' },
  { id: 'italian', name: 'Italian' },
  { id: 'portuguese', name: 'Portuguese' },
  { id: 'dutch', name: 'Dutch' },
  { id: 'russian', name: 'Russian' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'korean', name: 'Korean' },
];

// CEFR level options
const levelChoices = [
  { id: 'A1', name: 'A1 - Beginner' },
  { id: 'A2', name: 'A2 - Elementary' },
  { id: 'B1', name: 'B1 - Intermediate' },
  { id: 'B2', name: 'B2 - Upper Intermediate' },
  { id: 'C1', name: 'C1 - Advanced' },
  { id: 'C2', name: 'C2 - Proficient' },
];

// Edit actions toolbar
const UserEditActions = () => (
  <TopToolbar>
    <ListButton />
    <ShowButton />
  </TopToolbar>
);

// Main User edit component
export const UserEdit = () => (
  <Edit actions={<UserEditActions />}>
    <SimpleForm>
      <TextInput source="name" label="Full Name" required />
      <TextInput source="email" label="Email Address" type="email" disabled />
      <BooleanInput source="is_active" label="Active" />
      <BooleanInput source="is_verified" label="Verified" />
      <SelectInput
        source="preferred_language"
        label="Preferred Language"
        choices={languageChoices}
        emptyText="No language selected"
      />
      <SelectInput
        source="preferred_level"
        label="Preferred Level"
        choices={levelChoices}
        emptyText="No level selected"
      />
    </SimpleForm>
  </Edit>
);
