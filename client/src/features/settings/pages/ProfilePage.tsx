import React from 'react';
import { ProfileForm } from '../components/account/ProfileForm';

export const ProfilePage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-4">Profile</h2>
      <ProfileForm />
    </div>
  );
};
