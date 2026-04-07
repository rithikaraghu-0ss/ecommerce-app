#!/bin/bash
# Deployment Helper Script
# Run this after you've created your GitHub repo and collected your credentials

echo "=== E-Commerce App Deployment Helper ==="
echo ""
echo "This script will guide you through pushing to GitHub."
echo ""
echo "BEFORE RUNNING THIS SCRIPT, YOU MUST:"
echo "1. Create a GitHub repository at https://github.com/new"
echo "2. Name it 'ecommerce-app' (or your preferred name)"
echo "3. Make it PUBLIC"
echo "4. Copy your GitHub username"
echo ""
read -p "Enter your GitHub username: " GITHUB_USER
read -p "Enter your repository name (default: ecommerce-app): " REPO_NAME
REPO_NAME=${REPO_NAME:-ecommerce-app}

echo ""
echo "Setting up Git remote and pushing to GitHub..."
echo ""

cd "$(dirname "$0")"

# Add remote
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# Rename branch to main if needed
git branch -M main

# Push
git push -u origin main

echo ""
echo "✅ Push complete!"
echo ""
echo "Your repository is now at: https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""
echo "Next steps:"
echo "1. Deploy backend on Render (see DEPLOYMENT.md)"
echo "2. Deploy frontend on Vercel (see DEPLOYMENT.md)"
echo "3. Test everything!"
