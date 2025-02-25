# Nadav Taoz - Music Collage

## Overview

This project consists of a front-end and back-end, where the front-end is built with React with Typescript (Vite) and TailwindCSS, and the back-end is a Node.js (Typescript) API interacting with Spotify.

## About the app

This app use is to create and manage collages that are based on the user's favorite musical choices from his Spotify account. The images of the collage are album covers. The app is collacting the user's preffered music from his Spotify account by permission.

**More featuers** - add Album, remove Album, save collage, load collage - **TDB**

### Tech Stack

- **Front-End:** React (Vite), TailwindCSS, MobX
- **Back-End:** Node.js, Express, Axios, MongoDB
- **Authentication:** Spotify API

### Folder Structure

```
/project-root
  ├── client/   # Front-end (React, Typescript, Vite, Tailwind)
  ├── server/   # Back-end (Node.js, Typescript, Express, Spotify API integration)
  ├── README.md (this file)
  ├── .prettierrc (Prettier config)
  ├── .gitignore
```

## Setup

### Install Dependencies

```sh
npm install  # For both client and server
```

### Running the Project

- **Client:**
  ```sh
  cd client
  npm run dev
  ```
- **Server:**
  ```sh
  cd server
  npm run dev
  ```

---

# Client

## Overview

The client is built with Vite, React, and TailwindCSS. It manages state using MobX and interacts with the back-end for authentication and data fetching.

### Tech Stack

- Vite (React + TypeScript)
- TailwindCSS
- MobX for state management
- Axios for API calls

### Installation

```sh
cd client
npm install
```

- Make sure `.env` contains Spotify credentials:
  ```sh
  VITE_API_BASE_URL=http://localhost:8080
  VITE_SPOTIFY_CLIENT_ID=your_client_id
  VITE_REDIRECT_URI=your_redirect_uri
  ```

### Running

```sh
npm run dev
```

### Features

- Authentication via Spotify API
- MobX stores (`userStore`, `appErrorStore`)
- Custom Tailwind theme
- Error handling with a dismissible error strip component

---

### Tailwind Configuration

- Tailwind config is located in `/client/index.css`.
- Custom colors like `sgreen: '#1DB954'` are defined.

# Server

## Overview

The server is built with Node.js, Express, and integrates with the Spotify API for authentication and token refresh.

### Tech Stack

- Node.js (Express)
- Axios for API calls
- Spotify OAuth authentication

### Installation

```sh
cd server
npm install
```

### Running

```sh
npm run dev
```

### Authentication with Spotify

- The app authenticates using Spotify OAuth.
- Uses `Authorization: Basic` header with `client_id` and `client_secret`.
- The token refresh flow:
  ```ts
  const results = await axios.post(
    SPOTIFY_REFRESH_URL,
    {
      grant_type: 'refresh_token',
      refresh_token: user.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  ```
- Make sure `.env` contains Spotify credentials:
  ```sh
  DB_URL=your_db_url
  CLIENT_URL=your_client_url
  JWT_SECRET=your_secret
  SPOTIFY_CLIENT_ID=your_spotify_client_id
  SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
  SPOTIFY_TOKEN_REDIRECT=should_be_the_same_like_in_the_client
  ```
