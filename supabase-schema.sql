-- ARCHON Database Schema for Supabase
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT NOT NULL,
    vault_type TEXT CHECK (vault_type IN ('creator', 'collector')),
    plan_tier TEXT DEFAULT 'starter' CHECK (plan_tier IN ('starter', 'professional', 'collector', 'enterprise')),
    asset_count INTEGER DEFAULT 0,
    storage_used BIGINT DEFAULT 0, -- in bytes
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    subscription_status TEXT,
    trial_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assets table
CREATE TABLE IF NOT EXISTS public.assets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    year INTEGER,
    medium TEXT,
    dimensions TEXT,
    description TEXT,
    story TEXT,
    image_url TEXT,
    thumbnail_url TEXT,
    file_size BIGINT, -- in bytes
    visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'shared', 'public')),
    
    -- Financial tracking
    purchase_price DECIMAL(12, 2),
    purchase_currency TEXT DEFAULT 'USD',
    current_value DECIMAL(12, 2),
    current_value_currency TEXT DEFAULT 'USD',
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,
    tags TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Provenance records table
CREATE TABLE IF NOT EXISTS public.provenance_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
    event_date DATE NOT NULL,
    event_type TEXT NOT NULL, -- 'created', 'purchased', 'sold', 'exhibited', 'serviced', 'appraised', etc.
    description TEXT,
    location TEXT,
    value DECIMAL(12, 2),
    value_currency TEXT DEFAULT 'USD',
    document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table (certificates, receipts, appraisals, etc.)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    document_type TEXT NOT NULL, -- 'certificate', 'receipt', 'appraisal', 'insurance', 'invoice', etc.
    file_url TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shared galleries table
CREATE TABLE IF NOT EXISTS public.galleries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE,
    visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'password', 'public')),
    password_hash TEXT,
    cover_image_url TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery assets (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.gallery_assets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    gallery_id UUID REFERENCES public.galleries(id) ON DELETE CASCADE NOT NULL,
    asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(gallery_id, asset_id)
);

-- Collaborators table (for team access)
CREATE TABLE IF NOT EXISTS public.collaborators (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    collaborator_email TEXT NOT NULL,
    collaborator_id UUID REFERENCES auth.users(id),
    role TEXT DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    UNIQUE(owner_id, collaborator_email)
);

-- Export logs (track PDF exports for free tier limits)
CREATE TABLE IF NOT EXISTS public.export_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    export_type TEXT NOT NULL, -- 'pdf', 'csv', 'json', etc.
    asset_ids UUID[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_assets_user_id ON public.assets(user_id);
CREATE INDEX IF NOT EXISTS idx_assets_created_at ON public.assets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_provenance_asset_id ON public.provenance_records(asset_id);
CREATE INDEX IF NOT EXISTS idx_documents_asset_id ON public.documents(asset_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_galleries_user_id ON public.galleries(user_id);
CREATE INDEX IF NOT EXISTS idx_galleries_slug ON public.galleries(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_assets_gallery_id ON public.gallery_assets(gallery_id);
CREATE INDEX IF NOT EXISTS idx_collaborators_owner_id ON public.collaborators(owner_id);
CREATE INDEX IF NOT EXISTS idx_export_logs_user_id_created_at ON public.export_logs(user_id, created_at DESC);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Assets policies
CREATE POLICY "Users can view own assets" ON public.assets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assets" ON public.assets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assets" ON public.assets
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assets" ON public.assets
    FOR DELETE USING (auth.uid() = user_id);

-- Public assets can be viewed by anyone
CREATE POLICY "Public assets are viewable by everyone" ON public.assets
    FOR SELECT USING (visibility = 'public');

-- Provenance records policies
CREATE POLICY "Users can view provenance for own assets" ON public.provenance_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.assets
            WHERE assets.id = provenance_records.asset_id
            AND assets.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert provenance for own assets" ON public.provenance_records
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.assets
            WHERE assets.id = provenance_records.asset_id
            AND assets.user_id = auth.uid()
        )
    );

-- Documents policies
CREATE POLICY "Users can view documents for own assets" ON public.documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert documents for own assets" ON public.documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON public.documents
    FOR DELETE USING (auth.uid() = user_id);

-- Galleries policies
CREATE POLICY "Users can view own galleries" ON public.galleries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public galleries are viewable by everyone" ON public.galleries
    FOR SELECT USING (visibility = 'public');

CREATE POLICY "Users can manage own galleries" ON public.galleries
    FOR ALL USING (auth.uid() = user_id);

-- Gallery assets policies
CREATE POLICY "Users can manage assets in own galleries" ON public.gallery_assets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.galleries
            WHERE galleries.id = gallery_assets.gallery_id
            AND galleries.user_id = auth.uid()
        )
    );

-- Collaborators policies
CREATE POLICY "Users can view collaborations where they are owner or collaborator" ON public.collaborators
    FOR SELECT USING (
        auth.uid() = owner_id OR 
        auth.uid() = collaborator_id OR 
        auth.email() = collaborator_email
    );

CREATE POLICY "Owners can manage collaborators" ON public.collaborators
    FOR ALL USING (auth.uid() = owner_id);

-- Export logs policies
CREATE POLICY "Users can view own export logs" ON public.export_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own export logs" ON public.export_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON public.assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_galleries_updated_at BEFORE UPDATE ON public.galleries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update asset count when assets are added/removed
CREATE OR REPLACE FUNCTION update_asset_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.profiles
        SET asset_count = asset_count + 1
        WHERE id = NEW.user_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.profiles
        SET asset_count = asset_count - 1
        WHERE id = OLD.user_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger to automatically update asset count
CREATE TRIGGER update_user_asset_count
    AFTER INSERT OR DELETE ON public.assets
    FOR EACH ROW EXECUTE FUNCTION update_asset_count();

-- Function to check asset limit based on plan tier
CREATE OR REPLACE FUNCTION check_asset_limit()
RETURNS TRIGGER AS $$
DECLARE
    user_plan TEXT;
    user_asset_count INTEGER;
BEGIN
    SELECT plan_tier, asset_count INTO user_plan, user_asset_count
    FROM public.profiles
    WHERE id = NEW.user_id;
    
    IF user_plan = 'starter' AND user_asset_count >= 5 THEN
        RAISE EXCEPTION 'Asset limit reached for starter plan. Please upgrade to add more assets.';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to enforce asset limits
CREATE TRIGGER enforce_asset_limit
    BEFORE INSERT ON public.assets
    FOR EACH ROW EXECUTE FUNCTION check_asset_limit();

-- Storage bucket setup (run these in Supabase dashboard > Storage)
-- You'll need to manually create these buckets in the Supabase dashboard:
-- 1. 'assets' - for asset images
-- 2. 'documents' - for certificates, receipts, etc.
-- 3. 'galleries' - for gallery cover images

-- Storage policies will need to be set up in the Supabase dashboard as well