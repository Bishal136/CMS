import React from 'react';

export interface IMoreTimesButtonProps {
  onClick?: () => void;
}

export const MoreTimesButton: React.FC<IMoreTimesButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center w-full pt-4 pb-8">
      <button
        type="button"
        onClick={onClick}
        className="text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
      >
        + More Recommended Times
      </button>
    </div>
  );
};
