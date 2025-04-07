import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare,
  Star,
  CheckCircle2,
  XCircle,
  Send,
  Filter,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Inquiry {
  id: string;
  buyerName: string;
  artworkTitle: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  isImportant: boolean;
  timestamp: Date;
  artworkId: string;
}

const quickResponses = [
  "Gracias por tu interés en mi obra. ¿Te gustaría saber más detalles?",
  "La obra está disponible. ¿Te gustaría concertar una visita?",
  "Gracias por tu mensaje. Te responderé con más información pronto.",
  "La obra está reservada actualmente, pero puedo notificarte si se libera."
];

export function InquiryCenter() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [response, setResponse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'responded' | 'closed'>('all');

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.artworkTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleQuickResponse = (response: string) => {
    setResponse(response);
  };

  const handleSendResponse = async () => {
    if (!selectedInquiry || !response.trim()) return;

    try {
      const { error } = await supabase
        .from('inquiry_responses')
        .insert({
          inquiry_id: selectedInquiry.id,
          artist_id: user?.id,
          message: response,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      // Actualizar estado de la consulta
      const { error: updateError } = await supabase
        .from('inquiries')
        .update({ status: 'responded' })
        .eq('id', selectedInquiry.id);

      if (updateError) throw updateError;

      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === selectedInquiry.id 
          ? { ...inquiry, status: 'responded' }
          : inquiry
      ));

      setResponse('');
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  const handleMarkImportant = async (inquiryId: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ is_important: true })
        .eq('id', inquiryId);

      if (error) throw error;

      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, isImportant: true }
          : inquiry
      ));
    } catch (error) {
      console.error('Error marking inquiry as important:', error);
    }
  };

  const handleCloseInquiry = async (inquiryId: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: 'closed' })
        .eq('id', inquiryId);

      if (error) throw error;

      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: 'closed' }
          : inquiry
      ));
    } catch (error) {
      console.error('Error closing inquiry:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de consultas */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Consultas</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredInquiries.map(inquiry => (
            <div
              key={inquiry.id}
              className={cn(
                "p-4 rounded-lg border cursor-pointer transition-colors",
                selectedInquiry?.id === inquiry.id ? "bg-primary/5" : "hover:bg-muted"
              )}
              onClick={() => setSelectedInquiry(inquiry)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{inquiry.buyerName}</h3>
                  <p className="text-sm text-muted-foreground">{inquiry.artworkTitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  {inquiry.isImportant && (
                    <Star className="h-4 w-4 text-yellow-500" />
                  )}
                  {inquiry.status === 'new' && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
              <p className="text-sm mt-2 line-clamp-2">{inquiry.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(inquiry.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Panel de conversación */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {selectedInquiry ? `Conversación con ${selectedInquiry.buyerName}` : 'Selecciona una consulta'}
            </CardTitle>
            {selectedInquiry && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMarkImportant(selectedInquiry.id)}
                >
                  <Star className={cn(
                    "h-4 w-4",
                    selectedInquiry.isImportant && "text-yellow-500 fill-yellow-500"
                  )} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCloseInquiry(selectedInquiry.id)}
                >
                  {selectedInquiry.status === 'closed' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedInquiry ? (
            <>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm">{selectedInquiry.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(selectedInquiry.timestamp).toLocaleString()}
                  </p>
                </div>
                {/* Aquí irían los mensajes de respuesta */}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((quickResponse, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickResponse(quickResponse)}
                    >
                      {quickResponse}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Escribe tu respuesta..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                  />
                  <Button
                    className="w-full"
                    onClick={handleSendResponse}
                    disabled={!response.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Respuesta
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mb-2" />
              <p>Selecciona una consulta para ver la conversación</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 