import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import {
  useTeamMembers,
  useCreateTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
  useUploadTeamPhoto,
  TeamMemberDB,
} from "@/hooks/use-team-members";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  LogOut, Plus, Pencil, Trash2, Save, X, Upload, Shield, Key, Users, Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ===== LOGIN ===== */
const AdminLogin = ({ onLogin }: { onLogin: (e: string, p: string) => Promise<void> }) => {
  const [email, setEmail] = useState("admin@simplificateurs.ca");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupDone, setSetupDone] = useState(false);

  const setupAdmin = async () => {
    setLoading(true);
    try {
      const res = await supabase.functions.invoke("setup-admin");
      if (res.error) throw res.error;
      setSetupDone(true);
      toast({ title: "Compte admin créé", description: "Utilisez admin@simplificateurs.ca / admin" });
    } catch {
      // Admin may already exist
      setSetupDone(true);
    }
    setLoading(false);
  };

  useEffect(() => { setupAdmin(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-background rounded-3xl border border-border p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Administration</h1>
            <p className="text-muted-foreground text-sm mt-1">Les Simplificateurs Financiers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Courriel</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={setupDone ? "admin (par défaut)" : ""}
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Se connecter
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          <Link to="/" className="hover:text-foreground transition-colors">← Retour au site</Link>
        </p>
      </motion.div>
    </div>
  );
};

/* ===== MEMBER FORM ===== */
interface MemberFormData {
  slug: string;
  name: string;
  role: string;
  email: string;
  is_leader: boolean;
  description: string;
  phone: string;
  linkedin: string;
  facebook: string;
  display_order: number;
}

const emptyForm: MemberFormData = {
  slug: "", name: "", role: "Conseiller Financier", email: "",
  is_leader: false, description: "", phone: "", linkedin: "", facebook: "",
  display_order: 0,
};

const MemberForm = ({
  initial, onSave, onCancel, isNew,
}: {
  initial: MemberFormData;
  onSave: (data: MemberFormData, photo?: File) => Promise<void>;
  onCancel: () => void;
  isNew: boolean;
}) => {
  const [form, setForm] = useState<MemberFormData>(initial);
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof MemberFormData, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form, photo || undefined);
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="bg-background border border-border rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        {isNew ? <Plus className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
        {isNew ? "Nouveau conseiller" : `Modifier ${initial.name}`}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Nom complet *</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} required
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Identifiant (slug) *</label>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} required
            placeholder="prenom-nom"
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Rôle *</label>
          <select value={form.role} onChange={(e) => set("role", e.target.value)}
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm">
            <option>Conseiller Financier</option>
            <option>Conseillère Financière</option>
            <option>Conseiller Senior</option>
            <option>Conseillère Senior</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Courriel *</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Téléphone</label>
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">LinkedIn</label>
          <input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)}
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Facebook</label>
          <input value={form.facebook} onChange={(e) => set("facebook", e.target.value)}
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Ordre d'affichage</label>
          <input type="number" value={form.display_order} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3}
          className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm resize-none" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.is_leader} onChange={(e) => set("is_leader", e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
          <span className="text-sm text-foreground">Conseiller Senior (leader)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
          <Upload className="w-4 h-4" />
          <span>Photo</span>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="hidden" />
          {photo && <span className="text-xs text-muted-foreground">{photo.name}</span>}
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isNew ? "Créer" : "Enregistrer"}
        </button>
        <button type="button" onClick={onCancel}
          className="px-6 py-2.5 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-all flex items-center gap-2">
          <X className="w-4 h-4" /> Annuler
        </button>
      </div>
    </motion.form>
  );
};

