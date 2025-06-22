# 🚀 Railway Deployment Steps for Language Tutor Admin Panel

## ✅ **Step 1: Railway Service Setup (DONE)**
You've already created the Railway service! ✅

## 🔧 **Step 2: Set Environment Variables in Railway**

In your Railway dashboard, go to your admin panel service and set these variables:

### **Required Environment Variables:**
```env
VITE_API_BASE_URL=https://your-main-backend.railway.app
NODE_ENV=production
```

### **Optional Environment Variables:**
```env
VITE_APP_TITLE=Language Tutor Admin
```

**⚠️ IMPORTANT**: Replace `your-main-backend.railway.app` with your actual main app's Railway URL.

## 📦 **Step 3: Deploy to Railway**

### **Option A: Connect GitHub Repository (Recommended)**
1. In Railway dashboard, go to your admin service
2. Click "Connect Repo"
3. Select your `language-tutor-admin` repository
4. Select branch: `feature/admin-panel-phase1` (or `main` after merging)
5. Railway will automatically deploy

### **Option B: Deploy from Local**
```bash
cd /Users/alipala/CascadeProjects/language-tutor-admin
railway login
railway link [your-service-id]
railway up
```

## 🌐 **Step 4: Domain Configuration**

### **Option A: Subdomain Setup (Recommended)**
1. In Railway dashboard, go to your admin service
2. Click "Settings" → "Domains"
3. Add custom domain: `admin.yourdomain.com`
4. Update your DNS records:
   ```
   CNAME admin.yourdomain.com → your-admin-service.railway.app
   ```

### **Option B: Path-Based Access (/_admin)**
If you want to access via `yourdomain.com/_admin`, you need to:

1. **Build the admin panel:**
   ```bash
   cd /Users/alipala/CascadeProjects/language-tutor-admin
   npm run build
   ```

2. **Copy build to main app:**
   ```bash
   cp -r dist/* /Users/alipala/CascadeProjects/language-tutor/frontend/public/_admin/
   ```

3. **Update main app routing** (in your main app):
   ```javascript
   // Add to your main app's routing
   app.use('/_admin', express.static('frontend/public/_admin'));
   ```

## 🔐 **Step 5: Update Backend CORS Settings**

In your main app's backend, update CORS to allow admin panel access:

```python
# In backend/main.py
origins = [
    "https://yourdomain.com",
    "https://admin.yourdomain.com",  # Add this for subdomain
    "https://your-admin-service.railway.app",  # Add Railway URL
    "http://localhost:3000",
    "http://localhost:5173"
]
```

## 🔑 **Step 6: Security Configuration**

### **Change Default Admin Password:**
In your main app's `backend/admin_routes.py`:
```python
ADMIN_USERS = {
    "admin@yourdomain.com": {  # Change email
        "hashed_password": get_password_hash("YOUR_SECURE_PASSWORD"),  # Change password
        # ... rest of config
    }
}
```

## 🧪 **Step 7: Test Deployment**

1. **Access your admin panel:**
   - Subdomain: `https://admin.yourdomain.com`
   - Railway URL: `https://your-admin-service.railway.app`
   - Path-based: `https://yourdomain.com/_admin`

2. **Test login:**
   - Email: `admin@yourdomain.com` (or your updated email)
   - Password: `admin123` (or your updated password)

3. **Test real-time search:**
   - Go to Users section
   - Type in search box
   - Verify instant results

## 📋 **Deployment Checklist**

- [ ] Railway service created ✅
- [ ] Environment variables set in Railway
- [ ] Repository connected to Railway
- [ ] Domain configured (subdomain or path-based)
- [ ] CORS updated in backend
- [ ] Admin password changed
- [ ] Deployment tested
- [ ] Search functionality verified

## 🚨 **Troubleshooting**

### **If deployment fails:**
1. Check Railway build logs
2. Verify environment variables are set
3. Ensure `package.json` has correct `start` script
4. Check `railway.json` configuration

### **If admin panel loads but can't connect to API:**
1. Verify `VITE_API_BASE_URL` is correct
2. Check CORS settings in backend
3. Ensure backend is deployed and accessible

### **If search doesn't work:**
1. Verify backend admin routes are deployed
2. Check authentication is working
3. Test API endpoints directly

## 🎯 **Next Steps After Deployment**

1. **Create pull requests** to merge feature branches to main
2. **Set up monitoring** for both services
3. **Configure backups** for your database
4. **Set up SSL certificates** (Railway handles this automatically)
5. **Monitor performance** and optimize as needed

---

**Your admin panel is now ready for production! 🎉**
