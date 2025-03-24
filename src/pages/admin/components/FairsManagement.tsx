
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
import { CalendarIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FairsManagement() {
  const { toast } = useToast();
  const [fairs] = useState([
    { 
      id: 1, 
      name: 'Modern Art Expo 2023', 
      location: 'New York', 
      startDate: '2023-08-15', 
      endDate: '2023-08-20',
      artworks: 42
    },
    { 
      id: 2, 
      name: 'International Contemporary Fair', 
      location: 'Miami', 
      startDate: '2023-10-05', 
      endDate: '2023-10-12',
      artworks: 28
    },
  ]);

  const handleCreateFair = () => {
    toast({
      title: "Fair Created",
      description: "The new fair has been added to the system",
    });
  };

  const handleAssignArtworks = (fairId: number) => {
    toast({
      title: "Assign Artworks",
      description: `Redirecting to artwork selection for fair ID ${fairId}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fairs & Events</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Fair</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Fair</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fair-name">Fair Name</Label>
                <Input id="fair-name" placeholder="Enter fair name" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              
              <Button onClick={handleCreateFair}>Create Fair</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Artworks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fairs.map((fair) => (
              <TableRow key={fair.id}>
                <TableCell className="font-medium">{fair.name}</TableCell>
                <TableCell>{fair.location}</TableCell>
                <TableCell className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {fair.startDate} to {fair.endDate}
                </TableCell>
                <TableCell>{fair.artworks} artworks</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAssignArtworks(fair.id)}
                    >
                      Assign Artworks
                    </Button>
                    <Button variant="outline" size="sm">Edit</Button>
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
