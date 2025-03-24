
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from "@/components/ui/textarea";

export default function ArtworkApproval() {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState('');
  const [pendingArtworks] = useState([
    { 
      id: '1', 
      title: 'Abstract Harmony', 
      artist: 'Jane Smith', 
      price: 1200, 
      category: 'Painting',
      submittedDate: '2023-06-15',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: '2', 
      title: 'Urban Reflections', 
      artist: 'Michael Chen', 
      price: 850, 
      category: 'Photography',
      submittedDate: '2023-06-18',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=300&q=80'
    },
  ]);

  const handleApprove = (id: string) => {
    // Call Supabase to approve artwork
    toast({
      title: "Artwork Approved",
      description: `Artwork ID ${id} has been approved and listed`,
      variant: "default",
    });
  };

  const handleReject = (id: string) => {
    if (!rejectReason) {
      toast({
        title: "Rejection Failed",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }
    
    // Call Supabase to reject artwork
    toast({
      title: "Artwork Rejected",
      description: `Artwork ID ${id} has been rejected`,
      variant: "default",
    });
    setRejectReason('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Artwork Approval</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingArtworks.map((artwork) => (
              <TableRow key={artwork.id}>
                <TableCell>
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{artwork.title}</TableCell>
                <TableCell>{artwork.artist}</TableCell>
                <TableCell>${artwork.price}</TableCell>
                <TableCell>{artwork.category}</TableCell>
                <TableCell>{artwork.submittedDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader>
                          <DialogTitle>{artwork.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="aspect-square relative">
                            <img 
                              src={artwork.image} 
                              alt={artwork.title} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Artist</p>
                              <p className="text-sm">{artwork.artist}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Price</p>
                              <p className="text-sm">${artwork.price}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Category</p>
                              <p className="text-sm">{artwork.category}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Submitted</p>
                              <p className="text-sm">{artwork.submittedDate}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Admin Comment</p>
                            <Textarea
                              placeholder="Provide feedback for the artist..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleReject(artwork.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button onClick={() => handleApprove(artwork.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleApprove(artwork.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Artwork</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p>Please provide a reason for rejecting this artwork:</p>
                          <Textarea
                            placeholder="Reason for rejection..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                          />
                          <Button 
                            variant="destructive"
                            onClick={() => handleReject(artwork.id)}
                          >
                            Confirm Rejection
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
