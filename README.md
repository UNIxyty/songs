# DJ Song Request Management System

A web application for DJs to manage song requests from their Telegram bot. Built with React and Supabase.

## Features

- View all song requests
- Mark songs as Approved/Declined/About to Play/Saved
- Real-time updates (polls every 5 seconds)
- Modern UI with shadcn/ui components
- Responsive design
- Direct Supabase integration (no backend needed)

## Tech Stack

- **Frontend**: React + Vite + shadcn/ui + Tailwind CSS
- **Database**: Supabase (direct client connection)
- **Deployment**: Vercel

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create `frontend/.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
VITE_SUPABASE_TABLE=song_requests
```

**Note:** `VITE_SUPABASE_TABLE` is optional - defaults to `song_requests` if not provided.

### 3. Run Development Server

```bash
npm run dev
```

Or from the root directory:
```bash
cd frontend && npm run dev
```

The app will be available at http://localhost:5173

## Database Schema

Your Supabase table should have the following structure:
- `id` (uuid, primary key)
- `song-name` (text) - Note: hyphenated column name
- `artist` (text, optional)
- `user_id` (text, optional - Telegram user ID)
- `link` (text, optional)
- `status` (text, optional) - Values: `NULL`, `'Saved'`, `'Approved'`, `'Declined'`, `'About to Play'`
- `created_at` (timestamptz, auto-generated)

## Deployment to Vercel

### Option 1: Deploy from Root Directory

1. Push your code to GitHub (already done)
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import your repository: `UNIxyty/songs`
4. Configure build settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_KEY` - Your Supabase anon key
   - `VITE_SUPABASE_TABLE` - (Optional) Table name, defaults to `song_requests`
6. Deploy!

### Option 2: Deploy from Frontend Directory

1. In Vercel, set root directory to `frontend`
2. Vercel will automatically detect Vite and configure build settings
3. Add the same environment variables as above

## Environment Variables for Vercel

Add these in your Vercel project settings:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_KEY` - Your Supabase anon/public key
- `VITE_SUPABASE_TABLE` - (Optional) Your table name

## Supabase Row Level Security (RLS)

Make sure your Supabase table has the appropriate RLS policies to allow:
- **SELECT** - To read song requests
- **UPDATE** - To update song status

Example policy (adjust based on your security needs):

```sql
-- Allow all operations (for development)
CREATE POLICY "Allow all operations" ON song_requests
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

For production, you may want to restrict access or add authentication.

## Usage

1. Your Telegram bot should insert song requests into the Supabase table
2. Open the web dashboard
3. View all requests in the table
4. Click "Approve", "Decline", "About to Play", or "Saved" to update the status
5. The status updates are reflected immediately and synced with your database

## Git Setup

The repository is already initialized and pushed to GitHub:
```bash
git remote -v  # Check remote
git push       # Push updates
```
