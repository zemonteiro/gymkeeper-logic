
export type EquipmentStatus = 'operational' | 'maintenance' | 'out-of-order';

export interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  status: EquipmentStatus;
  lastMaintenance: string;
  notes: string;
}

export interface Note {
  id: string;
  itemName: string;
  content: string;
  date: string;
}
