import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { IconInput } from './IconInput';
import { 
  User, 
  Mail, 
  Globe, 
  Instagram, 
  Facebook, 
  Twitter,
  Bell,
  Lock
} from 'lucide-react';

interface ArtistSettingsProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    avatarUrl?: string;
    bannerUrl?: string;
  };
  onSave: (data: any) => void;
}

export function ArtistSettings({ profile, onSave }: ArtistSettingsProps) {
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    bio: profile.bio,
    website: profile.website || '',
    instagram: profile.instagram || '',
    facebook: profile.facebook || '',
    twitter: profile.twitter || '',
    notifications: {
      newInquiries: true,
      sales: true,
      comments: true,
      newsletter: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key: keyof typeof formData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Información Personal */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <IconInput
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                icon={<User className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <IconInput
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <IconInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={<Mail className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Redes Sociales */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Sitio Web</Label>
            <IconInput
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              icon={<Globe className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <IconInput
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              icon={<Instagram className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <IconInput
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
              icon={<Facebook className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <IconInput
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              icon={<Twitter className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Nuevas Consultas</Label>
              <p className="text-sm text-muted-foreground">
                Recibir notificaciones de nuevas consultas
              </p>
            </div>
            <Switch
              checked={formData.notifications.newInquiries}
              onCheckedChange={() => handleNotificationToggle('newInquiries')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ventas</Label>
              <p className="text-sm text-muted-foreground">
                Notificaciones de nuevas ventas
              </p>
            </div>
            <Switch
              checked={formData.notifications.sales}
              onCheckedChange={() => handleNotificationToggle('sales')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Comentarios</Label>
              <p className="text-sm text-muted-foreground">
                Notificaciones de nuevos comentarios
              </p>
            </div>
            <Switch
              checked={formData.notifications.comments}
              onCheckedChange={() => handleNotificationToggle('comments')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Newsletter</Label>
              <p className="text-sm text-muted-foreground">
                Recibir novedades y actualizaciones
              </p>
            </div>
            <Switch
              checked={formData.notifications.newsletter}
              onCheckedChange={() => handleNotificationToggle('newsletter')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card>
        <CardHeader>
          <CardTitle>Seguridad</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            Cambiar Contraseña
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => onSave(formData)}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
} 