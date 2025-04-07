import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FolderPlus, 
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  artworks: Artwork[];
  coverImage?: string;
}

interface CollectionsManagerProps {
  collections: Collection[];
  artworks: Artwork[];
  onCreateCollection: (collection: Omit<Collection, 'id'>) => void;
  onUpdateCollection: (id: string, collection: Partial<Collection>) => void;
  onDeleteCollection: (id: string) => void;
  onAddArtworkToCollection: (collectionId: string, artworkId: string) => void;
  onRemoveArtworkFromCollection: (collectionId: string, artworkId: string) => void;
}

export function CollectionsManager({
  collections,
  artworks,
  onCreateCollection,
  onUpdateCollection,
  onDeleteCollection,
  onAddArtworkToCollection,
  onRemoveArtworkFromCollection
}: CollectionsManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newCollection, setNewCollection] = useState({
    title: '',
    description: '',
    artworks: []
  });

  const handleCreateCollection = () => {
    onCreateCollection(newCollection);
    setNewCollection({ title: '', description: '', artworks: [] });
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis Colecciones</h2>
        <Button onClick={() => setIsCreating(true)}>
          <FolderPlus className="h-4 w-4 mr-2" />
          Nueva Colección
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Crear Nueva Colección</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                value={newCollection.title}
                onChange={(e) => setNewCollection(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
                placeholder="Nombre de la colección"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <Textarea
                value={newCollection.description}
                onChange={(e) => setNewCollection(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                placeholder="Describe tu colección"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreateCollection}>
                Crear Colección
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{collection.title}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateCollection(collection.id, {})}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteCollection(collection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {collection.description}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {collection.artworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="relative group"
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-24 object-cover rounded"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onRemoveArtworkFromCollection(collection.id, artwork.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="h-24 flex items-center justify-center"
                  onClick={() => {
                    // Aquí se podría abrir un modal para seleccionar obras
                    const availableArtworks = artworks.filter(
                      artwork => !collection.artworks.some(a => a.id === artwork.id)
                    );
                    if (availableArtworks.length > 0) {
                      onAddArtworkToCollection(collection.id, availableArtworks[0].id);
                    }
                  }}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 