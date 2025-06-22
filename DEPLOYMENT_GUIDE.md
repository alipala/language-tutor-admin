# Language Tutor Admin Panel - Deployment Guide

## 🚀 **Deployment Options for Railway**

### **Option 1: Subdomain Deployment (Recommended)**

Deploy the admin panel as a separate Railway service with its own subdomain.

#### **Steps:**

1. **Create New Railway Project**
   ```bash
   # In the language-tutor-admin directory
   railway login
   railway init
   railway link
   ```

2. **Set Environment Variables**
   ```bash
   railway variables set VITE_API_BASE_URL=https://your-main-app.railway.app
   railway variables set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   railway up
   ```

4. **Custom Domain Setup**
   - Go to Railway dashboard
   - Add custom domain: `admin.yourdomain.com`
   - Update DNS records as instructed

### **Option 2: Path-Based Deployment**

Integrate admin panel into main app with path routing.

#### **Steps:**

1. **Build Admin Panel**
   ```bash
   cd /Users/alipala/CascadeProjects/language-tutor-admin
   npm run build
   ```

2. **Copy Build to Main App**
   ```bash
   cp -r dist/* /Users/alipala/CascadeProjects/language-tutor/frontend/public/admin/
   ```

3. **Update Main App Routing**
   - Add admin routes in main app
   - Configure reverse proxy for `/admin` path

## 🔧 **Configuration**

### **Environment Variables**

#### **Admin Panel (.env)**
```env
VITE_API_BASE_URL=https://your-backend.railway.app
VITE_APP_TITLE=Language Tutor Admin
NODE_ENV=production
```

#### **Backend (Railway Variables)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGINS=https://admin.yourdomain.com,https://yourdomain.com
```

## 🔐 **Security Configuration**

### **Admin Authentication**
- Default admin credentials in `backend/admin_routes.py`
- **IMPORTANT**: Change default password before deployment!

```python
ADMIN_USERS = {
    "admin@yourdomain.com": {
        "hashed_password": get_password_hash("YOUR_SECURE_PASSWORD"),
        # ... other config
    }
}
```

### **CORS Configuration**
Update CORS origins in backend to include admin domain:
```python
origins = [
    "https://yourdomain.com",
    "https://admin.yourdomain.com",
    "http://localhost:3000",
    "http://localhost:5173"
]
```

## 📊 **Database Requirements**

The admin panel uses the same MongoDB database as the main app. Ensure these collections exist:
- `users`
- `conversation_sessions`
- `learning_plans`
- `user_stats`
- `badges`
- `assessment_history`

## 🎯 **Features Included**

### **✅ Real-Time Search**
- Search users by name, email, or ID
- Instant results as you type
- MongoDB regex-based search

### **✅ User Management**
- View all users with pagination
- Create new users
- Edit user details
- User statistics and analytics

### **✅ Data Management**
- Conversation sessions
- Learning plans
- Assessment history
- User statistics
- Badge system

### **✅ Professional UI**
- Coral theme (#F75A5A)
- Responsive design
- React Admin framework
- Modern typography (Inter font)

## 🔄 **Deployment Workflow**

### **For Main App Changes:**
```bash
cd /Users/alipala/CascadeProjects/language-tutor
git checkout feature/admin-panel-search
git push origin feature/admin-panel-search
# Create PR and merge to main
# Deploy main branch to Railway
```

### **For Admin Panel Changes:**
```bash
cd /Users/alipala/CascadeProjects/language-tutor-admin
git checkout feature/admin-panel-phase1
git push origin feature/admin-panel-phase1
# Create PR and merge to main
# Deploy admin panel to Railway
```

## 🌐 **Domain Configuration**

### **Recommended Setup:**
- Main App: `https://yourdomain.com`
- Admin Panel: `https://admin.yourdomain.com`
- API Backend: `https://api.yourdomain.com` (or same as main app)

### **DNS Records:**
```
A     yourdomain.com          → Railway IP
CNAME admin.yourdomain.com    → your-admin-app.railway.app
CNAME api.yourdomain.com      → your-backend-app.railway.app
```

## 🔍 **Testing Deployment**

### **Local Testing:**
```bash
# Terminal 1: Start backend
cd /Users/alipala/CascadeProjects/language-tutor/backend
python main.py

# Terminal 2: Start admin panel
cd /Users/alipala/CascadeProjects/language-tutor-admin
npm run dev
```

### **Production Testing:**
1. Test admin login: `admin@languagetutor.com` / `admin123`
2. Test real-time search functionality
3. Test user management operations
4. Verify API connectivity

## 📝 **Post-Deployment Checklist**

- [ ] Change default admin password
- [ ] Configure custom domains
- [ ] Test all admin functionality
- [ ] Verify search performance
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Set up backup procedures

## 🚨 **Important Notes**

1. **Security**: Always use HTTPS in production
2. **Database**: Ensure MongoDB connection is secure
3. **Monitoring**: Set up logging and monitoring
4. **Backup**: Regular database backups
5. **Updates**: Keep dependencies updated

## 📞 **Support**

For deployment issues:
1. Check Railway logs
2. Verify environment variables
3. Test API connectivity
4. Check CORS configuration
5. Validate MongoDB connection

---

**The admin panel is now ready for production deployment with full real-time search functionality!**
