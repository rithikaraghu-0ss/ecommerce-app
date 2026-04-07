# Quick Deployment Checklist

## Phase 1: GitHub (15 mins)

### Step 1.1: Create GitHub Repo
- [ ] Go to https://github.com/new
- [ ] Repository name: `ecommerce-app`
- [ ] Description: "E-Commerce platform with React frontend and Node.js backend"
- [ ] Make it **PUBLIC**
- [ ] Click "Create repository"

### Step 1.2: Push Your Code
Run this command:
```bash
cd c:\Users\R.RITHIKA\projects\ecommerce-app
git remote add origin https://github.com/<YOUR-USERNAME>/ecommerce-app.git
git branch -M main
git push -u origin main
```

Replace `<YOUR-USERNAME>` with your actual GitHub username.

### Step 1.3: Verify
- [ ] Go to your GitHub repo URL
- [ ] You should see all your files (backend/, frontend/, README.md, etc.)
- [ ] Copy your GitHub repo URL for submission

---

## Phase 2: Backend Deployment on Render (20 mins)

### Step 2.1: Create Render Account
- [ ] Go to https://render.com
- [ ] Click "Sign up with GitHub" (easier)
- [ ] Authorize GitHub connection

### Step 2.2: Create Web Service
- [ ] Click "New +" button
- [ ] Select "Web Service"
- [ ] Connect GitHub account if not done
- [ ] Select your `ecommerce-app` repository
- [ ] Click "Connect"

### Step 2.3: Configure Backend Service
- [ ] **Name:** `ecommerce-backend`
- [ ] **Runtime:** Node
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `npm start`
- [ ] **Plan:** Starter (free)
- [ ] **Region:** Choose closest to you

### Step 2.4: Add Environment Variables
Click "Environment" and add these:

```
MONGO_URI=mongodb+srv://rithikaraghu29_db_user:4IysCWBzUF8Y6t3W@cluster0.mmwsnjm.mongodb.net/?appName=Cluster0
JWT_SECRET=rithikasecretkey123
```

(These are from your `.env` file)

### Step 2.5: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait 2-5 minutes for deployment
- [ ] Once live, copy the URL (looks like: `https://ecommerce-backend.onrender.com`)
- [ ] Save this URL - you'll need it for frontend

---

## Phase 3: Frontend Deployment on Vercel (15 mins)

### Step 3.1: Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Click "Sign up with GitHub"
- [ ] Authorize GitHub connection

### Step 3.2: Import Project
- [ ] Click "Add New" → "Project"
- [ ] Click "Import Git Repository"
- [ ] Select your `ecommerce-app` repo
- [ ] Click "Import"

### Step 3.3: Configure Frontend
- [ ] **Root Directory:** `frontend`
- [ ] **Framework:** Vite (should auto-detect)
- [ ] **Build Command:** `npm run build`
- [ ] **Output Directory:** `dist`

### Step 3.4: Add Environment Variable
Click "Environment Variables":

**Key:** `VITE_API_BASE`  
**Value:** `https://ecommerce-backend.onrender.com` (paste your Render URL here)

### Step 3.5: Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Once live, copy the URL (looks like: `https://ecommerce-app.vercel.app`)
- [ ] Save this URL for submission

---

## Phase 4: Testing (10 mins)

### Step 4.1: Register Admin
- [ ] Open your Vercel frontend URL
- [ ] Click "Admin" tab
- [ ] Click "Register" button
- [ ] Fill in:
  - **Name:** `Admin User` (or your name)
  - **Email:** `admin@ecommerce.com`
  - **Password:** `Admin123!`
  - **Check:** "Create admin user"
- [ ] Click "Register"

### Step 4.2: Login
- [ ] Should show "Registration successful! You can now login."
- [ ] Toggle back to "Login"
- [ ] Username: `admin@ecommerce.com`
- [ ] Password: `Admin123!`
- [ ] Click "Login"

### Step 4.3: Add Product
- [ ] Should now see Admin Panel
- [ ] Fill in a test product:
  - **Product name:** `Test Product`
  - **Description:** `This is a test`
  - **Price:** `999`
  - **Category:** `Test`
  - **Stock:** `10`
- [ ] Click "Add product"
- [ ] Should see "Product added successfully"

### Step 4.4: View Products
- [ ] Click "Products" tab
- [ ] Click "Refresh"
- [ ] Your test product should appear

### Step 4.5: Test Cart
- [ ] Click "Add to cart" on the product
- [ ] Click "Cart" tab
- [ ] Your product should be there
- [ ] Test quantity update
- [ ] Test remove

### Step 4.6: Verify Everything Works
- [ ] ✅ Admin login works
- [ ] ✅ Can add products
- [ ] ✅ Can view products
- [ ] ✅ Can add to cart
- [ ] ✅ Can view cart

---

## Phase 5: Prepare Submission

Collect these URLs:
- [ ] GitHub repository: `https://github.com/<username>/<repo-name>`
- [ ] Frontend URL: `https://ecommerce-app.vercel.app`
- [ ] Backend URL: `https://ecommerce-backend.onrender.com`

Take screenshots or record a video showing:
1. Admin login
2. Adding a product
3. Viewing products
4. Adding to cart
5. Viewing cart

---

## Troubleshooting

### Backend won't start
1. Check Render logs (Dashboard → ecommerce-backend → Logs)
2. Verify MONGO_URI is correct
3. Verify JWT_SECRET is set

### Frontend can't reach backend
1. Check browser console (F12 → Console)
2. Look for CORS errors
3. Verify VITE_API_BASE environment variable in Vercel
4. Wait 5 minutes for Vercel to rebuild with new env var

### Login says "Invalid token"
1. Try registering a new admin account
2. Make sure JWT_SECRET is same in backend and database

### Still stuck?
1. Verify all files pushed to GitHub
2. Check deployment logs on Render and Vercel
3. Ensure MongoDB connection is working

---

## Summary

**Time needed:** ~1 hour total
**Deadline:** April 9, 2026
**Your status:** Ready to deploy!

**Do this NOW:**
1. Create GitHub repo
2. Run `deploy.bat` (or manual git commands)
3. Deploy backend on Render
4. Deploy frontend on Vercel
5. Test everything
6. Submit!
