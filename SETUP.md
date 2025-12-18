# Environment Variables Setup

## Local Development

Create `frontend/.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_KEY=your_supabase_anon_key_here
VITE_SUPABASE_TABLE=song_requests
```

**Note:** `VITE_SUPABASE_TABLE` is optional - it defaults to `song_requests` if not provided.

## Vercel Deployment

### Option 1: Vercel Dashboard (Recommended)
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
   - `VITE_SUPABASE_TABLE` (optional)

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Set variables
cd frontend
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_KEY
vercel env add VITE_SUPABASE_TABLE
```

## Important Notes

- **Never commit `.env` files** - they're already in `.gitignore`
- All environment variables must start with `VITE_` to be accessible in the React app
- For production, use your actual Supabase credentials
- Make sure your Supabase RLS policies allow SELECT and UPDATE operations
