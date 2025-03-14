
import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { EquipmentStatus } from '@/types/equipment';

interface StatusBadgeProps {
  status: EquipmentStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'operational':
      return <span className="flex items-center text-gym-success"><CheckCircle className="mr-1 h-4 w-4" /> Operational</span>;
    case 'maintenance':
      return <span className="flex items-center text-gym-warning"><Clock className="mr-1 h-4 w-4" /> Maintenance</span>;
    case 'out-of-order':
      return <span className="flex items-center text-gym-error"><AlertCircle className="mr-1 h-4 w-4" /> Out of Order</span>;
    default:
      return null;
  }
};

export default StatusBadge;
