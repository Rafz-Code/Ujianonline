-- SMK Prima Unggul Smart School Hub - Database Setup
-- Run this in your Supabase SQL Editor (https://app.supabase.com/)

-- 1. PROFILES TABLE (Core User Data)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  display_name TEXT,
  photo_url TEXT,
  role TEXT DEFAULT 'siswa' CHECK (role IN ('admin', 'guru', 'siswa')),
  department TEXT,
  nisn TEXT,
  passing_status TEXT DEFAULT 'Proses',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profiles." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. STAFF ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.staff_attendance (
  id BIGSERIAL PRIMARY KEY,
  uid UUID REFERENCES auth.users(id),
  date DATE NOT NULL,
  status TEXT DEFAULT 'hadir',
  display_name TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS for Staff Attendance
ALTER TABLE public.staff_attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can insert their own attendance." ON public.staff_attendance FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Staff can view their own attendance." ON public.staff_attendance FOR SELECT USING (auth.uid() = uid);
CREATE POLICY "Admins can view ALL staff attendance." ON public.staff_attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. STUDENT ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.student_attendance (
  id BIGSERIAL PRIMARY KEY,
  student_id TEXT, -- References students table or ID string
  teacher_id UUID REFERENCES auth.users(id),
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('hadir', 'sakit', 'izin', 'alpha')),
  class_name TEXT,
  major_name TEXT,
  nis TEXT,
  student_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS for Student Attendance
ALTER TABLE public.student_attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers can read all student attendance." ON public.student_attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'guru' OR role = 'admin'))
);
CREATE POLICY "Teachers can insert student attendance." ON public.student_attendance FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'guru' OR role = 'admin'))
);

-- 4. EXAM RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.exam_results (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_name TEXT,
  user_major TEXT,
  nisn TEXT,
  score INTEGER,
  is_passed BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS for Exam Results
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can insert their own exam results." ON public.exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students can view their own exam results." ON public.exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view ALL exam results." ON public.exam_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'guru' OR role = 'admin'))
);

-- 5. STUDENTS LIST TABLE (For Teachers to Pick From)
CREATE TABLE IF NOT EXISTS public.students (
  id BIGSERIAL PRIMARY KEY,
  nis TEXT UNIQUE,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  major TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can read student list." ON public.students FOR SELECT USING (true);

-- 6. AUTOMATIC PROFILE TRIGGER
-- This function creates a entry in public.profiles whenever a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, photo_url, role, department, nisn)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id),
    COALESCE(new.raw_user_meta_data->>'role', 'siswa'),
    COALESCE(new.raw_user_meta_data->>'department', 'General'),
    COALESCE(new.raw_user_meta_data->>'nisn', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
