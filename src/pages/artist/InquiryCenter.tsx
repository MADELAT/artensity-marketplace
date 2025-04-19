import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface Inquiry {
  id: string;
  content: string;
  sender_id: string;
  artwork_id: string;
  created_at: string;
  is_read: boolean;
  artwork: {
    id: string;
    title: string;
    image_url: string;
  };
  sender: {
    id: string;
    full_name: string;
    email: string;
  };
}

export function InquiryCenter() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchInquiries = async () => {
      try {
        const { data, error } = await supabase
          .from("inquiries")
          .select(
            `
            *,
            artwork:artworks(id, title, image_url),
            sender:profiles(id, full_name, email)
          `
          )
          .eq("artist_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setInquiries(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching inquiries"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user]);

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.sender.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-gray-500 p-4">
        Aún no has recibido consultas de coleccionistas.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{inquiry.artwork.title}</h3>
                <p className="text-sm text-gray-500">
                  From: {inquiry.sender.full_name}
                </p>
              </div>
              {!inquiry.is_read && (
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </div>
            <p className="text-sm">{inquiry.content}</p>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  (window.location.href = `mailto:${inquiry.sender.email}`)
                }
              >
                Reply
              </Button>
              <span className="text-xs text-gray-500">
                {new Date(inquiry.created_at).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center text-gray-500 p-8">No inquiries found</div>
      )}
    </div>
  );
}
