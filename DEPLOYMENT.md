# Deployment Guide

## Quick Start

### 1. Choose Your Deployment Platform

**Vercel (Easiest)**
- Sign up at [vercel.com](https://vercel.com)
- Connect your GitHub repository
- Deploy automatically

**DigitalOcean (Scalable)**
- Use the provided `do-app.yaml` file
- Connect to DigitalOcean App Platform

**Self-hosted (Full Control)**
- Upload files to your VPS
- Use PM2 for process management
- Configure Nginx reverse proxy

**Docker (Containerized)**
- Use the provided Docker files
- Deploy with Docker Compose

### 2. Prepare Your Files

All files are ready in this repository. You just need to:

1. **Replace placeholders**:
   - `yourusername` in URLs with your actual GitHub username
   - `your-domain.com` with your actual domain

2. **Set up environment variables**:
   - Copy `.env.production.example` to `.env.production`
   - Update with your actual values

3. **Deploy to your chosen platform**

### 3. Post-Deployment

1. **Point your domain** to the deployed application
2. **Set up SSL** (automatic on Vercel, manual for self-hosted)
3. **Test the application** thoroughly
4. **Monitor performance** and uptime

## Platform-Specific Instructions

### Vercel Deployment
```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy NEXUS Search Engine"
git push origin main

# 2. Deploy on Vercel
# - Go to vercel.com
# - Import repository
# - Add environment variables
# - Click deploy
```

### DigitalOcean Deployment
```bash
# 1. Use the do-app.yaml file
# 2. Go to DigitalOcean App Platform
# 3. Connect your GitHub repository
# 4. Deploy automatically
```

### Self-hosted VPS
```bash
# 1. Upload files to server
scp -r ./ nexus-search-engine user@your-server:/path/

# 2. Install and start
cd nexus-search-engine
npm install
npm run build
npm install -g pm2
pm2 start ecosystem.config.js
```

### Docker Deployment
```bash
# 1. Build and run
docker-compose up -d

# 2. Check status
docker-compose ps
docker-compose logs nexus-search-engine
```

## Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Environment Variables**
```bash
# Verify .env.production exists
cat .env.production

# Check syntax
node -e "console.log(process.env.NODE_ENV)"
```

### Support

If you encounter issues:
1. Check the logs on your deployment platform
2. Verify environment variables
3. Test locally with production settings
4. Check network connectivity

## Success!

Your NEXUS Search Engine is now ready for deployment! 🚀