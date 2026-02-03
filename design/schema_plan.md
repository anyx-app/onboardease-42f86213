# Schema Plan - OnboardEase

## Overview
This schema supports the core features of OnboardEase: onboarding checklists, document signing, training videos, and team introductions. It uses a relational model centered around the `profiles` table (linked to Supabase Auth).

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table with application-specific user data.
- **id** (UUID, PK): References `auth.users.id`.
- **full_name** (TEXT): The user's display name.
- **role** (TEXT): 'admin' (HR) or 'employee' (New Hire).
- **department** (TEXT): Grouping for tasks/introductions.
- **start_date** (DATE): Used to calculate due dates.
- **created_at** (TIMESTAMPTZ): Default `now()`.
- **updated_at** (TIMESTAMPTZ): Default `now()`.

### 2. onboarding_tasks
Catalog of standard onboarding tasks defined by HR.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **title** (TEXT): Short name of the task.
- **description** (TEXT): Detailed instructions.
- **category** (TEXT): e.g., 'Paperwork', 'IT Setup', 'Training'.
- **is_required** (BOOLEAN): Default `true`.
- **due_day_offset** (INTEGER): Days relative to `start_date` (e.g., 0 for Day 1).
- **created_at** (TIMESTAMPTZ).

### 3. employee_tasks
Instances of tasks assigned to specific employees. Allows tracking progress.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **user_id** (UUID, FK): References `profiles.id`.
- **task_id** (UUID, FK): References `onboarding_tasks.id`.
- **status** (TEXT): 'pending', 'completed'. Default 'pending'.
- **completed_at** (TIMESTAMPTZ): Nullable.
- **created_at** (TIMESTAMPTZ).

### 4. documents
Templates for documents that need signing or acknowledgement.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **title** (TEXT): Name of the document (e.g., "NDA").
- **content_url** (TEXT): URL to the blank PDF/Template.
- **created_at** (TIMESTAMPTZ).

### 5. employee_documents
Tracks which employees have signed which documents.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **user_id** (UUID, FK): References `profiles.id`.
- **document_id** (UUID, FK): References `documents.id`.
- **status** (TEXT): 'pending', 'signed'. Default 'pending'.
- **signature_url** (TEXT): URL to the signed version (optional).
- **signed_at** (TIMESTAMPTZ): Nullable.
- **created_at** (TIMESTAMPTZ).

### 6. training_videos
Library of training content.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **title** (TEXT): Video title.
- **description** (TEXT): Context about the video.
- **video_url** (TEXT): URL to the media stream.
- **duration_minutes** (INTEGER): Approximate length.
- **created_at** (TIMESTAMPTZ).

### 7. employee_video_progress
Tracks completion of training modules.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **user_id** (UUID, FK): References `profiles.id`.
- **video_id** (UUID, FK): References `training_videos.id`.
- **is_watched** (BOOLEAN): Default `false`.
- **watched_at** (TIMESTAMPTZ): Nullable.

### 8. team_members
 curated list of team members for the "Team Introductions" feature.
- **id** (UUID, PK): Default `gen_random_uuid()`.
- **name** (TEXT): Full name.
- **role** (TEXT): Job title.
- **bio** (TEXT): Short introduction.
- **photo_url** (TEXT): URL to avatar image.
- **department** (TEXT): To filter relevance.
- **created_at** (TIMESTAMPTZ).

## Relationships
- `profiles` 1:N `employee_tasks`
- `onboarding_tasks` 1:N `employee_tasks`
- `profiles` 1:N `employee_documents`
- `documents` 1:N `employee_documents`
- `profiles` 1:N `employee_video_progress`
- `training_videos` 1:N `employee_video_progress`

## Security Policies (RLS)
- **profiles**: Users can read/update their own profile. Admins can read/update all.
- **onboarding_tasks**: Public read, Admin write.
- **employee_tasks**: Users can read/update own tasks. Admins can read all.
- **documents**: Public read, Admin write.
- **employee_documents**: Users can read/update own. Admins can read all.
- **training_videos**: Public read, Admin write.
- **team_members**: Public read, Admin write.
