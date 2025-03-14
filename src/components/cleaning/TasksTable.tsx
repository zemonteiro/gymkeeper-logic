
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { CleaningTask } from '@/types/cleaning';
import StatusBadge from './StatusBadge';
import TaskActions from './TaskActions';

interface TasksTableProps {
  tasks: CleaningTask[];
  onStatusChange: (id: string, newStatus: 'completed' | 'pending' | 'overdue') => void;
  onOpenNotesDialog: (task: CleaningTask) => void;
  onDeleteTask: (id: string) => void;
}

const TasksTable: React.FC<TasksTableProps> = ({ 
  tasks,
  onStatusChange,
  onOpenNotesDialog,
  onDeleteTask
}) => {
  return (
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
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.area}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell className="capitalize">{task.frequency}</TableCell>
                <TableCell>{task.lastCleaned}</TableCell>
                <TableCell>{task.nextDue}</TableCell>
                <TableCell><StatusBadge status={task.status} /></TableCell>
                <TableCell>
                  <TaskActions 
                    task={task}
                    onStatusChange={onStatusChange}
                    onOpenNotesDialog={onOpenNotesDialog}
                    onDeleteTask={onDeleteTask}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gym-muted">
                No tasks found. Try changing your filters or add a new task.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
