
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, Plus, Package } from 'lucide-react';
import ClassCard, { GymClass } from '@/components/ui/ClassCard';
import { Badge } from '@/components/ui/badge';

interface ClassListProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredClasses: GymClass[];
  classPassBookings: { [classId: string]: number };
  handleEditClass: (id: string) => void;
  handleDeleteClass: (id: string) => void;
  openAddDialog: () => void;
}

const ClassList: React.FC<ClassListProps> = ({
  activeTab,
  setActiveTab,
  filteredClasses,
  classPassBookings,
  handleEditClass,
  handleDeleteClass,
  openAddDialog
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex items-center justify-between mb-6">
        <TabsList>
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center gap-2">
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
            <div key={gymClass.id} className="relative">
              {classPassBookings[gymClass.id] > 0 && (
                <Badge className="absolute -top-2 -right-2 z-10 bg-purple-500">
                  <Package size={14} className="mr-1" />
                  {classPassBookings[gymClass.id]} ClassPass
                </Badge>
              )}
              <ClassCard 
                gymClass={{
                  ...gymClass,
                  // Add ClassPass bookings to the enrolled count for display
                  enrolled: gymClass.enrolled + (classPassBookings[gymClass.id] || 0)
                }} 
                onEdit={handleEditClass}
                onDelete={handleDeleteClass}
                delay={100 * index}
                classPassAttendees={classPassBookings[gymClass.id] || 0}
              />
            </div>
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
      
      <TabsContent value="today" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((gymClass, index) => (
            <ClassCard 
              key={gymClass.id} 
              gymClass={gymClass} 
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
              delay={100 * index}
            />
          ))}
          
          {filteredClasses.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No classes today</h3>
              <p className="text-gym-muted mb-6">There are no classes scheduled for today.</p>
              <Button onClick={openAddDialog}>
                <Plus size={16} className="mr-2" />
                Add Class
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="upcoming" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((gymClass, index) => (
            <ClassCard 
              key={gymClass.id} 
              gymClass={gymClass} 
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
              delay={100 * index}
            />
          ))}
          
          {filteredClasses.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No upcoming classes</h3>
              <p className="text-gym-muted mb-6">There are no classes scheduled for the future.</p>
              <Button onClick={openAddDialog}>
                <Plus size={16} className="mr-2" />
                Add Class
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="past" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((gymClass, index) => (
            <ClassCard 
              key={gymClass.id} 
              gymClass={gymClass} 
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
              delay={100 * index}
            />
          ))}
          
          {filteredClasses.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No past classes</h3>
              <p className="text-gym-muted mb-6">There are no classes from previous days.</p>
              <Button onClick={openAddDialog}>
                <Plus size={16} className="mr-2" />
                Add Class
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ClassList;
