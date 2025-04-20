// src/components/ui/NotificationModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notification: {
    title: string;
    message: string;
    created_at?: string;
  } | null;
}

export default function NotificationModal({
  open,
  onClose,
  notification,
}: NotificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {notification?.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Notificación general.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-sm whitespace-pre-line">
          {notification?.message}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
