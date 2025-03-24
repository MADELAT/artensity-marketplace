
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Edit, MoreHorizontal, UserCog } from 'lucide-react';

export default function UserManagement() {
  const { toast } = useToast();
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'buyer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'artist' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: 4, name: 'Gallery Owner', email: 'gallery@example.com', role: 'gallery' },
  ]);

  const handleRoleChange = (userId: number, newRole: string) => {
    // This would call the Supabase API to update the user role
    toast({
      title: "Role updated",
      description: `User ID ${userId} role changed to ${newRole}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button>Add User</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : user.role === 'artist'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'gallery'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-green-100 text-green-800'
                    }`
                  }>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
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
                        onClick={() => toast({
                          title: "View Profile",
                          description: `Viewing ${user.name}'s profile`,
                        })}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer flex items-center"
                        onClick={() => toast({
                          title: "Edit User",
                          description: `Editing ${user.name}'s information`,
                        })}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleRoleChange(user.id, 'admin')}
                      >
                        Set as Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleRoleChange(user.id, 'artist')}
                      >
                        Set as Artist
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleRoleChange(user.id, 'gallery')}
                      >
                        Set as Gallery
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleRoleChange(user.id, 'buyer')}
                      >
                        Set as Buyer
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
