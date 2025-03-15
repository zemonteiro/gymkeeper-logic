
import React from 'react';
import { Clock, Users, CalendarDays, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCard from './AnimatedCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  classPassAttendees?: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ 
  gymClass, 
  onEdit, 
  onDelete,
  delay = 0,
  classPassAttendees = 0
}) => {
  const capacityPercentage = (gymClass.enrolled / gymClass.capacity) * 100;
  const regularAttendees = gymClass.enrolled - classPassAttendees;
  
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
      
      <div className="flex justify-between text-xs text-gym-muted mb-2">
        <span>Enrollment</span>
        <span>{capacityPercentage.toFixed(0)}%</span>
      </div>
      
      {classPassAttendees > 0 && (
        <Accordion type="single" collapsible className="border rounded-md mt-3">
          <AccordionItem value="attendees" className="border-b-0">
            <AccordionTrigger className="py-2 px-3 text-sm">
              <div className="flex items-center gap-1">
                <Package size={14} className="text-purple-500" />
                <span>ClassPass Attendees ({classPassAttendees})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 py-2 text-sm">
              <div className="flex justify-between">
                <span>Regular Members:</span>
                <span>{regularAttendees}</span>
              </div>
              <div className="flex justify-between text-purple-700">
                <span>ClassPass Members:</span>
                <span>{classPassAttendees}</span>
              </div>
              <div className="flex justify-between font-medium mt-1 pt-1 border-t">
                <span>Total:</span>
                <span>{gymClass.enrolled}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </AnimatedCard>
  );
};

export default ClassCard;
