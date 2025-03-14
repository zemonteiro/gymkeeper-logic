
import React from 'react';
import { CleaningTask } from '@/types/cleaning';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTask: Omit<CleaningTask, 'id'>;
  setNewTask: React.Dispatch<React.SetStateAction<Omit<CleaningTask, 'id'>>>;
  onAddTask: () => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  isOpen,
  onOpenChange,
  newTask,
  setNewTask,
  onAddTask,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAddTask}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
