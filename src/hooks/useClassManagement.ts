
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { GymClass } from '@/components/ui/ClassCard';
import { ClassFormData, sampleClasses } from '@/types/classes';
import { fetchClassPassBookings, getClassPassConfig, registerClassWithClassPass } from '@/utils/classpassUtils';

export const useClassManagement = () => {
  const [classes, setClasses] = useState<GymClass[]>(sampleClasses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const [newClass, setNewClass] = useState<ClassFormData>({
    name: '',
    instructor: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    duration: 60,
    capacity: 15,
    enrolled: 0,
    description: '',
  });
  const [classPassBookings, setClassPassBookings] = useState<{[classId: string]: number}>({});
  const [isLoadingClassPass, setIsLoadingClassPass] = useState(false);
  
  // Fetch ClassPass bookings when the component mounts
  useEffect(() => {
    const config = getClassPassConfig();
    // Default to enabled for demonstration purposes
    if (config.isEnabled || config.apiKey === '') {
      fetchClassPassBookingsForAllClasses();
    }
  }, []);
  
  const fetchClassPassBookingsForAllClasses = async () => {
    setIsLoadingClassPass(true);
    
    try {
      const bookingCounts: {[classId: string]: number} = {};
      
      // Fetch ClassPass bookings for each class
      for (const gymClass of classes) {
        const bookings = await fetchClassPassBookings(gymClass.id);
        if (bookings.length > 0) {
          bookingCounts[gymClass.id] = bookings.length;
        }
      }
      
      setClassPassBookings(bookingCounts);
      toast.success(`Found ${Object.values(bookingCounts).reduce((sum, count) => sum + count, 0)} ClassPass bookings`);
    } catch (error) {
      console.error('Error fetching ClassPass bookings:', error);
      toast.error('Failed to fetch ClassPass bookings');
    } finally {
      setIsLoadingClassPass(false);
    }
  };
  
  const handleAddClass = async () => {
    if (!newClass.name || !newClass.instructor || !newClass.date || !newClass.time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const gymClass: GymClass = {
      id: Date.now().toString(),
      name: newClass.name,
      instructor: newClass.instructor,
      date: newClass.date,
      time: newClass.time,
      duration: newClass.duration || 60,
      capacity: newClass.capacity || 15,
      enrolled: newClass.enrolled || 0,
      description: newClass.description,
    };
    
    setClasses([...classes, gymClass]);
    setNewClass({
      name: '',
      instructor: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '12:00',
      duration: 60,
      capacity: 15,
      enrolled: 0,
      description: '',
    });
    setIsAddDialogOpen(false);
    toast.success('Class added successfully');
    
    // Register the class with ClassPass if integration is enabled
    const classPassConfig = getClassPassConfig();
    if (classPassConfig.isEnabled) {
      await registerClassWithClassPass(gymClass);
    }
  };
  
  const handleEditClass = (id: string) => {
    toast(`Editing class with ID: ${id}`);
  };
  
  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    toast.success('Class deleted successfully');
  };
  
  // Get unique instructor names for the filter
  const instructors = ['all', ...Array.from(new Set(classes.map(c => c.instructor)))];
  
  // Filter classes based on tab and instructor selection
  const filteredClasses = classes.filter(c => {
    // First apply the tab filter
    const classDate = new Date(c.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const passesTabFilter = 
      activeTab === 'all' || 
      (activeTab === 'today' && classDate.getTime() === today.getTime()) ||
      (activeTab === 'upcoming' && classDate.getTime() > today.getTime()) ||
      (activeTab === 'past' && classDate.getTime() < today.getTime());
    
    // Then apply the instructor filter
    const passesInstructorFilter = selectedInstructor === 'all' || c.instructor === selectedInstructor;
    
    // Return true only if both filters pass
    return passesTabFilter && passesInstructorFilter;
  });

  return {
    classes,
    isAddDialogOpen,
    setIsAddDialogOpen,
    activeTab,
    setActiveTab,
    selectedInstructor,
    setSelectedInstructor,
    instructors,
    newClass,
    setNewClass,
    classPassBookings,
    isLoadingClassPass,
    filteredClasses,
    fetchClassPassBookingsForAllClasses,
    handleAddClass,
    handleEditClass,
    handleDeleteClass
  };
};
