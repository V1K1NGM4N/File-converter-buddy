# Supabase Setup Guide

## Current Status
✅ Supabase package installed (`@supabase/supabase-js`)
✅ Error handling implemented for missing configuration
✅ Application will run in fallback mode without Supabase

## To Complete Supabase Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready

### 2. Get Your Project Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key

### 3. Create Environment File
Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Example:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Set Up Database Tables
Run these SQL commands in your Supabase SQL editor:

```sql
-- User conversion stats table
CREATE TABLE user_conversion_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  total_conversions INTEGER DEFAULT 0,
  monthly_conversions INTEGER DEFAULT 0,
  last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_premium BOOLEAN DEFAULT FALSE,
  conversions_by_type JSONB DEFAULT '{"images": 0, "videos": 0, "audio": 0, "productFeeds": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global conversion stats table
CREATE TABLE global_conversion_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_files_converted INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  last_conversion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  conversions_by_type JSONB DEFAULT '{"images": 0, "videos": 0, "audio": 0, "productFeeds": 0}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial global stats record
INSERT INTO global_conversion_stats (id) VALUES (gen_random_uuid());

-- Enable Row Level Security (RLS)
ALTER TABLE user_conversion_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_conversion_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for user_conversion_stats
CREATE POLICY "Users can view their own stats" ON user_conversion_stats
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own stats" ON user_conversion_stats
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own stats" ON user_conversion_stats
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policies for global_conversion_stats (read-only for all users)
CREATE POLICY "Anyone can view global stats" ON global_conversion_stats
  FOR SELECT USING (true);
```

### 5. Restart Development Server
After creating the `.env` file:
```bash
npm run dev
```

## Current Fallback Behavior
- Without Supabase configuration, the app uses localStorage for user stats
- All conversion tracking works locally
- No data is lost, it just doesn't sync across devices
- The app displays "Unlimited" usage for all users

## Testing
1. The app should start without errors
2. Check browser console for "Supabase environment variables not found. Using fallback mode." message
3. After setting up Supabase, the message should disappear
4. User stats should sync across browser sessions when logged in
