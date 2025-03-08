
import React, { useState } from 'react';
import MemberTable, { Member } from './ui/MemberTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

// Sample member data
const sampleMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    membershipType: 'Premium',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    membershipType: 'Standard',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    membershipType: 'Basic',
    status: 'inactive',
    joinDate: '2022-10-05',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    membershipType: 'Premium',
    status: 'active',
    joinDate: '2023-03-10',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    membershipType: 'Standard',
    status: 'pending',
    joinDate: '2023-04-25',
  },
];

const MemberManagement = () => {
  const [members, setMembers] = useState<Member[]>(sampleMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({
    name: '',
    email: '',
    membershipType: 'Standard',
    status: 'active',
  });
  
  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const member: Member = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      membershipType: newMember.membershipType || 'Standard',
      status: newMember.status as 'active' | 'inactive' | 'pending',
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    setMembers([...members, member]);
    setNewMember({
      name: '',
      email: '',
      membershipType: 'Standard',
      status: 'active',
    });
    setIsAddDialogOpen(false);
    toast.success('Member added successfully');
  };
  
  const handleViewMember = (member: Member) => {
    toast(`Viewing ${member.name}'s details`);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Members</h1>
          <p className="text-gym-muted">Manage your gym members</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="membership">Membership Type</Label>
                <Select
                  value={newMember.membershipType}
                  onValueChange={(value) => setNewMember({ ...newMember, membershipType: value })}
                >
                  <SelectTrigger id="membership">
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newMember.status}
                  onValueChange={(value: 'active' | 'inactive' | 'pending') => 
                    setNewMember({ ...newMember, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="button" className="mt-4" onClick={handleAddMember}>
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <MemberTable 
        members={members}
        onRowClick={handleViewMember}
      />
    </div>
  );
};

export default MemberManagement;
