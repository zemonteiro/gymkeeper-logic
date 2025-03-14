
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Equipment, EquipmentStatus } from '@/types/equipment';

interface EquipmentActionsProps {
  item: Equipment;
  onStatusChange: (id: string, status: EquipmentStatus) => void;
  onEdit: (item: Equipment) => void;
  onOpenNotesDialog: (item: Equipment) => void;
}

const EquipmentActions: React.FC<EquipmentActionsProps> = ({
  item,
  onStatusChange,
  onEdit,
  onOpenNotesDialog
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(item)}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOpenNotesDialog(item)}
        title="Add/Edit Notes"
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
      <select
        value={item.status}
        onChange={(e) => onStatusChange(item.id, e.target.value as EquipmentStatus)}
        className="h-9 rounded-md border border-input bg-background px-3 text-xs"
      >
        <option value="operational">Set Operational</option>
        <option value="maintenance">Set Maintenance</option>
        <option value="out-of-order">Set Out of Order</option>
      </select>
    </div>
  );
};

export default EquipmentActions;
