
import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CleaningTask } from '@/types/cleaning';

interface TaskActionsProps {
  task: CleaningTask;
  onStatusChange: (id: string, newStatus: 'completed' | 'pending' | 'overdue') => void;
  onOpenNotesDialog: (task: CleaningTask) => void;
  onDeleteTask: (id: string) => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ 
  task, 
  onStatusChange, 
  onOpenNotesDialog, 
  onDeleteTask 
}) => {
  return (
    <div className="flex space-x-2">
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as 'completed' | 'pending' | 'overdue')}
        className="h-9 rounded-md border border-input bg-background px-3 text-xs"
      >
        <option value="pending">Set Pending</option>
        <option value="completed">Mark Completed</option>
        <option value="overdue">Mark Overdue</option>
      </select>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOpenNotesDialog(task)}
        title="Add/Edit Notes"
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDeleteTask(task.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskActions;
