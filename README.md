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
2. Copy `.env.example` to `.env` if you want to override the API URL.
3. Run:
   - `npm install`
   - `npm run dev`
4. Open the Vite URL shown in terminal.

## Deployment

### Backend on Render

1. Create a new Web Service in Render.
2. Connect the `backend` folder.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Add the environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`

Render will automatically detect `package.json`.

### Frontend on Vercel

1. Create a new Vercel project from `frontend`.
2. Set the framework preset to Vite.
3. Deploy with the default build command `npm run build`.
4. If your frontend needs the backend URL, add `VITE_API_BASE` in Vercel environment variables.

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
