
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCard from './AnimatedCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
  delay = 0
}) => {
  return (
    <AnimatedCard 
      className={cn("flex items-start justify-between", className)} 
      delay={delay}
    >
      <div>
        <p className="text-gym-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
        
        {trend && (
          <div className="flex items-center mt-2">
            <span 
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 rounded-xl bg-gym-secondary">
        {React.cloneElement(icon, { size: 24 })}
      </div>
    </AnimatedCard>
  );
};

export default StatsCard;
