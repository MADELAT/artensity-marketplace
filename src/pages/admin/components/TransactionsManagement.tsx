
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Package, CreditCard, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function TransactionsManagement() {
  const { toast } = useToast();
  const orders = [
    { 
      id: 'ORD12345', 
      buyer: 'John Davis', 
      seller: 'Jane Smith', 
      artwork: 'Abstract Harmony', 
      total: 1200, 
      status: 'pending',
      date: '2023-06-15',
    },
    { 
      id: 'ORD12346', 
      buyer: 'Alice Johnson', 
      seller: 'Michael Chen', 
      artwork: 'Urban Reflections', 
      total: 850, 
      status: 'escrow',
      date: '2023-06-18',
    },
    { 
      id: 'ORD12347', 
      buyer: 'Robert Wilson', 
      seller: 'Modern Vision Gallery', 
      artwork: 'Serenity', 
      total: 3200, 
      status: 'delivered',
      date: '2023-06-10',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'escrow':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Escrow</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} changed to ${newStatus}`,
    });
  };

  const handleForcePayment = (orderId: string) => {
    toast({
      title: "Payment Processed",
      description: `Payment for order ${orderId} has been processed`,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transactions & Payments</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Artwork</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.buyer}</TableCell>
                <TableCell>{order.seller}</TableCell>
                <TableCell>{order.artwork}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center"
                        onClick={() => handleStatusChange(order.id, 'escrow')}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Mark as In Escrow
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center"
                        onClick={() => handleStatusChange(order.id, 'delivered')}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Mark as Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center"
                        onClick={() => handleForcePayment(order.id)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Force Payment
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center text-red-500"
                        onClick={() => handleStatusChange(order.id, 'cancelled')}
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
