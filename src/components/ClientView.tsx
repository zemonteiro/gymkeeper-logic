
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import LoginDialog from './clientView/LoginDialog';
import PublicView from './clientView/PublicView';
import MemberDashboard from './clientView/MemberDashboard';

const ClientView = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials against a backend
    if (email && password) {
      setIsLoggedIn(true);
      toast({
        title: "Logged In",
        description: "You have successfully logged in",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive"
      });
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client View</h1>
          <p className="text-gym-muted">Preview the website as seen by gym members</p>
        </div>
        <div>
          {isLoggedIn ? (
            <Button variant="outline" onClick={handleLogout}>
              Exit Client View (Log Out)
            </Button>
          ) : (
            <LoginDialog 
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          )}
        </div>
      </div>
      
      {isLoggedIn ? (
        <MemberDashboard />
      ) : (
        <PublicView />
      )}
    </div>
  );
};

export default ClientView;
