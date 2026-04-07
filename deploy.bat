@echo off
REM Deployment Helper Script for Windows
REM Run this after you've created your GitHub repo

echo.
echo === E-Commerce App Deployment Helper ===
echo.
echo BEFORE RUNNING THIS SCRIPT, YOU MUST:
echo 1. Create a GitHub repository at https://github.com/new
echo 2. Name it 'ecommerce-app' (or your preferred name)
echo 3. Make it PUBLIC
echo 4. Copy your GitHub username
echo.

set /p GITHUB_USER="Enter your GitHub username: "
set /p REPO_NAME="Enter your repository name (default: ecommerce-app): "

if "%REPO_NAME%"=="" set REPO_NAME=ecommerce-app

echo.
echo Setting up Git remote and pushing to GitHub...
echo.

cd /d "%~dp0"

REM Add remote
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

REM Rename branch to main if needed
git branch -M main

REM Push
git push -u origin main

echo.
echo ✅ Push complete!
echo.
echo Your repository is now at: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.
echo Next steps:
echo 1. Deploy backend on Render (see DEPLOYMENT.md)
echo 2. Deploy frontend on Vercel (see DEPLOYMENT.md)
echo 3. Test everything!
echo.
pause
