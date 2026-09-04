import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const TwoFactorSetup: React.FC = () => {
  const [code, setCode] = useState('');

  return (
    <div className="space-y-4">
      <div className="p-4 bg-neutral-50 rounded-xl flex flex-col items-center">
        <div className="w-36 h-36 bg-white border border-[#E8E8E8] flex items-center justify-center text-xs text-neutral-400">
          [QR Code]
        </div>
        <p className="text-xs text-[#6B6B6B] mt-2">Scan with Authenticator App</p>
      </div>
      <Input
        label="Enter 6-digit verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
      />
      <Button className="w-full">Verify & Enable 2FA</Button>
    </div>
  );
};
