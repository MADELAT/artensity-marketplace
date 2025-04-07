import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Lightbulb } from 'lucide-react';

const artisticPhrases = [
  "El arte es la expresión más pura de la libertad",
  "Cada pincelada cuenta una historia",
  "La creatividad no tiene límites",
  "El arte es el lenguaje universal del alma"
];

const artisticTips = [
  "Experimenta con nuevas técnicas cada semana",
  "Mantén un diario de bocetos siempre contigo",
  "La luz natural es tu mejor aliada",
  "No temas equivocarte, cada error es una oportunidad"
];

export function ArtistWelcome() {
  const randomPhrase = artisticPhrases[Math.floor(Math.random() * artisticPhrases.length)];
  const randomTip = artisticTips[Math.floor(Math.random() * artisticTips.length)];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Frase del día</h3>
              <p className="text-muted-foreground italic">"{randomPhrase}"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Consejo artístico</h3>
              <p className="text-muted-foreground">{randomTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 