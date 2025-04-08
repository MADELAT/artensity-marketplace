import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { User2 } from 'lucide-react';

interface ArtistAvatarProps {
  avatarUrl?: string;
  userId?: string;
  onAvatarUpdate?: (url: string) => void;
}

export function ArtistAvatar({ avatarUrl, userId, onAvatarUpdate }: ArtistAvatarProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id);

      onAvatarUpdate?.(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback>
          <User2 className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
      <Button
        variant="outline"
        size="sm"
        className="relative"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Change Avatar'}
        <input
          type="file"
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </Button>
    </div>
  );
} 