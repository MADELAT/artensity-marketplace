import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileFormData {
  first_name: string;
  last_name: string;
  bio: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  avatar_url?: string;
  bio_pdf_url?: string;
}

export default function NewArtistForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel?: () => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: "",
    last_name: "",
    bio: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
    avatar_url: "",
    bio_pdf_url: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  // Removed success and error state, using toast instead

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSaving(true);

      const { error } = await supabase.from("profiles").insert({
        ...formData,
        role: "artist",
        created_by: user.id,
      });

      if (error) throw error;

      toast({
        title: "Artist profile created successfully",
        variant: "default",
      });
      onSuccess();
    } catch (error) {
      console.error("Error al crear artista:", error);
      toast({ title: "Error creating artist profile", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`avatars/${Date.now()}-${file.name}`, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path);
      setFormData((prev) => ({ ...prev, avatar_url: urlData.publicUrl }));
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("bios")
      .upload(`bios/${Date.now()}-${file.name}`, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage
        .from("bios")
        .getPublicUrl(data.path);
      setFormData((prev) => ({ ...prev, bio_pdf_url: urlData.publicUrl }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar preview and upload */}
      <div className="flex justify-center">
        {avatarPreview || formData.avatar_url ? (
          <img
            src={avatarPreview || formData.avatar_url}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover mb-4 border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-sm text-gray-500 border">
            Sin imagen
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="avatar">Avatar (optional)</Label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="last_name">Last name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          type="url"
          placeholder="https://tuwebsite.com"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            placeholder="@usuario"
          />
        </div>
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            placeholder="@usuario"
          />
        </div>
        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
            placeholder="@usuario"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio_pdf">Biography in PDF (optional)</Label>
        <Input
          id="bio_pdf"
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
        />
      </div>

      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save changes"}
      </Button>
      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="ml-2"
        >
          Cancel
        </Button>
      )}
    </form>
  );
}
