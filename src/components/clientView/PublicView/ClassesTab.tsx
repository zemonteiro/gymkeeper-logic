
import React from 'react';
import { TabsContent } from '../../ui/tabs';

const ClassesTab = () => {
  return (
    <TabsContent value="classes" className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Our Classes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Morning Yoga",
            instructor: "Jane Smith",
            time: "Mon, Wed, Fri • 8:00 AM",
            description: "Start your day with a refreshing yoga session focusing on flexibility and mindfulness."
          },
          {
            title: "HIIT Training",
            instructor: "Mike Johnson",
            time: "Tue, Thu • 5:30 PM",
            description: "High-intensity interval training to boost metabolism and improve cardiovascular health."
          },
          {
            title: "Strength Fundamentals",
            instructor: "Chris Davis",
            time: "Mon, Wed, Fri • 6:00 PM",
            description: "Learn proper form and technique for all major strength exercises."
          },
          {
            title: "Spin Class",
            instructor: "Sarah Wilson",
            time: "Tue, Thu, Sat • 9:00 AM",
            description: "Indoor cycling workout that focuses on endurance, strength, and high intensity."
          }
        ].map((cls, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-subtle">
            <h3 className="text-xl font-bold mb-1">{cls.title}</h3>
            <p className="text-gym-muted mb-2">Instructor: {cls.instructor}</p>
            <p className="text-sm text-gym-accent mb-4">{cls.time}</p>
            <p className="mb-4">{cls.description}</p>
            <p className="text-sm italic">Login to book classes</p>
          </div>
        ))}
      </div>
    </TabsContent>
  );
};

export default ClassesTab;
