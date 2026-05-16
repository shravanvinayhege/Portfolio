# Deployment Guide

## Setup & Deployment to GitHub Pages

### Prerequisites
- Git installed
- GitHub account

### Step 1: Initialize Git Repository (if not already done)

```bash
cd "c:\Users\shrav\OneDrive\Desktop\shravan\.vscode\Portfolio"
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio` (or any name you prefer)
3. **Do NOT initialize with README, .gitignore, or license**
4. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - Select **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 5: Verify Deployment

- GitHub Pages will build and deploy automatically
- Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`
- Check the **Deployments** section in your repository for status

## What's Configured

✅ `.nojekyll` - Disables Jekyll processing (preserves your CSS/JS)  
✅ `.gitignore` - Excludes unnecessary files  
✅ GitHub Actions workflow - Auto-deploys on push to main  
✅ Fixed HTML issues - All tags properly closed  
✅ Optimized form - Email submission ready  

## Files Included

- `index.html` - Main portfolio page
- `style.css` - Styling with light/dark theme
- `main.js` - Interactive features (theme toggle, animations)
- `pfp.png` - Profile picture
- `resume.pdf` - Resume for download
- `README.md` - Project description

## Troubleshooting

**Site not showing after 10 minutes?**
- Check **Settings** → **Pages** to confirm deployment status
- Clear browser cache or try incognito mode

**Assets not loading?**
- Verify all image/file paths are relative (no absolute paths)
- Check file names match exactly (case-sensitive on GitHub)

**Custom domain?**
- In Settings → Pages, add your custom domain
- Update DNS records with GitHub's nameservers

## Next Steps

1. Update URLs in `main.js` if using a custom domain
2. Add more projects to showcase your work
3. Update contact information as needed
