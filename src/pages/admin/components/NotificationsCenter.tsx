
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function NotificationsCenter() {
  const { toast } = useToast();
  const [notifications] = useState([
    { 
      id: 1, 
      title: 'Welcome to the Admin Dashboard', 
      message: 'This is your control center for managing ArTendency platform',
      type: 'admin',
      read: true,
      date: '2023-06-10',
    },
    { 
      id: 2, 
      title: 'New Artist Registration', 
      message: 'Jane Smith has registered as an artist',
      type: 'admin',
      read: false,
      date: '2023-06-15',
    },
    { 
      id: 3, 
      title: 'New Artwork Submitted', 
      message: 'A new artwork is pending approval',
      type: 'admin',
      read: false,
      date: '2023-06-18',
    },
  ]);

  const handleCreateNotification = () => {
    toast({
      title: "Notification Created",
      description: "Your notification has been sent to users",
    });
  };

  const handleMarkAsRead = (id: number) => {
    toast({
      title: "Notification Updated",
      description: `Notification ${id} marked as read`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notification Center</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Notification</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Notification title" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Notification message" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="recipient-type">Recipient Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                    <SelectItem value="artist">Artists</SelectItem>
                    <SelectItem value="gallery">Galleries</SelectItem>
                    <SelectItem value="buyer">Buyers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="important" />
                <Label htmlFor="important">Mark as Important</Label>
              </div>
              
              <Button onClick={handleCreateNotification}>Send Notification</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id} className={notification.read ? "" : "bg-blue-50"}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {!notification.read && <Bell className="h-4 w-4 text-blue-500 mr-2" />}
                    {notification.title}
                  </div>
                </TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    {notification.type}
                  </Badge>
                </TableCell>
                <TableCell>{notification.date}</TableCell>
                <TableCell>
                  {notification.read ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Read
                    </span>
                  ) : (
                    <span className="text-blue-600">Unread</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {!notification.read && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button variant="outline" size="sm">View</Button>
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
