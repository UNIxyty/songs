# DJ Song Request Management System

A web application for DJs to manage song requests from their Telegram bot.

## Features

- View all song requests
- Mark songs as Approved/Declined/About to Play
- Real-time updates
- Modern UI with shadcn/ui components

## Tech Stack

- **Frontend**: React + Vite + shadcn/ui
- **Backend**: Node.js + Express
- **Database**: Supabase
- **Deployment**: Vercel

## Setup

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
- Create `.env` in the `backend` folder with your Supabase credentials
- Create `.env` in the `frontend` folder with your API URL

3. Run development servers:
```bash
npm run dev
```

## Environment Variables

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

## Database Schema

Create a table in Supabase called `song_requests` with the following columns:
- `id` (uuid, primary key)
- `song_title` (text)
- `artist` (text)
- `requester_name` (text)
- `requester_id` (text, from Telegram)
- `status` (text, default: 'pending')
- `created_at` (timestamp, default: now())
- `updated_at` (timestamp, default: now())

## Deployment

The project is configured for Vercel deployment. Push to git and connect to Vercel.

