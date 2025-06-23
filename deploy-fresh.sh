#!/bin/bash

# Fresh deployment script for Railway - prevents caching issues
# This script ensures a completely fresh build and deployment

echo "🧹 Starting fresh deployment process..."

# Step 1: Clean local build artifacts
echo "🗑️  Cleaning local build artifacts..."
rm -rf dist/
rm -rf node_modules/.cache/
rm -rf .vite/

# Step 2: Clean install dependencies
echo "📦 Fresh install of dependencies..."
npm ci --legacy-peer-deps --no-cache

# Step 3: Build with cache busting
echo "🔨 Building with cache busting..."
NODE_ENV=production npm run build

# Step 4: Verify build
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"
ls -la dist/assets/

# Step 5: Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up --detach

echo "🎉 Fresh deployment initiated!"
echo "📊 Monitor deployment: https://railway.app"
echo "🌐 Admin Panel: https://language-tutor-admin-production.up.railway.app"
