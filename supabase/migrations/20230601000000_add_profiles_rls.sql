-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to delete their own profile (optional)
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Grant necessary permissions to authenticated users
GRANT ALL ON public.profiles TO authenticated;

-- For debugging: Allow all operations for authenticated users (remove this in production)
CREATE POLICY "Allow all operations for authenticated users" ON public.profiles
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');