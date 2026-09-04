import React from 'react';
import { Button } from '@/components/ui/Button';
import { FeatureCheckItem } from './FeatureCheckItem';
import { cn } from '@/utils/cn';

export interface IPricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  onSelect?: () => void;
}

export const PricingCard: React.FC<IPricingCardProps> = ({
  name,
  price,
  period = '/month',
  description,
  features,
  isPopular,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        'p-6 bg-white rounded-2xl border transition-all flex flex-col justify-between',
        isPopular ? 'border-[#FF1493] shadow-lg relative' : 'border-[#E8E8E8]'
      )}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF1493] text-white text-xs px-3 py-0.5 rounded-full font-semibold">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{name}</h3>
        <p className="text-xs text-[#6B6B6B] mt-1">{description}</p>
        <div className="my-6">
          <span className="text-3xl font-extrabold text-neutral-900">{price}</span>
          <span className="text-xs text-[#6B6B6B]">{period}</span>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((f, i) => (
            <FeatureCheckItem key={i} text={f} />
          ))}
        </ul>
      </div>
      <Button
        variant={isPopular ? 'primary' : 'outline'}
        className="w-full"
        onClick={onSelect}
      >
        Choose {name}
      </Button>
    </div>
  );
};
