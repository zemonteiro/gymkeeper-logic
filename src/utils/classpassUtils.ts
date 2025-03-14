
import { toast } from 'sonner';

export interface ClassPassConfig {
  apiKey: string;
  venueId: string;
  isEnabled: boolean;
}

export interface ClassPassBooking {
  id: string;
  classId: string;
  classPassUserId: string;
  userName: string;
  bookingTime: string;
  status: 'confirmed' | 'cancelled';
}

// Default ClassPass configuration
const defaultConfig: ClassPassConfig = {
  apiKey: '',
  venueId: '',
  isEnabled: false
};

// Store and retrieve ClassPass configuration from localStorage
export const getClassPassConfig = (): ClassPassConfig => {
  const storedConfig = localStorage.getItem('classpass_config');
  return storedConfig ? JSON.parse(storedConfig) : defaultConfig;
};

export const saveClassPassConfig = (config: ClassPassConfig): void => {
  localStorage.setItem('classpass_config', JSON.stringify(config));
  toast.success('ClassPass configuration saved');
};

// Mock API function to fetch ClassPass bookings
// In a real implementation, this would call the ClassPass API
export const fetchClassPassBookings = async (classId: string): Promise<ClassPassBooking[]> => {
  const config = getClassPassConfig();
  
  if (!config.isEnabled || !config.apiKey || !config.venueId) {
    console.log('ClassPass integration not properly configured');
    return [];
  }
  
  console.log(`Fetching ClassPass bookings for class: ${classId}`);
  
  try {
    // This is a mock implementation - in a real app, you would call the actual ClassPass API
    // Example: const response = await fetch(`https://api.classpass.com/v1/venues/${config.venueId}/classes/${classId}/bookings`, {
    //   headers: { 'Authorization': `Bearer ${config.apiKey}` }
    // });
    
    // For demo purposes, we'll return mock data for certain classes
    if (classId === '1' || classId === '3') {
      return [
        {
          id: `cp-${Math.random().toString(36).substring(2, 9)}`,
          classId,
          classPassUserId: 'cp-user-123',
          userName: 'Alex Johnson (ClassPass)',
          bookingTime: new Date().toISOString(),
          status: 'confirmed'
        }
      ];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching ClassPass bookings:', error);
    toast.error('Failed to fetch ClassPass bookings');
    return [];
  }
};

// Register a class with ClassPass
// In a real implementation, this would call the ClassPass API
export const registerClassWithClassPass = async (gymClass: any): Promise<boolean> => {
  const config = getClassPassConfig();
  
  if (!config.isEnabled || !config.apiKey || !config.venueId) {
    console.log('ClassPass integration not properly configured');
    return false;
  }
  
  try {
    console.log(`Registering class with ClassPass: ${gymClass.name}`);
    // In a real implementation, you would make an API call to ClassPass
    // Example: const response = await fetch(`https://api.classpass.com/v1/venues/${config.venueId}/classes`, {
    //   method: 'POST',
    //   headers: { 
    //     'Authorization': `Bearer ${config.apiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: gymClass.name,
    //     instructor: gymClass.instructor,
    //     startTime: `${gymClass.date}T${gymClass.time}`,
    //     duration: gymClass.duration,
    //     capacity: gymClass.capacity
    //   })
    // });
    
    // For demo purposes, we'll just return true
    toast.success(`Class "${gymClass.name}" registered with ClassPass`);
    return true;
  } catch (error) {
    console.error('Error registering class with ClassPass:', error);
    toast.error('Failed to register class with ClassPass');
    return false;
  }
};
