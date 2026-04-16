-- Database schema for Smart School Hub SMK Prima Unggul Tangerang Selatan

-- 1. Profiles Table (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  display_name TEXT,
  photo_url TEXT,
  role TEXT DEFAULT 'siswa' CHECK (role IN ('admin', 'guru', 'siswa')),
  department TEXT,
  passing_status TEXT DEFAULT 'Proses',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id BIGSERIAL PRIMARY KEY,
  nis TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  major TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Staff Attendance Table
CREATE TABLE IF NOT EXISTS staff_attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('hadir', 'sakit', 'izin', 'alpha')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Student Attendance Table
CREATE TABLE IF NOT EXISTS student_attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  teacher_id TEXT NOT NULL,
  nis TEXT NOT NULL,
  class_name TEXT NOT NULL,
  major_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('hadir', 'sakit', 'izin', 'alpha')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Exam Results Table
CREATE TABLE IF NOT EXISTS exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_major TEXT NOT NULL,
  nisn TEXT NOT NULL,
  score NUMERIC NOT NULL,
  is_passed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Profile Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, photo_url, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id),
    COALESCE(new.raw_user_meta_data->>'role', 'siswa')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS (Row Level Security)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

-- Create Policies (Simple versions - usually hardened based on user auth)
CREATE POLICY "Public Read Access" ON students FOR SELECT USING (true);
CREATE POLICY "Authenticated Insert" ON staff_attendance FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Select" ON staff_attendance FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Insert" ON student_attendance FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Select" ON student_attendance FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Insert" ON exam_results FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Select" ON exam_results FOR SELECT USING (auth.role() = 'authenticated');
