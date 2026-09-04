import React from 'react';

export interface IRadioOption {
  value: string;
  label: string;
}

export interface IRadioGroupProps {
  name: string;
  options: IRadioOption[];
  selectedValue: string;
  onChange: (val: string) => void;
  label?: string;
}

export const RadioGroup: React.FC<IRadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  label,
}) => {
  return (
    <div className="space-y-2">
      {label && <span className="block text-sm font-medium text-neutral-700">{label}</span>}
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm text-neutral-800">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-[#FF1493] w-4 h-4 cursor-pointer"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
