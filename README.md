My Music App — Backend

Node.js/Express REST API for a music application.

Features:
- Google OAuth 2.0 login via Passport
- Email OTP login via Nodemailer + JWT issuance
- CRUD for artists, albums, songs, playlists; comments; genres; favorites; follows; play history
- OpenAPI/Swagger docs at `/api-docs`

Note: Some items are still evolving. See TODOs below.

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
    - `npm run dev` — start in dev mode with nodemon
    - `npm start` — start with Node

## Requirements

- Node.js LTS (18.x or 20.x recommended). TODO: Confirm exact supported versions via CI/runtime checks.
- MongoDB: running instance accessible via connection string
- npm (bundled with Node.js)

## Environment Variables
Create a `.env` file in the project root with the following variables:

```
# Server
PORT=8080                     # required; example value 8080
SESSION_SECRET=your_session_secret   # defaults to "secret" if not set (development only)

# Database
MONGODB_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret

# Google OAuth (Passport)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
# Callback path is /api/auth/google/callback — ensure this exact redirect URI is authorized in Google Cloud Console.

# SMTP (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=no-reply@example.com
SMTP_PASS=your_smtp_password
```

Notes:

- `PORT` is required by `index.js` (`app.listen(PORT)`). Set it explicitly for local development.
- `SESSION_SECRET` is used by `express-session` (defaults to `"secret"` in code). Do not use the default in production.
- `JWT_SECRET` is used to sign JWTs in the OTP flow. TODO: Add token expiry and refresh strategy.
- For production, replace the default in-memory session store with a persistent store (e.g., Redis). TODO: Wire session
  store configuration.

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
4. API Docs (Swagger):
    - Local: http://localhost:8080/api-docs (replace port if you set a different `PORT`)
    - A secondary dev-tunnel URL exists in Swagger config and may be
      stale: https://s1v081lr-8080.asse.devtunnels.ms/api-docs
        - TODO: Verify or remove this server entry if not used.

## API Overview

Base URL (local): `http://localhost:<PORT>`

- Auth
    - (Google OAuth via Passport)
        - `GET /api/auth/google` — start Google OAuth
        - `GET /api/auth/google/callback` — OAuth callback (returns user JSON)

    - (Email OTP)
        - `POST /api/email/send-otp` — send OTP to email
            - Body: `{ "email": "user@example.com" }`
        - `POST /api/email/verify-otp` — verify OTP, returns JWT
            - Body: `{ "email": "user@example.com", "otp": "123456" }`
    - Device check
        - `POST /api/auth/check-device` — determine login method for a device

- Artists
    - `GET /api/artists` — list artists (optional `?search=...`)
    - `POST /api/artists` — create artist
    - `GET /api/artists/:id` — get artist by id
    - `PUT /api/artists/:id` — update artist
    - `DELETE /api/artists/:id` — delete artist

- Albums
    - `GET /api/albums` — list albums
    - `POST /api/albums` — create album

- Songs
    - `GET /api/songs` — list songs (optional `?search=...`)
    - `POST /api/songs` — create song

- Comments
    - `GET /api/comments/:songId` — get comments for a song
    - `POST /api/comments/:songId` — create comment for a song
    - `PUT /api/comments/:id` — update a comment by id
    - `DELETE /api/comments/:id` — delete a comment by id

- Genres
    - `GET /api/genres` — list all genres
    - `POST /api/genres` — create genre (auth required)
    - `DELETE /api/genres/:id` — delete genre (auth required)

- Playlists
    - `GET /api/playlists` — list my playlists
    - `POST /api/playlists` — create playlist
    - `DELETE /api/playlists/:id` — delete a playlist
    - `POST /api/playlists/:id/songs` — add song to playlist

- Favorites
    - `GET /api/favorites` — list my favorite songs
    - `POST /api/favorites` — toggle favorite for a song

- Follows
    - `GET /api/follows` — list artists I follow
    - `POST /api/follows` — follow/unfollow an artist

- Play History
    - `GET /api/history` — my recent play history (max 20)
    - `POST /api/history` — add a song play to history

- Swagger/OpenAPI
    - Served at `GET /api-docs`
    - Annotations live in `src/routes/*.js`

## Data Models (Mongoose)

- `User` (`src/models/User.js`)
- `Artist` (`src/models/Artist.js`)
- `Album` (`src/models/Album.js`)
- `Song` (`src/models/Song.js`)
- `Playlist` (`src/models/Playlist.js`)
- `Comment` (`src/models/Comment.js`)
- `Genre` (`src/models/Genre.js`)
- `FavoriteSong` (`src/models/FavoriteSong.js`)
- `Follow` (`src/models/Follow.js`)
- `PlayHistory` (`src/models/PlayHistory.js`)
- `DeviceSession` (`src/models/DeviceSession.js`)

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
│  │  ├─ albumController.js
│  │  ├─ artistController.js
│  │  ├─ authController.js      # Email OTP + device check
│  │  ├─ commentController.js
│  │  ├─ favoriteController.js
│  │  ├─ followController.js
│  │  ├─ genreController.js
│  │  ├─ historyController.js
│  │  ├─ playlistController.js
│  │  └─ songController.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  ├─ Album.js
│  │  ├─ Artist.js
│  │  ├─ Comment.js
│  │  ├─ DeviceSession.js
│  │  ├─ FavoriteSong.js
│  │  ├─ Follow.js
│  │  ├─ Genre.js
│  │  ├─ PlayHistory.js
│  │  ├─ Playlist.js
│  │  ├─ Song.js
│  │  └─ User.js
│  └─ routes/
│     ├─ albumRoutes.js
│     ├─ artistRoutes.js
│     ├─ authRoutes.js          
│     ├─ commentRoutes.js
│     ├─ favoriteRoutes.js
│     ├─ followRoutes.js
│     ├─ genreRoutes.js
│     ├─ historyRoutes.js
│     ├─ playlistRoutes.js
│     └─ songRoutes.js
└─ node_modules/
```

## Running Tests

No automated tests are included yet.

Suggested next steps (TODO):
- Add unit/integration tests (e.g., Jest + Supertest)
- Add `npm test` script and wire to CI

## Development Notes

- ES Modules are enabled (`"type": "module"`).
- Sessions currently use the default MemoryStore (OK for dev only). TODO: add a persistent store for production.
- JWT generation in OTP flow does not set expiration. TODO: add `expiresIn` and a refresh flow if needed.
- Swagger config includes an additional dev-tunnel server URL. TODO: verify/update/remove.
- Duplicate router mount: `authRoutes` is mounted at both `/api/auth` and `/api/email`. This yields expected OTP paths
  under `/api/email/*`, but also exposes any other routes defined in that file under `/api/email`. TODO: Consider
  splitting `emailRoutes` from `authRoutes` for clarity.

## License

ISC — see `package.json`.

TODO: Add a `LICENSE` file if ISC is the intended license for distribution.