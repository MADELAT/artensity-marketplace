import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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

export function ArtworkUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technique, setTechnique] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user, profile } = useAuth();
  const [availableTags, setAvailableTags] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const isGallery = profile?.role === "gallery";

  useEffect(() => {
    async function fetchTags() {
      const { data, error } = await supabase
        .from("tags")
        .select("id, name")
        .order("name");

      if (!error && data) {
        setAvailableTags(data);
      }
    }

    fetchTags();
  }, []);

  useEffect(() => {
    if (!isGallery || !user?.id) return;

    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .eq("role", "artist")
        .eq("created_by", user.id);

      if (!error && data) {
        setArtists(data);
      }
    };

    fetchArtists();
  }, [isGallery, user?.id]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Clear selected image
  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debes iniciar sesión para subir obras");
      return;
    }

    if (!title || !price || !file) {
      toast.error(
        "Por favor completa los campos requeridos (título, precio e imagen)"
      );
      return;
    }

    if (isGallery && !selectedArtist) {
      toast.error("Por favor selecciona un artista para asignar la obra");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload the image to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Validate bucket exists before upload
      const { data: buckets } = await supabase.storage.listBuckets();
      console.log("Available buckets:", buckets);

      // Check if artworks bucket exists
      if (!buckets?.some((bucket) => bucket.name === "artworks")) {
        throw new Error(
          "El bucket 'artworks' no existe. Por favor contacta al administrador."
        );
      }

      // Upload to the artworks bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("artworks")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(`Error al subir la imagen: ${uploadError.message}`);
      }

      // 2. Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("artworks")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // 3. Save the artwork data to the pending_artworks table
      const { error: dbError } = await supabase
        .from("pending_artworks")
        .insert({
          title,
          description,
          technique,
          dimensions,
          year: year || null,
          price: price || 0,
          category,
          style,
          image_url: imageUrl,
          artist_id: isGallery ? selectedArtist : user.id,
          status: "pending",
        });

      const { data: insertedArtwork, error: selectError } = await supabase
        .from("pending_artworks")
        .select("id")
        .eq("artist_id", isGallery ? selectedArtist : user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (insertedArtwork && selectedTagIds.length > 0) {
        const artworkId = insertedArtwork.id;
        const tagRelations = selectedTagIds.map((tagId) => ({
          artwork_id: artworkId,
          tag_id: tagId,
        }));

        const { error: tagsInsertError } = await supabase
          .from("artwork_tags")
          .insert(tagRelations);

        if (tagsInsertError) {
          console.error("Error al asignar etiquetas:", tagsInsertError);
        }
      }

      if (dbError) {
        throw new Error(`Error al guardar la obra: ${dbError.message}`);
      }

      // Success!
      toast.success("¡Obra enviada con éxito!", {
        description: "Tu obra ha sido enviada y está pendiente de aprobación.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setTechnique("");
      setDimensions("");
      setYear("");
      setPrice("");
      setCategory("");
      setStyle("");
      setFile(null);
      setPreviewUrl(null);
      setSelectedTagIds([]);
      setSelectedArtist(null);
    } catch (error: any) {
      console.error("Error uploading artwork:", error);
      toast.error("Error al subir la obra", {
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const artCategories = [
    "Pintura",
    "Escultura",
    "Fotografía",
    "Dibujo",
    "Grabado",
    "Arte digital",
    "Arte conceptual",
    "Instalación",
    "Arte objeto",
  ];

  const artStyles = [
    "Abstracto",
    "Realismo",
    "Impresionismo",
    "Expresionismo",
    "Surrealismo",
    "Minimalismo",
    "Pop Art",
    "Arte conceptual",
  ];

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Sube una nueva obra</h3>
          <p className="text-sm text-muted-foreground">
            Completa el formulario para enviar tu obra para aprobación
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Image upload */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="image">Imagen de la obra *</Label>
            <div className="border-2 border-dashed rounded-md p-4 flex items-center justify-center flex-col">
              {previewUrl ? (
                <div className="relative w-full">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-md max-h-64 mx-auto"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute right-2 top-2"
                    onClick={clearImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer w-full h-40"
                >
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Haz clic para seleccionar una imagen
                  </span>
                </label>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Formatos aceptados: JPG, PNG, WEBP. Máximo 5MB.
            </p>
          </div>

          {isGallery && (
            <div className="space-y-2">
              <Label htmlFor="artist">Selecciona un artista *</Label>
              <Select
                onValueChange={(val) => setSelectedArtist(val)}
                value={selectedArtist || ""}
              >
                <SelectTrigger id="artist">
                  <SelectValue placeholder="Elige un artista" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((artist) => (
                    <SelectItem key={artist.id} value={artist.id}>
                      {artist.first_name} {artist.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Title & Price */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio (€) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value ? parseFloat(e.target.value) : "")
              }
              required
            />
          </div>

          {/* Technique & Dimensions */}
          <div className="space-y-2">
            <Label htmlFor="technique">Técnica</Label>
            <Input
              id="technique"
              value={technique}
              onChange={(e) => setTechnique(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensiones</Label>
            <Input
              id="dimensions"
              placeholder="Ej: 50x70cm"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
          </div>

          {/* Category & Style */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                {artCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Estilo</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue placeholder="Seleccione un estilo" />
              </SelectTrigger>
              <SelectContent>
                {artStyles.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Año</Label>
            <Input
              id="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={year}
              onChange={(e) =>
                setYear(e.target.value ? parseInt(e.target.value) : "")
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu obra, inspiración, contexto..."
            />
          </div>

          {/* Tags */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="tags">Etiquetas</Label>
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
            <p className="text-xs text-muted-foreground">
              Haz clic en las etiquetas para seleccionarlas.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isUploading}
            className="w-full sm:w-auto"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...
              </>
            ) : (
              "Subir obra"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
