# DJ Song Request Management System

A web application for DJs to manage song requests from their Telegram bot.

## Features

- View all song requests
- Mark songs as Approved/Declined/About to Play
- Real-time updates (polls every 5 seconds)
- Modern UI with shadcn/ui components
- Responsive design

## Tech Stack

- **Frontend**: React + Vite + shadcn/ui + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase
- **Deployment**: Vercel

## Setup

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase-schema.sql` to create the `song_requests` table

### 3. Configure Environment Variables

#### Backend (`backend/.env`)
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3001
```

#### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:3001
```

### 4. Run Development Servers

```bash
npm run dev
```

This will start both frontend (http://localhost:5173) and backend (http://localhost:3001) servers.

## Database Schema

The `song_requests` table has the following structure:
- `id` (uuid, primary key)
- `song_title` (text, required)
- `artist` (text, optional)
- `requester_name` (text, optional)
- `requester_id` (text, optional - Telegram user ID)
- `status` (text, default: 'pending') - Values: 'pending', 'approved', 'declined', 'about_to_play'
- `created_at` (timestamp, auto-generated)
- `updated_at` (timestamp, auto-updated)

## API Endpoints

### GET `/api/songs`
Get all song requests, ordered by creation date (newest first).

### PATCH `/api/songs/:id`
Update a song's status. Body: `{ "status": "approved" | "declined" | "about_to_play" }`

### GET `/api/health`
Health check endpoint.

## Deployment to Vercel

### Option 1: Deploy Frontend and Backend Separately

1. **Deploy Backend:**
   - Go to Vercel dashboard
   - Import your repository
   - Set root directory to `backend`
   - Add environment variables (SUPABASE_URL, SUPABASE_KEY)
   - Deploy

2. **Deploy Frontend:**
   - Create a new project in Vercel
   - Set root directory to `frontend`
   - Add environment variable: `VITE_API_URL` (your backend API URL)
   - Deploy

### Option 2: Monorepo Deployment

1. Push your code to GitHub:
```bash
git remote add origin <your-repo-url>
git push -u origin master
```

2. In Vercel:
   - Import your repository
   - Configure build settings:
     - Root Directory: `frontend`
     - Build Command: `npm install && npm run build`
     - Output Directory: `dist`
   - Add environment variables
   - For API routes, you may need to configure Vercel to handle `/api/*` routes separately

### Environment Variables for Vercel

**Backend:**
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `NODE_ENV=production`

**Frontend:**
- `VITE_API_URL` (your deployed backend URL)

## Git Setup

The repository is already initialized. To push to a remote:

```bash
git remote add origin <your-repo-url>
git push -u origin master
```

## Usage

1. Your Telegram bot should insert song requests into the `song_requests` table
2. Open the web dashboard
3. View all requests in the table
4. Click "Approve", "Decline", or "About to Play" to update the status
5. The status updates are reflected immediately and synced with your database
