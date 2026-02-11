
-- 1. Create role enum and user_roles table FIRST
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. Create has_role function BEFORE any policies reference it
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. RLS on user_roles
CREATE POLICY "Admins can view roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  photo_url TEXT,
  is_leader BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  phone TEXT,
  linkedin TEXT,
  facebook TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
ON public.team_members FOR SELECT
USING (true);

CREATE POLICY "Admins can insert team members"
ON public.team_members FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update team members"
ON public.team_members FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete team members"
ON public.team_members FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 5. Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Seed team data
INSERT INTO public.team_members (slug, name, role, email, is_leader, description, linkedin, display_order) VALUES
('abdelbari-nasri', 'Abdelbari Nasri', 'Conseiller Senior', 'abdelbari.nasri@agc.ia.ca', true, 'Expert en planification financière avec plus de 10 ans d''expérience dans l''accompagnement des particuliers et des entreprises vers l''atteinte de leurs objectifs financiers.', 'https://linkedin.com/in/abdelbari-nasri', 1),
('hela-taghouti', 'Hela Taghouti', 'Conseillère Senior', 'hela.taghouti@agc.ia.ca', true, 'Spécialiste en assurance et protection du patrimoine, passionnée par l''éducation financière et l''accompagnement personnalisé de chaque client.', 'https://linkedin.com/in/hela-taghouti', 2),
('amelie-bolduc', 'Amélie Bolduc', 'Conseillère Senior', 'amelie.bolduc@agc.ia.ca', true, 'Conseillère dévouée avec une approche humaine et stratégique, elle aide ses clients à naviguer dans le monde complexe des finances personnelles.', 'https://linkedin.com/in/amelie-bolduc', 3),
('sofiane-lemanaa', 'Sofiane Lemanaa', 'Conseiller Financier', 'sofiane.lemanaa@agc.ia.ca', false, 'Conseiller dévoué à simplifier la gestion financière de ses clients avec des solutions adaptées à leurs besoins.', NULL, 4),
('maryam-benlimam', 'Maryam Benlimam', 'Conseillère Financière', 'maryam.benlimam@agc.ia.ca', false, 'Passionnée par l''accompagnement client et la planification financière personnalisée.', NULL, 5),
('dalel-djeffel', 'Dalel Djeffel', 'Conseillère Financière', 'dalel.djeffel@agc.ia.ca', false, 'Experte dans l''élaboration de stratégies financières sur mesure pour une sécurité à long terme.', NULL, 6),
('jonathan-lemay', 'Jonathan Lemay', 'Conseiller Financier', 'jonathan.lemay@agc.ia.ca', false, 'Conseiller dynamique offrant des solutions innovantes pour atteindre vos objectifs financiers.', NULL, 7),
('valerie-boisvert', 'Valérie Boisvert', 'Conseillère Financière', 'valerie.boisvert@agc.ia.ca', false, 'Spécialisée dans l''accompagnement des familles vers une meilleure santé financière.', NULL, 8),
('mamadou-seck', 'Mamadou Seck', 'Conseiller Financier', 'mamadou.seck@agc.ia.ca', false, 'Conseiller financier expérimenté, spécialisé dans l''accompagnement personnalisé des clients.', NULL, 9),
('thouraya-saghrouni', 'Thouraya Saghrouni', 'Conseillère Financière', 'thouraya.saghouni@agc.ia.ca', false, 'Dédiée à aider ses clients à bâtir un avenir financier solide et serein.', NULL, 10);
