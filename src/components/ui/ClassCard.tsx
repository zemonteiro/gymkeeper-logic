
import React from 'react';
import { Clock, Users, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  description?: string;
}

interface ClassCardProps {
  gymClass: GymClass;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  delay?: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ 
  gymClass, 
  onEdit, 
  onDelete,
  delay = 0
}) => {
  const capacityPercentage = (gymClass.enrolled / gymClass.capacity) * 100;
  
  return (
    <AnimatedCard delay={delay}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{gymClass.name}</h3>
          <p className="text-sm text-gym-muted">Instructor: {gymClass.instructor}</p>
        </div>
        
        <div className="flex gap-1">
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(gymClass.id)}
              className="h-8 text-xs"
            >
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onDelete(gymClass.id)}
              className="h-8 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      
      {gymClass.description && (
        <p className="text-sm mb-4 text-gray-600">{gymClass.description}</p>
      )}
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-gym-muted" />
          <span className="text-sm">{gymClass.date}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gym-muted" />
          <span className="text-sm">{gymClass.time} ({gymClass.duration}min)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gym-muted" />
          <span className="text-sm">{gymClass.enrolled}/{gymClass.capacity}</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
        <div 
          className="h-1.5 rounded-full"
          style={{
            width: `${capacityPercentage}%`,
            backgroundColor: capacityPercentage > 80 
              ? '#F6465D' 
              : capacityPercentage > 60 
                ? '#F0B90B' 
                : '#00C087'
          }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gym-muted">
        <span>Enrollment</span>
        <span>{capacityPercentage.toFixed(0)}%</span>
      </div>
    </AnimatedCard>
  );
};

export default ClassCard;
