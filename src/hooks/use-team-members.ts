import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMemberDB {
  id: string;
  slug: string;
  name: string;
  role: string;
  email: string;
  photo_url: string | null;
  is_leader: boolean;
  description: string | null;
  phone: string | null;
  linkedin: string | null;
  facebook: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as TeamMemberDB[];
    },
  });
}

export function useTeamMemberBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["team-member", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as TeamMemberDB | null;
    },
    enabled: !!slug,
  });
}

export function useCreateTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: Omit<TeamMemberDB, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("team_members")
        .insert(member)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team-members"] }),
  });
}

export function useUpdateTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TeamMemberDB> & { id: string }) => {
      const { data, error } = await supabase
        .from("team_members")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team-members"] }),
  });
}

export function useDeleteTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team-members"] }),
  });
}

export function useUploadTeamPhoto() {
  return useMutation({
    mutationFn: async ({ file, slug }: { file: File; slug: string }) => {
      const ext = file.name.split(".").pop();
      const path = `${slug}.${ext}`;
      
      // Try to remove old file (ignore errors if it doesn't exist)
      try {
        await supabase.storage.from("team-photos").remove([path]);
      } catch {
        // File may not exist, that's fine
      }
      
      const { error } = await supabase.storage
        .from("team-photos")
        .upload(path, file, { upsert: true });
      if (error) throw new Error(`Upload échoué: ${error.message}`);

      const { data: urlData } = supabase.storage
        .from("team-photos")
        .getPublicUrl(path);

      // Add cache-busting param to force refresh
      return `${urlData.publicUrl}?t=${Date.now()}`;
    },
  });
}
