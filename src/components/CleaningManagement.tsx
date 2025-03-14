
import React, { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import NotesLogView from './ui/NotesLogView';
import { CleaningTask } from '@/types/cleaning';
import { getNextDueDate, formatNotesForLog } from '@/utils/cleaningUtils';
import TasksTable from './cleaning/TasksTable';
import AddTaskDialog from './cleaning/AddTaskDialog';
import NotesDialog from './cleaning/NotesDialog';
import { Notebook } from 'lucide-react';

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
                
                <Button 
                  className="whitespace-nowrap"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <TasksTable 
                tasks={filteredTasks}
                onStatusChange={handleStatusChange}
                onOpenNotesDialog={openNotesDialog}
                onDeleteTask={handleDeleteTask}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="notes">
          <NotesLogView 
            title="Cleaning Notes Log" 
            notes={formatNotesForLog(cleaningTasks)} 
            emptyMessage="No cleaning notes found. Add notes to tasks to see them here."
          />
        </TabsContent>
      </Tabs>
      
      <AddTaskDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        onAddTask={handleAddTask}
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

export default CleaningManagement;
