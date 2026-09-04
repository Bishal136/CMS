import React, { useRef } from 'react';
import { cn } from '@/utils/cn';

export interface IFileUploadProps {
  onFilesSelected: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export const FileUpload: React.FC<IFileUploadProps> = ({
  onFilesSelected,
  accept = 'image/*,video/*',
  multiple = false,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={cn(
        'border-2 border-dashed border-[#E8E8E8] hover:border-[#FF1493] rounded-xl p-6 text-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-[#FFF1F7]/30',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => e.target.files && onFilesSelected(e.target.files)}
      />
      <div className="text-2xl mb-2">📁</div>
      <p className="text-sm font-medium text-neutral-800">Click to upload or drag and drop</p>
      <p className="text-xs text-[#6B6B6B] mt-1">PNG, JPG, GIF, MP4 up to 50MB</p>
    </div>
  );
};
