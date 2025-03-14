
import React, { useState } from 'react';
import { Search, Plus, Notebook } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import NotesLogView from './ui/NotesLogView';
import { Equipment, EquipmentStatus } from '@/types/equipment';
import { formatNotesForLog } from '@/utils/equipmentUtils';
import EquipmentTable from './equipment/EquipmentTable';
import AddEquipmentDialog from './equipment/AddEquipmentDialog';
import EditEquipmentDialog from './equipment/EditEquipmentDialog';
import NotesDialog from './equipment/NotesDialog';

const EquipmentComponent = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('equipment');
  
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Equipment Management</h1>
        <p className="text-gym-muted">Manage and track maintenance for gym equipment</p>
      </div>
      
      <Tabs defaultValue="equipment" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="equipment">Equipment List</TabsTrigger>
          <TabsTrigger value="notes">
            <Notebook className="h-4 w-4 mr-2" />
            Notes Log
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="equipment" className="space-y-6">
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
            
            <Button 
              className="whitespace-nowrap" 
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
          </div>
          
          <EquipmentTable 
            equipment={filteredEquipment}
            onStatusChange={handleStatusChange}
            onEdit={(item) => {
              setEditingEquipment(item);
              setIsEditDialogOpen(true);
            }}
            onOpenNotesDialog={openNotesDialog}
          />
        </TabsContent>
        
        <TabsContent value="notes">
          <NotesLogView 
            title="Equipment Notes Log" 
            notes={formatNotesForLog(equipment)} 
            emptyMessage="No equipment notes have been added yet."
          />
        </TabsContent>
      </Tabs>
      
      <AddEquipmentDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newEquipment={newEquipment}
        setNewEquipment={setNewEquipment}
        onAddEquipment={handleAddEquipment}
      />
      
      <EditEquipmentDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingEquipment={editingEquipment}
        setEditingEquipment={setEditingEquipment}
        onSave={handleEditEquipment}
      />
      
      <NotesDialog
        isOpen={isNotesDialogOpen}
        onOpenChange={setIsNotesDialogOpen}
        noteContent={noteContent}
        setNoteContent={setNoteContent}
        onSave={saveNotes}
      />
    </div>
  );
};

export default EquipmentComponent;
