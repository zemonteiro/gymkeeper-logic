
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
  isEnabled: true // Default to enabled for demonstration purposes
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
  
  console.log(`Fetching ClassPass bookings for class: ${classId}`);
  
  try {
    // This is a mock implementation - in a real app, you would call the actual ClassPass API
    // For demo purposes, we'll return mock data based on class ID
    const mockBookingsMap: { [key: string]: number } = {
      '1': 4,  // 4 ClassPass bookings for Morning Yoga
      '2': 2,  // 2 ClassPass bookings for HIIT Training
      '3': 3,  // 3 ClassPass bookings for Pilates
      '4': 5,  // 5 ClassPass bookings for Zumba
      '5': 2,  // 2 ClassPass bookings for Spin Class
      '6': 1,  // 1 ClassPass booking for Strength Training
    };
    
    const bookingCount = mockBookingsMap[classId] || Math.floor(Math.random() * 3); // Random 0-2 for other classes
    
    // Generate the specified number of mock bookings
    const bookings: ClassPassBooking[] = [];
    for (let i = 0; i < bookingCount; i++) {
      bookings.push({
        id: `cp-${Math.random().toString(36).substring(2, 9)}`,
        classId,
        classPassUserId: `cp-user-${i + 1}`,
        userName: `ClassPass User ${i + 1}`,
        bookingTime: new Date().toISOString(),
        status: 'confirmed'
      });
    }
    
    return bookings;
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
  
  if (!config.isEnabled) {
    console.log('ClassPass integration not properly configured');
    return false;
  }
  
  try {
    console.log(`Registering class with ClassPass: ${gymClass.name}`);
    // In a real implementation, you would make an API call to ClassPass
    
    // For demo purposes, we'll just return true
    toast.success(`Class "${gymClass.name}" registered with ClassPass`);
    return true;
  } catch (error) {
    console.error('Error registering class with ClassPass:', error);
    toast.error('Failed to register class with ClassPass');
    return false;
  }
};
