# Deployment Guide for GitHub Pages

Follow these steps to deploy the application to GitHub Pages:

## 1. Initial Setup (Already Done)

The Git repository has been initialized in your project folder with the remote GitHub repository:

```bash
git init
git remote add origin https://github.com/abenheni/the-quiet-ui.git
```

## 2. Prepare Files for Deployment

Before your first push, ensure these files are ready:

- `index.html` (main application file)
- `dist/output.css` (compiled CSS file)
- `.gitignore` (to exclude unnecessary files)
- Rename `README.md.github` to `README.md` or update your current README

## 3. Commit and Push Changes

```bash
git add .
git commit -m "Initial deployment to GitHub Pages"
git push origin main
```

## 4. Configure GitHub Pages

1. Go to your GitHub repository: https://github.com/abenheni/the-quiet-ui
2. Click on "Settings"
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "main" branch and "/ (root)" folder
5. Click "Save"

## 5. Access Your Site

After GitHub finishes building your site (usually takes a minute or two), you can access it at:

https://abenheni.github.io/the-quiet-ui/

## 6. Updating the Site

Whenever you make changes and want to update the deployed site:

1. Make your changes locally
2. Rebuild any assets if needed (`npm run build`)
3. Copy the updated files to the GitHub repo
4. Commit and push the changes
5. GitHub Pages will automatically rebuild and deploy your site

## Notes

- GitHub Pages only supports static content (HTML, CSS, JavaScript)
- The site will be publicly accessible to anyone with the URL
- If you want to use a custom domain, you can configure it in the GitHub Pages settings
