import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      return !!data;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    // 1. Get initial session — this is the primary source of truth
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const admin = await checkAdmin(currentUser.id);
        if (!cancelled) setIsAdmin(admin);
      }
      if (!cancelled) setLoading(false);
    });

    // 2. Listen for changes (sign-in, sign-out, token refresh)
    //    CRITICAL: Never await async calls inside onAuthStateChange — causes deadlock
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (cancelled) return;
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // Defer async check outside callback to avoid deadlock
          setTimeout(async () => {
            if (cancelled) return;
            const admin = await checkAdmin(currentUser.id);
            if (!cancelled) setIsAdmin(admin);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [checkAdmin]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    setIsAdmin(false);
    setUser(null);
    await supabase.auth.signOut();
  };

  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  return { user, isAdmin, loading, login, logout, changePassword };
}
