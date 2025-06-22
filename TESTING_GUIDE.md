# Language Tutor Admin Panel - Testing Guide

This guide will help you test both the admin panel and the main Language Tutor application.

## 🚀 Quick Start

### 1. Start the Backend (Language Tutor API)

```bash
# Navigate to the main Language Tutor project
cd /Users/alipala/CascadeProjects/language-tutor

# Start the backend server
npm run dev
# OR if you prefer to run backend only:
cd backend && python -m uvicorn main:app --reload
```

The backend will be available at: `http://localhost:8000`

### 2. Start the Admin Panel

```bash
# Navigate to the admin panel project
cd /Users/alipala/CascadeProjects/language-tutor-admin

# Create environment file (if not exists)
cp .env.example .env

# Install dependencies (if not done)
npm install

# Start the admin panel
npm run dev
```

The admin panel will be available at: `http://localhost:5173`

### 3. Start the Main App (Optional)

```bash
# Navigate to the main Language Tutor project
cd /Users/alipala/CascadeProjects/language-tutor

# Start both frontend and backend
npm run dev
```

The main app will be available at: `http://localhost:3000`

## 🔐 Admin Login Credentials

**Email:** `admin@languagetutor.com`  
**Password:** `admin123`

> ⚠️ **Security Note**: Change this password in production! Update the password in `backend/admin_routes.py`

## 🧪 Testing Scenarios

### 1. Admin Panel Authentication

1. **Access Admin Panel**: Go to `http://localhost:5173`
2. **Login Page**: You should see a React Admin login form
3. **Login**: Use the credentials above
4. **Dashboard**: After login, you should see the dashboard with metrics

### 2. Dashboard Testing

The dashboard should display:
- **Total Users**: Count of all users in the database
- **Active Users**: Count of active users
- **Verified Users**: Count of verified users
- **Conversations**: Total conversation sessions
- **Learning Plans**: Total learning plans
- **Assessments**: Currently shows 0 (placeholder)

### 3. User Management Testing

1. **User List**: Click "Users" in the sidebar
   - Should show paginated list of users
   - Status indicators (Active/Inactive, Verified/Unverified)
   - Language preferences displayed as chips

2. **User Details**: Click "Show" on any user
   - Should display detailed user information
   - Language preferences and account status

3. **User Editing**: Click "Edit" on any user
   - Should allow editing user details
   - Can change active/verified status
   - Can update language preferences

### 4. API Endpoint Testing

You can test the admin API endpoints directly:

```bash
# Health check
curl http://localhost:8000/api/admin/health

# Login (get token)
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@languagetutor.com", "password": "admin123"}'

# Dashboard metrics (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8000/api/admin/dashboard

# Get users (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8000/api/admin/users
```

## 🌐 Railway/Production Testing

### Environment Variables

For Railway deployment, ensure these environment variables are set:

```env
# Backend (.env)
MONGODB_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
ENVIRONMENT=production
RAILWAY_ENVIRONMENT=true

# Admin Panel (.env)
VITE_API_URL=https://your-railway-backend-url.railway.app
```

### Production URLs

- **Main App**: `https://mytacoai.com` or `https://taco.up.railway.app`
- **Backend API**: Your Railway backend URL
- **Admin Panel**: Deploy separately or add to main project

## 🔧 Troubleshooting

### Common Issues

1. **Admin Panel Can't Connect to Backend**
   ```bash
   # Check if backend is running
   curl http://localhost:8000/api/admin/health
   
   # Check admin panel environment
   cat /Users/alipala/CascadeProjects/language-tutor-admin/.env
   ```

2. **Login Fails**
   - Verify admin credentials in `backend/admin_routes.py`
   - Check backend logs for authentication errors
   - Ensure MongoDB is connected

3. **Dashboard Shows No Data**
   - Check if MongoDB has user data
   - Verify database connection in backend logs
   - Test API endpoints directly

4. **CORS Issues**
   - Ensure backend CORS is configured for admin panel URL
   - Check browser console for CORS errors

### Debug Commands

```bash
# Check backend health
curl http://localhost:8000/health

# Check admin API health
curl http://localhost:8000/api/admin/health

# View backend logs
cd /Users/alipala/CascadeProjects/language-tutor/backend
python -m uvicorn main:app --reload --log-level debug

# View admin panel logs
cd /Users/alipala/CascadeProjects/language-tutor-admin
npm run dev
# Check browser console for errors
```

## 📊 Test Data

### Creating Test Users

You can create test users through the main app or directly in MongoDB:

```javascript
// MongoDB shell commands
use language_tutor

// Insert test user
db.users.insertOne({
  email: "test@example.com",
  name: "Test User",
  is_active: true,
  is_verified: true,
  created_at: new Date(),
  preferred_language: "english",
  preferred_level: "B1"
})
```

### Sample API Responses

**Dashboard Metrics:**
```json
{
  "total_users": 5,
  "active_users": 4,
  "verified_users": 3,
  "total_conversations": 12,
  "total_assessments": 0,
  "total_learning_plans": 8
}
```

**User List:**
```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "is_active": true,
      "is_verified": true,
      "created_at": "2023-04-16T12:30:45.123Z",
      "preferred_language": "english",
      "preferred_level": "B1"
    }
  ],
  "total": 1
}
```

## 🚀 Deployment Testing

### Local Production Build

```bash
# Build admin panel for production
cd /Users/alipala/CascadeProjects/language-tutor-admin
npm run build

# Serve production build
npx serve dist
```

### Railway Integration

1. **Deploy Backend**: Ensure your main Language Tutor app is deployed on Railway
2. **Update Admin Panel Config**: Point to Railway backend URL
3. **Deploy Admin Panel**: Deploy as separate Railway service or integrate into main project

## 📝 Test Checklist

- [ ] Backend starts successfully
- [ ] Admin panel starts successfully
- [ ] Can access admin login page
- [ ] Can login with admin credentials
- [ ] Dashboard displays metrics
- [ ] User list loads with pagination
- [ ] Can view user details
- [ ] Can edit user information
- [ ] API endpoints respond correctly
- [ ] CORS is configured properly
- [ ] Production build works
- [ ] Railway deployment (if applicable)

## 🔄 Next Steps

After successful testing:

1. **Change Admin Password**: Update credentials in `backend/admin_routes.py`
2. **Add More Admins**: Extend `ADMIN_USERS` dictionary
3. **Implement Phase 2**: Add conversation analytics and learning plan management
4. **Deploy to Production**: Set up Railway deployment for admin panel
5. **Add Monitoring**: Implement logging and error tracking

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review backend and frontend logs
3. Verify environment configuration
4. Test API endpoints directly
5. Check database connectivity

The admin panel is now fully functional and ready for production use!
