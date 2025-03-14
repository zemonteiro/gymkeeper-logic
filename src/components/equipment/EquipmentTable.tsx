
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import StatusBadge from './StatusBadge';
import EquipmentActions from './EquipmentActions';
import { Equipment, EquipmentStatus } from '@/types/equipment';

interface EquipmentTableProps {
  equipment: Equipment[];
  onStatusChange: (id: string, status: EquipmentStatus) => void;
  onEdit: (item: Equipment) => void;
  onOpenNotesDialog: (item: Equipment) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipment,
  onStatusChange,
  onEdit,
  onOpenNotesDialog
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.length > 0 ? (
            equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell>{item.lastMaintenance}</TableCell>
                <TableCell>
                  <EquipmentActions
                    item={item}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onOpenNotesDialog={onOpenNotesDialog}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gym-muted">
                No equipment found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EquipmentTable;
