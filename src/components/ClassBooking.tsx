
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import AddClassDialog from './classes/AddClassDialog';
import ClassList from './classes/ClassList';
import { useClassManagement } from '@/hooks/useClassManagement';

const ClassBooking = () => {
  const {
    isAddDialogOpen,
    setIsAddDialogOpen,
    activeTab,
    setActiveTab,
    newClass,
    setNewClass,
    classPassBookings,
    isLoadingClassPass,
    filteredClasses,
    fetchClassPassBookingsForAllClasses,
    handleAddClass,
    handleEditClass,
    handleDeleteClass
  } = useClassManagement();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Class Schedule</h1>
          <p className="text-gym-muted">Manage fitness classes and schedules</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchClassPassBookingsForAllClasses} disabled={isLoadingClassPass}>
            <RefreshCw size={16} className={`mr-2 ${isLoadingClassPass ? 'animate-spin' : ''}`} />
            Sync ClassPass Bookings
          </Button>
          
          <AddClassDialog 
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            newClass={newClass}
            setNewClass={setNewClass}
            handleAddClass={handleAddClass}
          />
        </div>
      </div>
      
      <ClassList 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredClasses={filteredClasses}
        classPassBookings={classPassBookings}
        handleEditClass={handleEditClass}
        handleDeleteClass={handleDeleteClass}
        openAddDialog={() => setIsAddDialogOpen(true)}
      />
    </div>
  );
};

export default ClassBooking;
