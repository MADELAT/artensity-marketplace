import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const artCategories = [
  "Painting", "Sculpture", "Photography", "Drawing", "Engraving", "Printmaking",
  "Digital art", "Collage", "Conceptual art", "Textile art", "Installation",
  "Art object", "Video art", "Other",
];

const artStyles = [
  "Abstract", "Minimalism", "Conceptual", "Expressionism", "Figurative",
  "Surrealism", "Pop Art", "Realism", "Geometric", "HyperRealism",
  "Street Art", "Other",
];

const artTechniques = [
  "Oil", "Acrylic", "Watercolor", "Mixed Media", "Gouache", "Encaustic", "Ink",
  "Graphite / Pencil", "Charcoal", "Digital Painting", "Resin", "Collage",
  "Serigraphy", "Silver & gelatin", "Carving", "Casting", "Other",
];

export function ArtworkUploadForm() {
  const [title, setTitle] = useState("");
  const [series, setSeries] = useState("");
  const [description, setDescription] = useState("");
  const [technique, setTechnique] = useState("");
  const [widthCm, setWidthCm] = useState<number | "">("");
  const [heightCm, setHeightCm] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { user, profile } = useAuth();
  const [availableTags, setAvailableTags] = useState<{ id: number; name: string }[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const isGallery = profile?.role === "gallery";

  useEffect(() => {
    supabase.from("tags").select("id, name").order("name").then(({ data }) => {
      if (data) setAvailableTags(data);
    });
  }, []);

  useEffect(() => {
    if (!isGallery || !user?.id) return;
    supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .eq("role", "artist")
      .eq("created_by", user.id)
      .then(({ data }) => data && setArtists(data));
  }, [isGallery, user?.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const f = e.target.files[0];
    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreviewUrl(r.result as string);
    r.readAsDataURL(f);
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to upload artworks");
    if (!title || !price || !file)
      return toast.error("Please complete title, price and image");
    if (isGallery && !selectedArtist)
      return toast.error("Please select an artist");

    setIsUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("artworks")
        .upload(fileName, file);
      if (upErr) throw new Error(upErr.message);

      const { data: urlData } = supabase.storage
        .from("artworks")
        .getPublicUrl(fileName);
      const imageUrl = urlData.publicUrl;

      const { error: dbErr } = await supabase.from("pending_artworks").insert({
        title,
        series,
        description,
        technique,
        width_cm: widthCm || null,
        height_cm: heightCm || null,
        year: year || null,
        price: price || 0,
        category,
        style,
        image_url: imageUrl,
        artist_id: isGallery ? selectedArtist : user.id,
        status: "pending",
      });
      if (dbErr) throw new Error(dbErr.message);

      const { data: inserted } = await supabase
        .from("pending_artworks")
        .select("id")
        .eq("artist_id", isGallery ? selectedArtist : user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (inserted && selectedTagIds.length) {
        const rel = selectedTagIds.map((tagId) => ({
          artwork_id: inserted.id,
          tag_id: tagId,
        }));
        await supabase.from("artwork_tags").insert(rel);
      }

      toast.success("¡Artwork successfully sent!", {
        description: "Your artwork has been sent and is pending approval.",
      });

      setTitle("");
      setSeries("");
      setDescription("");
      setTechnique("");
      setWidthCm("");
      setHeightCm("");
      setYear("");
      setPrice("");
      setCategory("");
      setStyle("");
      setFile(null);
      setPreviewUrl(null);
      setSelectedTagIds([]);
      setSelectedArtist(null);
    } catch (err: any) {
      console.error(err);
      toast.error("Error al subir la obra", { description: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Upload a new artwork</h3>
          <p className="text-sm text-muted-foreground">
            Complete the form to send your artwork for approval
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="image">Artwork image *</Label>
            <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
              {previewUrl ? (
                <div className="relative w-full">
                  <img src={previewUrl} alt="Preview" className="rounded-md max-h-64 mx-auto" />
                  <Button type="button" size="icon" variant="destructive" className="absolute right-2 top-2" onClick={clearImage}>
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer w-full h-40">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to select an image</span>
                </label>
              )}
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          </div>

          {isGallery && (
            <div className="space-y-2">
              <Label htmlFor="artist">Select an artist *</Label>
              <Select value={selectedArtist || ""} onValueChange={setSelectedArtist}>
                <SelectTrigger id="artist">
                  <SelectValue placeholder="Select an artist" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.first_name} {a.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="series">Series</Label>
            <Input id="series" value={series} onChange={(e) => setSeries(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (€) *</Label>
            <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technique">Technique</Label>
            <Select value={technique} onValueChange={setTechnique}>
              <SelectTrigger id="technique"><SelectValue placeholder="Select a technique" /></SelectTrigger>
              <SelectContent>
                {artTechniques.map((tech) => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {artCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Style + Dimensions + Year */}
          <div className="col-span-2 flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 w-full sm:w-1/2">
              <Label htmlFor="style">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style"><SelectValue placeholder="Select a style" /></SelectTrigger>
                <SelectContent>
                  {artStyles.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4 w-full sm:w-1/2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="width_cm">Width (cm)</Label>
                <Input id="width_cm" type="number" min="0" value={widthCm} onChange={(e) => setWidthCm(e.target.value ? parseFloat(e.target.value) : "")} />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="height_cm">Height (cm)</Label>
                <Input id="height_cm" type="number" min="0" value={heightCm} onChange={(e) => setHeightCm(e.target.value ? parseFloat(e.target.value) : "")} />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" min="1900" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : "")} />
              </div>
            </div>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your artwork, inspiration, context..." />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="tags">Tags</Label>
            <ScrollArea className="h-24 rounded-md border p-2">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    onClick={() =>
                      setSelectedTagIds((prev) =>
                        prev.includes(tag.id)
                          ? prev.filter((id) => id !== tag.id)
                          : [...prev, tag.id]
                      )
                    }
                    className={`cursor-pointer ${
                      selectedTagIds.includes(tag.id)
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
            <p className="text-xs text-muted-foreground">Click on the tags to select them.</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isUploading} className="w-full sm:w-auto">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload artwork"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
