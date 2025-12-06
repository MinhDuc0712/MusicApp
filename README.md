My Music App — Backend

A Node.js/Express REST API for a music application. It provides:
- Google OAuth 2.0 login via Passport
- Email OTP login via Nodemailer + JWT issuance
- Artist CRUD endpoints (MongoDB/Mongoose)
- OpenAPI/Swagger docs served at `/api-docs`

Note: Some routes and features are work-in-progress (see TODOs).

## Tech Stack
- Runtime: Node.js (ES Modules)
- Framework: Express 5
- Database/ODM: MongoDB with Mongoose
- Auth: Passport (Google OAuth 2.0), JSON Web Tokens (JWT)
- Email: Nodemailer (SMTP)
- Docs: swagger-jsdoc + swagger-ui-express
- Sessions: express-session (MemoryStore by default — not for production)
- Package manager: npm (see `package-lock.json`)

## Entry Point and Scripts
- Entry point: `index.js`
- Scripts (from `package.json`):
  - `npm run dev` — Start in dev mode with nodemon
  - `npm start` — Start with Node

## Requirements
- Node.js: LTS recommended (e.g., 18.x or 20.x). TODO: Confirm exact supported version(s).
- MongoDB: A running MongoDB instance accessible via connection string
- npm (bundled with Node.js)

## Environment Variables
Create a `.env` file in the project root with the following variables:

```
# Server
PORT=5000                     # optional; default 5000
SESSION_SECRET=your_session_secret

# Database
MONGODB_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret

# Google OAuth (Passport)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
# The callback is configured as /api/auth/google/callback in code
# Configure this exact authorized redirect URI in your Google Cloud Console.

# SMTP (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=no-reply@example.com
SMTP_PASS=your_smtp_password
```

Notes:
- `SESSION_SECRET` is used by `express-session`.
- `JWT_SECRET` is used to sign JWTs in the OTP flow (no explicit expiry set in code). TODO: Add expiry and refresh strategy.
- When deploying, do not use the default in-memory session store; use a production-ready store (e.g., Redis). TODO: Configure a persistent session store for production.

## Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Create and fill `.env` as shown above.
3. Start the server (choose one):
   ```
   npm run dev   # dev with nodemon
   npm start     # plain node
   ```
4. API Docs: Open http://localhost:5000/api-docs
   - A secondary dev tunnel URL is present in the Swagger config and may be stale: `https://s1v081lr-8080.asse.devtunnels.ms` (TODO: update/remove if not used).

## API Overview
Base URL (local): `http://localhost:<PORT>` (default 5000)

- Auth (Google OAuth via Passport)
  - `GET /api/auth/google` — Start Google OAuth
  - `GET /api/auth/google/callback` — OAuth callback (returns user JSON)

- Auth (Email OTP)
  - `POST /api/email/send-otp` — Send OTP to email
    - Body: `{ "email": "user@example.com" }`
  - `POST /api/email/verify-otp` — Verify OTP, returns JWT
    - Body: `{ "email": "user@example.com", "otp": "123456" }`

- Artists
  - `GET /api/artists` — List artists (optional `?search=...`)
  - `POST /api/artists` — Create artist
  - `GET /api/artists/:id` — Get artist by id
  - `PUT /api/artists/:id` — Update artist
  - `DELETE /api/artists/:id` — Delete artist

- Songs (WIP)
  - Route file exists (`src/routes/songRoutes.js`) with `GET /api/songs` → returns songs
  - Currently commented out in `index.js` — not exposed. TODO: enable when ready.

- Swagger/OpenAPI
  - Served at `GET /api-docs`
  - Annotations live in `src/routes/*.js`

## Data Models (Mongoose)
- `User` (`src/models/User.js`): `name`, `email`, `googleId`, `avatar`
- `Artist` (`src/models/Artist.js`): `name`, `bio`, `avatar`, `socials`, `createdAt`
- `Song` (`src/models/Song.js`): `songName`, `artist`, `album`, `year`, `url`, `coverImage`, `createdAt`
- `Comment` (`src/models/Comment.js`): refs `user` and `song`, `content`, `likesCount`, `createdAt`

## Project Structure
```
backend/
├─ index.js                      # App entry (Express, routes, Swagger)
├─ package.json / package-lock.json
├─ src/
│  ├─ config/
│  │  ├─ db.js                  # Mongoose connection
│  │  └─ passport.js            # Google OAuth strategy
│  ├─ controllers/
│  │  ├─ artistController.js
│  │  ├─ authController.js      # Email OTP + token issuance
│  │  └─ songController.js
│  ├─ models/
│  │  ├─ Artist.js
│  │  ├─ Comment.js
│  │  ├─ Song.js
│  │  └─ User.js
│  └─ routes/
│     ├─ artistRoutes.js
│     ├─ authRoutes.js
│     ├─ emailRoutes.js
│     └─ songRoutes.js          # not currently mounted
└─ node_modules/
```

## Running Tests
No automated tests are included in this repository yet. TODO:
- Add unit/integration tests (e.g., Jest + Supertest)
- Wire tests to CI and document commands (e.g., `npm test`).

## Development Notes
- This project uses ES Modules (`"type": "module"`).
- Express sessions currently use the default MemoryStore (suitable only for development). TODO: add a persistent store for production.
- JWT generation in the OTP flow does not set expiration. TODO: add `expiresIn` and a refresh flow if needed.
- The Songs route is present but not enabled in `index.js`. TODO: uncomment and secure as appropriate.

## License
ISC — see `package.json`. TODO: Add a `LICENSE` file if ISC is the intended license for distribution.