/* ===== DASHBOARD ===== */
const AdminDashboard = () => {
  const { logout, changePassword, user } = useAdminAuth();
  const { data: members, isLoading } = useTeamMembers();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();
  const uploadPhoto = useUploadTeamPhoto();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPw, setChangingPw] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCreate = async (data: MemberFormData, photo?: File) => {
    let photo_url: string | null = null;
    if (photo) {
      photo_url = await uploadPhoto.mutateAsync({ file: photo, slug: data.slug });
    }
    await createMember.mutateAsync({ ...data, photo_url });
    setShowCreate(false);
    toast({ title: "Conseiller ajouté" });
  };

  const handleUpdate = async (id: string, data: MemberFormData, photo?: File) => {
    // Close form immediately for snappy UX
    setEditingId(null);
    
    // Start text update immediately (optimistic)
    const textUpdate = updateMember.mutateAsync({ id, ...data });
    
    if (photo) {
      // Upload photo in parallel, then patch photo_url
      uploadPhoto.mutateAsync({ file: photo, slug: data.slug }).then((photo_url) => {
        updateMember.mutate({ id, photo_url });
      }).catch((err) => {
        toast({ title: "Erreur photo", description: err.message, variant: "destructive" });
      });
    }
    
    await textUpdate;
    toast({ title: "Conseiller modifié" });
  };

  const handleDelete = async (id: string) => {
    await deleteMember.mutateAsync(id);
    setDeleteConfirm(null);
    toast({ title: "Conseiller supprimé" });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Les mots de passe ne correspondent pas", variant: "destructive" });
      return;
    }
    if (newPassword.length < 4) {
      toast({ title: "Le mot de passe doit contenir au moins 4 caractères", variant: "destructive" });
      return;
    }
    setChangingPw(true);
    try {
      await changePassword(newPassword);
      toast({ title: "Mot de passe modifié avec succès" });
      setShowPasswordForm(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
    setChangingPw(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Administration</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Voir le site
            </Link>
            <button onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              title="Changer le mot de passe">
              <Key className="w-5 h-5" />
            </button>
            <button onClick={logout}
              className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              title="Déconnexion">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Change Password */}
        <AnimatePresence>
          {showPasswordForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleChangePassword}
              className="bg-background border border-border rounded-2xl p-6 mb-6 space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Key className="w-5 h-5" /> Changer le mot de passe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nouveau mot de passe</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    required className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Confirmer</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    required className="w-full px-3 py-2.5 bg-secondary rounded-xl text-foreground border border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-sm" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={changingPw}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
                  {changingPw ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Enregistrer
                </button>
                <button type="button" onClick={() => setShowPasswordForm(false)}
                  className="px-6 py-2.5 bg-secondary text-foreground rounded-xl text-sm">Annuler</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Team Members */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" /> Équipe ({members?.length || 0})
          </h2>
          <button onClick={() => { setShowCreate(true); setEditingId(null); }}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        {/* Create Form */}
        <AnimatePresence>
          {showCreate && (
            <div className="mb-6">
              <MemberForm initial={emptyForm} onSave={handleCreate} onCancel={() => setShowCreate(false)} isNew />
            </div>
          )}
        </AnimatePresence>

        {/* Members List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-3">
            {members?.map((member) => (
              <div key={member.id}>
                <AnimatePresence>
                  {editingId === member.id ? (
                    <MemberForm
                      initial={{
                        slug: member.slug, name: member.name, role: member.role, email: member.email,
                        is_leader: member.is_leader, description: member.description || "",
                        phone: member.phone || "", linkedin: member.linkedin || "", facebook: member.facebook || "",
                        display_order: member.display_order,
                      }}
                      onSave={(data, photo) => handleUpdate(member.id, data, photo)}
                      onCancel={() => setEditingId(null)}
                      isNew={false}
                    />
                  ) : (
                    <motion.div layout className="bg-background border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/30 transition-all">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        {member.photo_url ? (
                          <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground text-sm truncate">{member.name}</h4>
                          {member.is_leader && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">Senior</span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs truncate">{member.email}</p>
                      </div>

                      {/* Order */}
                      <span className="text-xs text-muted-foreground hidden sm:block">#{member.display_order}</span>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setEditingId(member.id); setShowCreate(false); }}
                          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === member.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(member.id)}
                              className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-lg text-xs font-medium">
                              Confirmer
                            </button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs">
                              Non
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(member.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

/* ===== MAIN ===== */
const Admin = () => {
  const { isAdmin, loading, login } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminDashboard />;
};

export default Admin;
