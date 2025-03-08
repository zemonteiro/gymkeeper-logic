
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  className, 
  children,
  delay = 0 
}) => {
  return (
    <div 
      className={cn(
        "neo-card animate-scale-in", 
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'backwards'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
