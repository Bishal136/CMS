import React from 'react';
import { cn } from '@/utils/cn';

export interface ISkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<ISkeletonProps> = ({ className }) => {
  return <div className={cn('animate-pulse bg-neutral-200 rounded', className)} />;
};
