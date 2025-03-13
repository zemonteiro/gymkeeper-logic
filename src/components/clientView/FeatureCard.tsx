
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-subtle hover:shadow-elevated transition-all">
    <div className="mb-4 text-gym-accent">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gym-muted">{description}</p>
  </div>
);

export default FeatureCard;
