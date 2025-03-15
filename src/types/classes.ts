
import { GymClass } from '@/components/ui/ClassCard';

export interface ClassFormData {
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  description: string;
}

// Sample class data
export const sampleClasses: GymClass[] = [
  {
    id: '1',
    name: 'Morning Yoga',
    instructor: 'Jane Smith',
    date: '2023-05-20',
    time: '8:00 AM',
    duration: 60,
    capacity: 20,
    enrolled: 15,
    description: 'Start your day with a refreshing yoga session focusing on flexibility and mindfulness.'
  },
  {
    id: '2',
    name: 'HIIT Training',
    instructor: 'Mike Johnson',
    date: '2023-05-20',
    time: '5:30 PM',
    duration: 45,
    capacity: 15,
    enrolled: 8,
    description: 'High-intensity interval training to boost metabolism and improve cardiovascular health.'
  },
  {
    id: '3',
    name: 'Pilates',
    instructor: 'Sarah Brown',
    date: '2023-05-21',
    time: '10:00 AM',
    duration: 50,
    capacity: 12,
    enrolled: 10,
    description: 'Strengthen your core and improve posture with this comprehensive Pilates class.'
  },
  {
    id: '4',
    name: 'Zumba',
    instructor: 'David Wilson',
    date: '2023-05-21',
    time: '6:00 PM',
    duration: 60,
    capacity: 25,
    enrolled: 22,
    description: 'Dance your way to fitness with this high-energy Zumba class featuring Latin and international music.'
  },
  {
    id: '5',
    name: 'Spin Class',
    instructor: 'Lisa Chen',
    date: '2023-05-22',
    time: '7:00 AM',
    duration: 45,
    capacity: 15,
    enrolled: 12,
    description: 'Get your cardio in with this intense indoor cycling session suitable for all fitness levels.'
  },
  {
    id: '6',
    name: 'Strength Training',
    instructor: 'Jake Thomas',
    date: '2023-05-22',
    time: '4:00 PM',
    duration: 50,
    capacity: 10,
    enrolled: 6,
    description: 'Build muscle and improve overall strength through focused resistance training exercises.'
  },
];
