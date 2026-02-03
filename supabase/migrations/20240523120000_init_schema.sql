SET search_path TO proj_0fb62ac8;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table (Core User Data)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Links to auth.users (logically)
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'employee')) DEFAULT 'employee',
    department TEXT,
    start_date DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for RLS lookups
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Onboarding Tasks (Templates)
CREATE TABLE onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'Paperwork', 'IT', 'Training'
    is_required BOOLEAN DEFAULT true,
    due_day_offset INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Employee Tasks (Instances)
CREATE TABLE employee_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    task_id UUID REFERENCES onboarding_tasks(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Documents (Templates)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Employee Documents (Signatures)
CREATE TABLE employee_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'signed')) DEFAULT 'pending',
    signature_url TEXT,
    signed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Training Videos
CREATE TABLE training_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    duration_minutes INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Video Progress
CREATE TABLE employee_video_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES training_videos(id) ON DELETE CASCADE,
    is_watched BOOLEAN DEFAULT false,
    watched_at TIMESTAMPTZ,
    UNIQUE(profile_id, video_id)
);

-- Team Members (Introductions)
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    bio TEXT,
    photo_url TEXT,
    department TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Setup
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles: 
-- Users can see their own profile.
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Users can update their own profile.
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Admins can view all profiles.
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles p 
            WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
            AND p.role = 'admin'
        )
    );

-- Onboarding Tasks: Public Read (Authenticated), Admin Write
CREATE POLICY "Authenticated read tasks" ON onboarding_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin write tasks" ON onboarding_tasks FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
        AND p.role = 'admin'
    )
);

-- Employee Tasks: View Own, Admin View All.
CREATE POLICY "View own tasks" ON employee_tasks FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = employee_tasks.profile_id
        AND p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);
CREATE POLICY "Admin view all employee tasks" ON employee_tasks FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
        AND p.role = 'admin'
    )
);
-- Update own tasks (e.g. complete them)
CREATE POLICY "Update own tasks" ON employee_tasks FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = employee_tasks.profile_id
        AND p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Documents: Read All (Auth), Admin Write
CREATE POLICY "Authenticated read docs" ON documents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin write docs" ON documents FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
        AND p.role = 'admin'
    )
);

-- Employee Documents: Same as Employee Tasks
CREATE POLICY "View own doc status" ON employee_documents FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = employee_documents.profile_id
        AND p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);
CREATE POLICY "Admin view all doc status" ON employee_documents FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
        AND p.role = 'admin'
    )
);
CREATE POLICY "Update own doc status" ON employee_documents FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = employee_documents.profile_id
        AND p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Training Videos: Read All (Auth), Admin Write
CREATE POLICY "Authenticated read videos" ON training_videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin write videos" ON training_videos FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
        AND p.role = 'admin'
    )
);

-- Video Progress: Same as Employee Tasks
CREATE POLICY "View own progress" ON employee_video_progress FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = employee_video_progress.profile_id
        AND p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);
CREATE POLICY "Update own progress" ON employee_video_progress FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = employee_video_progress.profile_id
        AND p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Team Members: Read All, Admin Write
CREATE POLICY "Authenticated read team" ON team_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin write team" ON team_members FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub' 
        AND p.role = 'admin'
    )
);
