
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, Plus, Package, User } from 'lucide-react';
import ClassCard, { GymClass } from '@/components/ui/ClassCard';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ClassListProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedInstructor: string;
  setSelectedInstructor: (value: string) => void;
  instructors: string[];
  filteredClasses: GymClass[];
  classPassBookings: { [classId: string]: number };
  handleEditClass: (id: string) => void;
  handleDeleteClass: (id: string) => void;
  openAddDialog: () => void;
}

const ClassList: React.FC<ClassListProps> = ({
  activeTab,
  setActiveTab,
  selectedInstructor,
  setSelectedInstructor,
  instructors,
  filteredClasses,
  classPassBookings,
  handleEditClass,
  handleDeleteClass,
  openAddDialog
}) => {
  const totalClassPassBookings = Object.values(classPassBookings).reduce((sum, count) => sum + count, 0);
  
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <TabsList className="mr-2">
            <TabsTrigger value="all">All Classes</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          {totalClassPassBookings > 0 && (
            <Badge className="bg-purple-500 ml-2">
              <Package size={14} className="mr-1" />
              {totalClassPassBookings} ClassPass Total
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center">
            <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gym-muted" />
                  <SelectValue placeholder="Filter by instructor" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {instructors.map((instructor) => (
                  <SelectItem key={instructor} value={instructor}>
                    {instructor === 'all' ? 'All Instructors' : instructor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Calendar View
          </Button>
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((gymClass, index) => (
            <ClassCard 
              key={gymClass.id} 
              gymClass={{
                ...gymClass,
                enrolled: gymClass.enrolled + (classPassBookings[gymClass.id] || 0)
              }} 
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
              delay={100 * index}
              classPassAttendees={classPassBookings[gymClass.id] || 0}
            />
          ))}
          
          {filteredClasses.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No classes found</h3>
              <p className="text-gym-muted mb-6">There are no classes scheduled for this period.</p>
              <Button onClick={openAddDialog}>
                <Plus size={16} className="mr-2" />
                Add Class
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      {["today", "upcoming", "past"].map(tab => (
        <TabsContent key={tab} value={tab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((gymClass, index) => (
              <ClassCard 
                key={gymClass.id} 
                gymClass={{
                  ...gymClass,
                  enrolled: gymClass.enrolled + (classPassBookings[gymClass.id] || 0)
                }} 
                onEdit={handleEditClass}
                onDelete={handleDeleteClass}
                delay={100 * index}
                classPassAttendees={classPassBookings[gymClass.id] || 0}
              />
            ))}
            
            {filteredClasses.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No {tab} classes</h3>
                <p className="text-gym-muted mb-6">There are no classes scheduled for this period.</p>
                <Button onClick={openAddDialog}>
                  <Plus size={16} className="mr-2" />
                  Add Class
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ClassList;
