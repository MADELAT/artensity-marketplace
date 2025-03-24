
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CommissionManagement() {
  const { toast } = useToast();
  const [commissions, setCommissions] = useState([
    { id: 1, user: 'Jane Smith', role: 'artist', rate: 10, editMode: false },
    { id: 2, user: 'Michael Chen', role: 'artist', rate: 8, editMode: false },
    { id: 3, user: 'Modern Vision Gallery', role: 'gallery', rate: 15, editMode: false },
  ]);

  const toggleEditMode = (id: number) => {
    setCommissions(commissions.map(c => 
      c.id === id ? {...c, editMode: !c.editMode} : c
    ));
  };

  const updateRate = (id: number, newRate: string) => {
    const rate = parseFloat(newRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      toast({
        title: "Invalid Commission Rate",
        description: "Commission rate must be between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    setCommissions(commissions.map(c => 
      c.id === id ? {...c, rate, editMode: false} : c
    ));

    toast({
      title: "Commission Updated",
      description: `Commission rate updated to ${rate}%`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Commission Management</h2>
        <Button>Set Default Rate</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Commission Rate (%)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id}>
                <TableCell className="font-medium">{commission.user}</TableCell>
                <TableCell>{commission.role}</TableCell>
                <TableCell>
                  {commission.editMode ? (
                    <Input 
                      type="number" 
                      defaultValue={commission.rate}
                      className="w-24"
                      min={0}
                      max={100}
                      step={0.5}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateRate(commission.id, (e.target as HTMLInputElement).value);
                        }
                      }}
                    />
                  ) : (
                    `${commission.rate}%`
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {commission.editMode ? (
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleEditMode(commission.id)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => {
                          const input = document.querySelector(`tr:nth-child(${commissions.findIndex(c => c.id === commission.id) + 1}) input`) as HTMLInputElement;
                          updateRate(commission.id, input.value);
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleEditMode(commission.id)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
