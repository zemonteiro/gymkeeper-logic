
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

interface AddEquipmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newEquipment: Omit<Equipment, 'id'>;
  setNewEquipment: React.Dispatch<React.SetStateAction<Omit<Equipment, 'id'>>>;
  onAddEquipment: () => void;
}

const AddEquipmentDialog: React.FC<AddEquipmentDialogProps> = ({
  isOpen,
  onOpenChange,
  newEquipment,
  setNewEquipment,
  onAddEquipment
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
          <DialogDescription>
            Enter the details of the new equipment
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={newEquipment.name}
              onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Input
              id="type"
              value={newEquipment.type}
              onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input
              id="location"
              value={newEquipment.location}
              onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <select
              id="status"
              value={newEquipment.status}
              onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value as EquipmentStatus})}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
            >
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="out-of-order">Out of Order</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maintenance" className="text-right">Last Maintenance</Label>
            <Input
              id="maintenance"
              type="date"
              value={newEquipment.lastMaintenance}
              onChange={(e) => setNewEquipment({...newEquipment, lastMaintenance: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">Notes</Label>
            <Textarea
              id="notes"
              value={newEquipment.notes}
              onChange={(e) => setNewEquipment({...newEquipment, notes: e.target.value})}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAddEquipment}>Add Equipment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentDialog;
