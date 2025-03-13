
import React from 'react';
import { TabsContent } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactTab = () => {
  const { toast } = useToast();
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Your message has been sent to our staff",
    });
  };
  
  return (
    <TabsContent value="contact" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" placeholder="your.email@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help you?" rows={4} />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-6">Find Us</h2>
          <div className="bg-white p-6 rounded-lg shadow-subtle mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gym-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>123 Fitness Street, Gymtown, GT 12345</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gym-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gym-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>info@gymkeeper.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-subtle">
            <h3 className="font-semibold mb-2">Hours of Operation</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>5:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>6:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>7:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ContactTab;
