
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Equipment, EquipmentStatus } from '@/types/equipment';

interface EditEquipmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingEquipment: Equipment | null;
  setEditingEquipment: React.Dispatch<React.SetStateAction<Equipment | null>>;
  onSave: () => void;
}

const EditEquipmentDialog: React.FC<EditEquipmentDialogProps> = ({
  isOpen,
  onOpenChange,
  editingEquipment,
  setEditingEquipment,
  onSave
}) => {
  if (!editingEquipment) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Equipment</DialogTitle>
          <DialogDescription>
            Update the details of this equipment
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">Name</Label>
            <Input
              id="edit-name"
              value={editingEquipment.name}
              onChange={(e) => setEditingEquipment({...editingEquipment, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-type" className="text-right">Type</Label>
            <Input
              id="edit-type"
              value={editingEquipment.type}
              onChange={(e) => setEditingEquipment({...editingEquipment, type: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-location" className="text-right">Location</Label>
            <Input
              id="edit-location"
              value={editingEquipment.location}
              onChange={(e) => setEditingEquipment({...editingEquipment, location: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-status" className="text-right">Status</Label>
            <select
              id="edit-status"
              value={editingEquipment.status}
              onChange={(e) => setEditingEquipment({...editingEquipment, status: e.target.value as EquipmentStatus})}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
            >
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="out-of-order">Out of Order</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-maintenance" className="text-right">Last Maintenance</Label>
            <Input
              id="edit-maintenance"
              type="date"
              value={editingEquipment.lastMaintenance}
              onChange={(e) => setEditingEquipment({...editingEquipment, lastMaintenance: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-notes" className="text-right">Notes</Label>
            <Textarea
              id="edit-notes"
              value={editingEquipment.notes}
              onChange={(e) => setEditingEquipment({...editingEquipment, notes: e.target.value})}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEquipmentDialog;
