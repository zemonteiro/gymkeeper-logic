
import { Equipment } from '@/types/equipment';

export const formatNotesForLog = (equipment: Equipment[]) => {
  return equipment
    .filter(item => item.notes && item.notes.trim() !== '')
    .map(item => ({
      id: item.id,
      itemName: item.name,
      content: item.notes,
      date: item.lastMaintenance
    }));
};
