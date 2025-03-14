
import { CleaningTask } from '@/types/cleaning';

export const getNextDueDate = (fromDate: string, frequency: 'daily' | 'weekly' | 'monthly') => {
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

export const formatNotesForLog = (tasks: CleaningTask[]) => {
  return tasks
    .filter(task => task.notes && task.notes.trim() !== '')
    .map(task => ({
      id: task.id,
      itemName: task.area,
      content: task.notes,
      date: task.lastCleaned
    }));
};
