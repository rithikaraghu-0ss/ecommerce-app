# E-Commerce App

## Backend

1. Open `backend` in terminal.
2. Copy `.env.example` to `.env` and fill your MongoDB URL and secret.
3. Run:
   - `npm install`
   - `npm start`
4. Optionally create an admin user quickly:
   - `node seedAdmin.js`
   - Login with `admin@ecommerce.com` / `Admin123!`

## Frontend

1. Open `frontend` in terminal.
2. Copy `frontend/.env.example` to `frontend/.env` if you want to override the API URL.
3. Run:
   - `npm install`
   - `npm start`
4. Open `http://localhost:3000` in your browser.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions on:
- Pushing to GitHub
- Deploying backend on Render
- Deploying frontend on Vercel

**Quick summary:**
1. Create GitHub repo and push
2. Deploy backend on Render (copy URL)
3. Deploy frontend on Vercel (set `VITE_API_BASE` env var)
4. Test with admin login and product management

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/cart` (authorized)
- `POST /api/cart/add` (authorized)

## Notes

- Frontend connects to `http://localhost:5000` by default.
- Admin panel is available after login with admin credentials.
