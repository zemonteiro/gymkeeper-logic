
import React from 'react';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';

interface StatusBadgeProps {
  status: 'completed' | 'pending' | 'overdue';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <span className="flex items-center text-gym-success"><CheckCircle2 className="mr-1 h-4 w-4" /> Completed</span>;
    case 'pending':
      return <span className="flex items-center text-gym-warning"><Clock className="mr-1 h-4 w-4" /> Pending</span>;
    case 'overdue':
      return <span className="flex items-center text-gym-error"><Calendar className="mr-1 h-4 w-4" /> Overdue</span>;
    default:
      return null;
  }
};

export default StatusBadge;
