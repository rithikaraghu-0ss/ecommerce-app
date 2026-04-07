# Deployment Guide

## Step 1: Push to GitHub

### A. Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ecommerce-app` (or choose a name)
3. Add description: "E-Commerce platform with React frontend and Node.js backend"
4. Choose Public (for Render/Vercel free tier)
5. Click "Create repository"

### B. Push Code
```bash
cd c:\Users\R.RITHIKA\projects\ecommerce-app
git remote add origin https://github.com/<your-username>/ecommerce-app.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

### A. Create Account
- Go to [render.com](https://render.com)
- Sign up with GitHub (easier)

### B. Create Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub repository (select `ecommerce-app`)
3. Configure:
   - **Name:** `ecommerce-backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Choose closest to you

### C. Add Environment Variables
Click "Environment" and add:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.<region>.mongodb.net/<dbname>?appName=<appname>
JWT_SECRET=your_super_secret_jwt_key_here_12345
```

**Get MONGO_URI from:**
- MongoDB Atlas account
- Your connection string (already in your backend/.env)

### D. Deploy
- Click "Create Web Service"
- Wait ~2-5 minutes
- Copy the URL once deployed (e.g., `https://ecommerce-backend.onrender.com`)

---

## Step 3: Deploy Frontend on Vercel

### A. Create Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

### B. Import Project
1. Click "Add New..." → "Project"
2. Import Git Repository → select `ecommerce-app`
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### C. Add Environment Variables
Click "Environment Variables" and add:
```
VITE_API_BASE=https://ecommerce-backend.onrender.com
```

(Replace with your actual Render backend URL from Step 2)

### D. Deploy
- Click "Deploy"
- Wait ~2-3 minutes
- Your frontend URL will be displayed (e.g., `https://ecommerce-app.vercel.app`)

---

## Step 4: Test Everything

### A. Register Admin
1. Go to your Vercel frontend URL
2. Click "Admin" tab
3. Toggle to "Register Account"
4. Create an account with admin checkbox enabled
5. Login

### B. Add Products
1. Still on Admin panel
2. Fill in product details
3. Click "Add product"
4. Refresh "Products" tab to see your product

### C. Browse & Cart
1. Go to "Products" tab
2. Search/filter products
3. Add items to cart
4. View cart on "Cart" tab

---

## Troubleshooting

### Backend fails to start
- Check env vars in Render
- Verify MONGO_URI is correct
- Check logs in Render dashboard

### Frontend can't reach backend
- Verify `VITE_API_BASE` env var in Vercel
- Check browser Console (F12) for CORS errors
- Ensure backend is running

### Login doesn't work
- Verify token is returned from backend
- Check browser LocalStorage (F12 → Application)
- Try creating a new admin account

---

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── .env (with MONGO_URI, JWT_SECRET)
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   ├── models/ (User, Product, Cart)
│   ├── routes/ (auth, product, cart)
│   ├── middleware/ (auth.js)
│   └── seedAdmin.js
├── frontend/
│   ├── .env (with VITE_API_BASE)
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── components/
│   │       ├── ProductList.jsx
│   │       ├── Cart.jsx
│   │       └── AdminPanel.jsx
│   └── vite.config.js
├── .gitignore
├── README.md
└── .git/
```

---

## API Endpoints

Backend runs at `https://ecommerce-backend.onrender.com`

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/products` - List products (with search/filter)
- `POST /api/products` - Add product (admin only)
- `PUT /api/products/:id` - Edit product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/item/:productId` - Remove from cart

---

## Quick Summary

1. Push to GitHub
2. Deploy backend on Render (get URL)
3. Deploy frontend on Vercel (set VITE_API_BASE)
4. Register admin and test
5. Submit project!
