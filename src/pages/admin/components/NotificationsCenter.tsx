import { useState, useEffect } from "react";
import NotificationModal from "@/components/ui/NotificationModal";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext"; // Updated import
import { supabase } from "@/integrations/supabase/client"; // Updated import

export default function NotificationsCenter() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching notifications",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, []);

  const handleCreateNotification = async () => {
    if (!title || !message || !selectedRole) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("notifications").insert({
      title,
      message,
      role: selectedRole,
      user_id: selectedRole === "admin" ? user?.id : null,
      notification_type: "general",
      read: false,
      is_read: false,
      created_at: new Date().toISOString(),
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Notification Created",
        description: "Your notification has been sent to users",
      });

      setTitle("");
      setMessage("");
      setSelectedRole("");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, read: true, read_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating notification",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true, is_read: true } : n))
      );
      toast({
        title: "Notification Updated",
        description: `Notification ${id} marked as read`,
      });
    }
  };

  const handleViewNotification = async (notification: any) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);

    if (!notification.read) {
      const { error } = await supabase
        .from("notifications")
        .update({
          is_read: true,
          read: true,
          read_at: new Date().toISOString(),
        })
        .eq("id", notification.id);

      if (!error) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, read: true, is_read: true } : n
          )
        );
      }
    }
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
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="recipient-type">Recipient Type</Label>
                <Select
                  value={selectedRole}
                  onValueChange={(value) => setSelectedRole(value)}
                >
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

              <Button onClick={handleCreateNotification}>
                Send Notification
              </Button>
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
              <TableRow
                key={notification.id}
                className={notification.read ? "" : "bg-blue-50"}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {!notification.read && (
                      <Bell className="h-4 w-4 text-blue-500 mr-2" />
                    )}
                    {notification.title}
                  </div>
                </TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                  >
                    {notification.role === "all"
                      ? "Todos"
                      : notification.role
                      ? notification.role.charAt(0).toUpperCase() +
                        notification.role.slice(1)
                      : "General"}
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
                        onClick={() =>
                          handleMarkAsRead(String(notification.id))
                        }
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewNotification(notification)}
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notification={selectedNotification}
      />
      {selectedNotification && (
        <p className="text-muted-foreground mb-4">
          {selectedNotification.role === "all"
            ? "Notificación para todos los usuarios."
            : selectedNotification.role
            ? `Notificación para ${selectedNotification.role}s.`
            : "Notificación general."}
        </p>
      )}
    </div>
  );
}
