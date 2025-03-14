
export interface CleaningTask {
  id: string;
  area: string;
  assignedTo: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastCleaned: string;
  nextDue: string;
  status: 'completed' | 'pending' | 'overdue';
  notes: string;
}

export interface Note {
  id: string;
  itemName: string;
  content: string;
  date: string;
}
