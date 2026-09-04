import React from 'react';
import { Avatar } from './Avatar';

export interface IAvatarUploadProps {
  src?: string;
  name?: string;
  onUpload: (file: File) => void;
}

export const AvatarUpload: React.FC<IAvatarUploadProps> = ({ src, name, onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="relative inline-block group">
      <Avatar src={src} name={name} size="xl" />
      <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        Change
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
    </div>
  );
};
