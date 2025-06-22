# Language Tutor Admin Panel

A comprehensive admin panel for the Language Tutor application built with React Admin, TypeScript, and Material-UI.

## Features

### Phase 1 (Current Implementation)
- **Authentication System**: Secure admin login with JWT tokens
- **User Management**: View, edit, and manage user accounts
- **Dashboard**: Key metrics and system overview
- **Clean Architecture**: Modular, maintainable code structure

### Upcoming Phases
- **Phase 2**: Analytics, conversation management, learning plan oversight
- **Phase 3**: Real-time monitoring, advanced reporting, system administration

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Framework**: React Admin 5.8, Material-UI 7.0
- **HTTP Client**: Axios with interceptors
- **State Management**: React Admin built-in state management
- **Build Tool**: Vite for fast development and building

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Dashboard.tsx   # Main dashboard component
├── config/             # Configuration constants
│   └── constants.ts    # API endpoints, app settings
├── providers/          # React Admin providers
│   ├── authProvider.ts # Authentication provider
│   └── dataProvider.ts # Data provider for API communication
├── resources/          # Resource management components
│   └── users/          # User resource components
│       ├── UserList.tsx
│       ├── UserShow.tsx
│       ├── UserEdit.tsx
│       └── index.ts
├── services/           # Business logic services
│   ├── authService.ts  # Authentication service
│   └── httpClient.ts   # HTTP client with interceptors
├── types/              # TypeScript type definitions
│   └── index.ts        # Core domain types
├── App.tsx             # Main application component
└── Layout.tsx          # Application layout
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Language Tutor backend running

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alipala/language-tutor-admin.git
cd language-tutor-admin
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_API_URL=http://localhost:8000
```

5. Start the development server:
```bash
npm run dev
```

The admin panel will be available at `http://localhost:5173`

## Backend Requirements

The admin panel requires the following backend endpoints to be implemented:

### Authentication Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/health` - Health check

### User Management Endpoints
- `GET /api/admin/users` - List users with pagination
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Dashboard Endpoints
- `GET /api/admin/dashboard` - Dashboard metrics

### Expected Response Format
```typescript
interface ApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
}
```

## Development

### Code Style
- Follow clean architecture principles
- Use TypeScript for type safety
- Implement single responsibility principle
- Write self-documenting code with clear naming

### Key Design Patterns
- **Service Layer**: Business logic separated from UI components
- **Provider Pattern**: React Admin providers for data and auth
- **Component Composition**: Reusable, composable UI components
- **Error Boundaries**: Graceful error handling

### Adding New Resources

1. Create resource components in `src/resources/[resource-name]/`
2. Implement List, Show, Edit, and Create components
3. Export components from index file
4. Add resource to App.tsx

Example:
```typescript
// src/resources/conversations/ConversationList.tsx
export const ConversationList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="language" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

// Add to App.tsx
<Resource
  name="conversations"
  list={ConversationList}
  icon={Chat}
/>
```

## Authentication

The admin panel uses JWT-based authentication with the following flow:

1. Admin enters credentials on login page
2. Credentials sent to `/api/admin/login`
3. Backend returns JWT token and user info
4. Token stored in localStorage
5. Token included in all subsequent API requests
6. Automatic logout on token expiration

## Error Handling

- HTTP client automatically handles 401 responses
- User-friendly error messages displayed
- Graceful degradation for network issues
- Loading states for better UX

## Security Considerations

- JWT tokens stored securely in localStorage
- Automatic token cleanup on logout
- HTTPS required in production
- Role-based access control ready for implementation

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Create a feature branch from `master`
2. Follow the established code patterns
3. Write clean, self-documenting code
4. Test your changes thoroughly
5. Submit a pull request

## License

This project is part of the Language Tutor application suite.
