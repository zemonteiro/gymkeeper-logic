import React, { useState } from 'react';
import { 
  Bath, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Filter,
  Plus,
  Trash2,
  MessageSquare,
  Notebook
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import NotesLogView from './ui/NotesLogView';

interface CleaningTask {
  id: string;
  area: string;
  assignedTo: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastCleaned: string;
  nextDue: string;
  status: 'completed' | 'pending' | 'overdue';
  notes: string;
}

const CleaningManagement = () => {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  
  const [cleaningTasks, setCleaningTasks] = useState<CleaningTask[]>([
    {
      id: '1',
      area: 'Main Gym Floor',
      assignedTo: 'John Smith',
      frequency: 'daily',
      lastCleaned: '2023-12-10',
      nextDue: '2023-12-11',
      status: 'completed',
      notes: 'Full sanitization completed'
    },
    {
      id: '2',
      area: 'Locker Rooms',
      assignedTo: 'Maria Johnson',
      frequency: 'daily',
      lastCleaned: '2023-12-10',
      nextDue: '2023-12-11',
      status: 'completed',
      notes: 'Deep cleaned showers and replaced towels'
    },
    {
      id: '3',
      area: 'Cardio Equipment',
      assignedTo: 'David Williams',
      frequency: 'daily',
      lastCleaned: '2023-12-09',
      nextDue: '2023-12-10',
      status: 'overdue',
      notes: 'Special attention to handles and screens'
    },
    {
      id: '4',
      area: 'Weight Room',
      assignedTo: 'Sarah Davis',
      frequency: 'daily',
      lastCleaned: '2023-12-10',
      nextDue: '2023-12-11',
      status: 'completed',
      notes: 'Disinfected all equipment and organized weights'
    },
    {
      id: '5',
      area: 'Yoga Studio',
      assignedTo: 'Michael Brown',
      frequency: 'daily',
      lastCleaned: '2023-12-10',
      nextDue: '2023-12-11',
      status: 'pending',
      notes: 'Clean mats and floor'
    },
    {
      id: '6',
      area: 'HVAC System',
      assignedTo: 'Technical Team',
      frequency: 'monthly',
      lastCleaned: '2023-11-15',
      nextDue: '2023-12-15',
      status: 'pending',
      notes: 'Filter replacement needed'
    },
  ]);
  
  const [newTask, setNewTask] = useState<Omit<CleaningTask, 'id'>>({
    area: '',
    assignedTo: '',
    frequency: 'daily',
    lastCleaned: new Date().toISOString().split('T')[0],
    nextDue: '',
    status: 'pending',
    notes: ''
  });
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  
  const handleStatusChange = (id: string, newStatus: 'completed' | 'pending' | 'overdue') => {
    setCleaningTasks(cleaningTasks.map(task => {
      if (task.id === id) {
        const updatedTask = { 
          ...task, 
          status: newStatus
        };
        
        if (newStatus === 'completed') {
          const today = new Date().toISOString().split('T')[0];
          const nextDueDate = getNextDueDate(today, task.frequency);
          
          updatedTask.lastCleaned = today;
          updatedTask.nextDue = nextDueDate;
        }
        
        return updatedTask;
      }
      return task;
    }));
    
    toast({
      title: "Status Updated",
      description: `Task status has been changed to ${newStatus}`,
    });
  };
  
  const getNextDueDate = (fromDate: string, frequency: 'daily' | 'weekly' | 'monthly') => {
    const date = new Date(fromDate);
    
    switch (frequency) {
      case 'daily':
        date.setDate(date.getDate() + 1);
        break;
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
    }
    
    return date.toISOString().split('T')[0];
  };
  
  const handleAddTask = () => {
    const nextDueDate = getNextDueDate(newTask.lastCleaned, newTask.frequency);
    
    const newId = (Math.max(...cleaningTasks.map(t => parseInt(t.id))) + 1).toString();
    setCleaningTasks([...cleaningTasks, { 
      id: newId, 
      ...newTask, 
      nextDue: nextDueDate
    }]);
    
    setNewTask({
      area: '',
      assignedTo: '',
      frequency: 'daily',
      lastCleaned: new Date().toISOString().split('T')[0],
      nextDue: '',
      status: 'pending',
      notes: ''
    });
    
    setIsAddDialogOpen(false);
    
    toast({
      title: "Task Added",
      description: "New cleaning task has been added",
    });
  };
  
  const handleDeleteTask = (id: string) => {
    setCleaningTasks(cleaningTasks.filter(task => task.id !== id));
    
    toast({
      title: "Task Deleted",
      description: "Cleaning task has been removed",
    });
  };
  
  const openNotesDialog = (task: CleaningTask) => {
    setSelectedTaskId(task.id);
    setNoteContent(task.notes);
    setIsNotesDialogOpen(true);
  };
  
  const saveNotes = () => {
    if (selectedTaskId) {
      setCleaningTasks(cleaningTasks.map(task => 
        task.id === selectedTaskId ? { ...task, notes: noteContent } : task
      ));
      
      setIsNotesDialogOpen(false);
      
      toast({
        title: "Notes Updated",
        description: "Task notes have been updated successfully",
      });
    }
  };
  
  const filteredTasks = cleaningTasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) {
      return false;
    }
    
    return (
      task.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const getStatusBadge = (status: 'completed' | 'pending' | 'overdue') => {
    switch (status) {
      case 'completed':
        return <span className="flex items-center text-gym-success"><CheckCircle2 className="mr-1 h-4 w-4" /> Completed</span>;
      case 'pending':
        return <span className="flex items-center text-gym-warning"><Clock className="mr-1 h-4 w-4" /> Pending</span>;
      case 'overdue':
        return <span className="flex items-center text-gym-error"><Calendar className="mr-1 h-4 w-4" /> Overdue</span>;
      default:
        return null;
    }
  };

  const formatNotesForLog = () => {
    return cleaningTasks
      .filter(task => task.notes && task.notes.trim() !== '')
      .map(task => ({
        id: task.id,
        itemName: task.area,
        content: task.notes,
        date: task.lastCleaned
      }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Cleaning Management</h1>
        <p className="text-gym-muted">Track and manage cleaning tasks throughout the facility</p>
      </div>
      
      <Tabs defaultValue="tasks" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="tasks">Cleaning Tasks</TabsTrigger>
          <TabsTrigger value="notes">
            <Notebook className="h-4 w-4 mr-2" />
            Notes Log
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger 
                  value="all" 
                  onClick={() => setFilterStatus('all')}
                >
                  All Tasks
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger 
                  value="overdue" 
                  onClick={() => setFilterStatus('overdue')}
                >
                  Overdue
                </TabsTrigger>
              </TabsList>
              
              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gym-muted h-4 w-4" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="whitespace-nowrap">
                      <Plus className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Cleaning Task</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new cleaning task
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="area" className="text-right">Area</Label>
                        <Input
                          id="area"
                          value={newTask.area}
                          onChange={(e) => setNewTask({...newTask, area: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="assignedTo" className="text-right">Assigned To</Label>
                        <Input
                          id="assignedTo"
                          value={newTask.assignedTo}
                          onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="frequency" className="text-right">Frequency</Label>
                        <select
                          id="frequency"
                          value={newTask.frequency}
                          onChange={(e) => setNewTask({...newTask, frequency: e.target.value as 'daily' | 'weekly' | 'monthly'})}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastCleaned" className="text-right">Last Cleaned</Label>
                        <Input
                          id="lastCleaned"
                          type="date"
                          value={newTask.lastCleaned}
                          onChange={(e) => setNewTask({...newTask, lastCleaned: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">Notes</Label>
                        <Textarea
                          id="notes"
                          value={newTask.notes}
                          onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddTask}>Add Task</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Area</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Last Cleaned</TableHead>
                      <TableHead>Next Due</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.area}</TableCell>
                          <TableCell>{task.assignedTo}</TableCell>
                          <TableCell className="capitalize">{task.frequency}</TableCell>
                          <TableCell>{task.lastCleaned}</TableCell>
                          <TableCell>{task.nextDue}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value as 'completed' | 'pending' | 'overdue')}
                                className="h-9 rounded-md border border-input bg-background px-3 text-xs"
                              >
                                <option value="pending">Set Pending</option>
                                <option value="completed">Mark Completed</option>
                                <option value="overdue">Mark Overdue</option>
                              </select>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openNotesDialog(task)}
                                title="Add/Edit Notes"
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gym-muted">
                         

