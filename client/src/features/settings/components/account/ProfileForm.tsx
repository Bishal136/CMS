import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AvatarUpload } from '@/components/ui/AvatarUpload';

export const ProfileForm: React.FC = () => {
  const [name, setName] = useState('Bishal Biswas');
  const [email, setEmail] = useState('bishalbiswas2027@gmail.com');

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <label className="block text-xs font-semibold text-[#6B6B6B] uppercase mb-2">Profile Picture</label>
        <AvatarUpload name={name} onUpload={() => {}} />
      </div>
      <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button>Save Changes</Button>
    </div>
  );
};
