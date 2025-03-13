import React, { useState } from 'react';
import { 
  Wrench, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Search,
  Plus,
  MessageSquareEdit
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

type EquipmentStatus = 'operational' | 'maintenance' | 'out-of-order';

interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  status: EquipmentStatus;
  lastMaintenance: string;
  notes: string;
}

const EquipmentComponent = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Treadmill Alpha-1',
      type: 'Cardio',
      location: 'Cardio Area',
      status: 'operational',
      lastMaintenance: '2023-11-15',
      notes: 'Regular maintenance completed'
    },
    {
      id: '2',
      name: 'Bench Press Station 3',
      type: 'Strength',
      location: 'Weight Room',
      status: 'maintenance',
      lastMaintenance: '2023-12-01',
      notes: 'Cushion needs replacement'
    },
    {
      id: '3',
      name: 'Rowing Machine R2',
      type: 'Cardio',
      location: 'Cardio Area',
      status: 'out-of-order',
      lastMaintenance: '2023-10-20',
      notes: 'Motor failure, parts ordered'
    },
    {
      id: '4',
      name: 'Leg Press Machine',
      type: 'Strength',
      location: 'Weight Room',
      status: 'operational',
      lastMaintenance: '2023-11-25',
      notes: 'Working properly'
    },
    {
      id: '5',
      name: 'Elliptical Trainer E5',
      type: 'Cardio',
      location: 'Cardio Area',
      status: 'operational',
      lastMaintenance: '2023-11-10',
      notes: 'Regular check completed'
    },
  ]);
  
  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, 'id'>>({
    name: '',
    type: '',
    location: '',
    status: 'operational',
    lastMaintenance: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  
  const handleStatusChange = (id: string, newStatus: EquipmentStatus) => {
    setEquipment(equipment.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    
    toast({
      title: "Status Updated",
      description: `Equipment status has been changed to ${newStatus}`,
    });
  };
  
  const handleAddEquipment = () => {
    const newId = (Math.max(...equipment.map(e => parseInt(e.id))) + 1).toString();
    setEquipment([...equipment, { id: newId, ...newEquipment }]);
    setNewEquipment({
      name: '',
      type: '',
      location: '',
      status: 'operational',
      lastMaintenance: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Equipment Added",
      description: "New equipment has been added to the system",
    });
  };
  
  const handleEditEquipment = () => {
    if (editingEquipment) {
      setEquipment(equipment.map(item => 
        item.id === editingEquipment.id ? editingEquipment : item
      ));
      setIsEditDialogOpen(false);
      
      toast({
        title: "Equipment Updated",
        description: "Equipment details have been updated",
      });
    }
  };
  
  const openNotesDialog = (item: Equipment) => {
    setSelectedEquipmentId(item.id);
    setNoteContent(item.notes);
    setIsNotesDialogOpen(true);
  };
  
  const saveNotes = () => {
    if (selectedEquipmentId) {
      setEquipment(equipment.map(item => 
        item.id === selectedEquipmentId ? { ...item, notes: noteContent } : item
      ));
      
      setIsNotesDialogOpen(false);
      
      toast({
        title: "Notes Updated",
        description: "Equipment notes have been updated successfully",
      });
    }
  };
  
  const filteredEquipment = equipment.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case 'operational':
        return <span className="flex items-center text-gym-success"><CheckCircle className="mr-1 h-4 w-4" /> Operational</span>;
      case 'maintenance':
        return <span className="flex items-center text-gym-warning"><Clock className="mr-1 h-4 w-4" /> Maintenance</span>;
      case 'out-of-order':
        return <span className="flex items-center text-gym-error"><AlertCircle className="mr-1 h-4 w-4" /> Out of Order</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Equipment Management</h1>
        <p className="text-gym-muted">Manage and track maintenance for gym equipment</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gym-muted h-4 w-4" />
          <Input
            placeholder="Search equipment..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
              <DialogDescription>
                Enter the details of the new equipment
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Input
                  id="type"
                  value={newEquipment.type}
                  onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input
                  id="location"
                  value={newEquipment.location}
                  onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <select
                  id="status"
                  value={newEquipment.status}
                  onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value as EquipmentStatus})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="out-of-order">Out of Order</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maintenance" className="text-right">Last Maintenance</Label>
                <Input
                  id="maintenance"
                  type="date"
                  value={newEquipment.lastMaintenance}
                  onChange={(e) => setNewEquipment({...newEquipment, lastMaintenance: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <Textarea
                  id="notes"
                  value={newEquipment.notes}
                  onChange={(e) => setNewEquipment({...newEquipment, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddEquipment}>Add Equipment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.lastMaintenance}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingEquipment(item);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNotesDialog(item)}
                        title="Add/Edit Notes"
                      >
                        <MessageSquareEdit className="h-4 w-4" />
                      </Button>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as EquipmentStatus)}
                        className="h-9 rounded-md border border-input bg-background px-3 text-xs"
                      >
                        <option value="operational">Set Operational</option>
                        <option value="maintenance">Set Maintenance</option>
                        <option value="out-of-order">Set Out of Order</option>
                      </select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gym-muted">
                  No equipment found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Equipment</DialogTitle>
            <DialogDescription>
              Update the details of this equipment
            </DialogDescription>
          </DialogHeader>
          {editingEquipment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={editingEquipment.name}
                  onChange={(e) => setEditingEquipment({...editingEquipment, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">Type</Label>
                <Input
                  id="edit-type"
                  value={editingEquipment.type}
                  onChange={(e) => setEditingEquipment({...editingEquipment, type: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">Location</Label>
                <Input
                  id="edit-location"
                  value={editingEquipment.location}
                  onChange={(e) => setEditingEquipment({...editingEquipment, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <select
                  id="edit-status"
                  value={editingEquipment.status}
                  onChange={(e) => setEditingEquipment({...editingEquipment, status: e.target.value as EquipmentStatus})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="out-of-order">Out of Order</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-maintenance" className="text-right">Last Maintenance</Label>
                <Input
                  id="edit-maintenance"
                  type="date"
                  value={editingEquipment.lastMaintenance}
                  onChange={(e) => setEditingEquipment({...editingEquipment, lastMaintenance: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editingEquipment.notes}
                  onChange={(e) => setEditingEquipment({...editingEquipment, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditEquipment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Equipment Notes</DialogTitle>
            <DialogDescription>
              Add or update notes for this equipment
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter notes about this equipment..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EquipmentComponent;
