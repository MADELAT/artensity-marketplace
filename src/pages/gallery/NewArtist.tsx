import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileText, Check } from "lucide-react";

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

export default function NewArtist() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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

  // No prefill/fetch profile for new artist creation
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || !e.target.files[0]) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setSuccess("Avatar updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setError("Error uploading avatar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBioPdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || !e.target.files[0]) return;

    try {
      setIsUploadingPdf(true);
      setError(null);
      setSuccess(null);

      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setError("The file must be a PDF");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("The file must not exceed 5MB");
        return;
      }

      const fileName = `${user.id}-${Date.now()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("bios")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("bios").getPublicUrl(fileName);

      setFormData((prev) => ({
        ...prev,
        bio_pdf_url: publicUrl,
      }));

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ bio_pdf_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setSuccess("Biography PDF updated successfully");
    } catch (error) {
      console.error("Error uploading bio PDF:", error);
      setError("Error uploading bio PDF");
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const { error } = await supabase.from("profiles").insert({
        first_name: formData.first_name,
        last_name: formData.last_name,
        bio: formData.bio,
        website: formData.website,
        instagram: formData.instagram,
        facebook: formData.facebook,
        twitter: formData.twitter,
        avatar_url: formData.avatar_url,
        bio_pdf_url: formData.bio_pdf_url,
        role: "artist",
        created_by: user.id,
      });

      if (error) throw error;

      setSuccess("Artist profile created successfully");
    } catch (error) {
      console.error("Error creating artist profile:", error);
      setError("Error creating artist profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Artist profile configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {formData.avatar_url ? (
                  <img
                    src={formData.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </div>
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
              <Label htmlFor="bio_pdf">Biography in PDF</Label>
              <Input
                id="bio_pdf"
                type="file"
                accept=".pdf"
                onChange={handleBioPdfUpload}
              />
              {formData.bio_pdf_url && (
                <a
                  href={formData.bio_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View biography PDF
                </a>
              )}
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

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
