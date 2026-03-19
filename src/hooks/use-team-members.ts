import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { teamMembers as staticTeamMembers } from "@/lib/team-data";

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

// Static fallback data derived from team-data.ts for when DB is unreachable
const fallbackMembers: TeamMemberDB[] = staticTeamMembers.map((m, i) => ({
  id: m.id,
  slug: m.id,
  name: m.name,
  role: m.role,
  email: m.email,
  photo_url: m.photo || null,
  is_leader: m.isLeader || false,
  description: m.description || null,
  phone: m.phone || null,
  linkedin: m.linkedin || null,
  facebook: m.facebook || null,
  display_order: i + 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

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
    // If all retries fail, return cached/fallback data
    placeholderData: fallbackMembers,
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
    placeholderData: () => fallbackMembers.find((m) => m.slug === slug) || null,
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
    onMutate: async ({ id, ...updates }) => {
      await qc.cancelQueries({ queryKey: ["team-members"] });
      const previous = qc.getQueryData<TeamMemberDB[]>(["team-members"]);
      qc.setQueryData<TeamMemberDB[]>(["team-members"], (old) =>
        old?.map((m) => (m.id === id ? { ...m, ...updates, updated_at: new Date().toISOString() } : m))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(["team-members"], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["team-members"] }),
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
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["team-members"] });
      const previous = qc.getQueryData<TeamMemberDB[]>(["team-members"]);
      qc.setQueryData<TeamMemberDB[]>(["team-members"], (old) =>
        old?.filter((m) => m.id !== id)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(["team-members"], context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["team-members"] }),
  });
}

export function useUploadTeamPhoto() {
  return useMutation({
    mutationFn: async ({ file, slug }: { file: File; slug: string }) => {
      const ext = file.name.split(".").pop();
      const path = `${slug}.${ext}`;
      
      try {
        await supabase.storage.from("team-photos").remove([path]);
      } catch {
        // File may not exist
      }
      
      const { error } = await supabase.storage
        .from("team-photos")
        .upload(path, file, { upsert: true });
      if (error) throw new Error(`Upload échoué: ${error.message}`);

      const { data: urlData } = supabase.storage
        .from("team-photos")
        .getPublicUrl(path);

      return `${urlData.publicUrl}?t=${Date.now()}`;
    },
  });
}
