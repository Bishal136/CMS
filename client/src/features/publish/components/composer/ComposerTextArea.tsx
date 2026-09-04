import React from 'react';

export interface IComposerTextAreaProps {
  value: string;
  onChange: (val: string) => void;
  charLimit?: number;
}

export const ComposerTextArea: React.FC<IComposerTextAreaProps> = ({
  value,
  onChange,
  charLimit = 280,
}) => {
  const remaining = charLimit - value.length;

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="What would you like to share?"
        className="w-full p-3 text-sm bg-white border border-[#E8E8E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493] resize-none"
      />
      <div className="flex justify-end mt-1 text-xs text-[#6B6B6B]">
        <span className={remaining < 0 ? 'text-red-500 font-bold' : ''}>
          {remaining} characters left
        </span>
      </div>
    </div>
  );
};
