import React from 'react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ChannelWelcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center bg-white border border-[#E8E8E8] rounded-2xl max-w-md mx-auto my-12">
      <div className="text-4xl mb-2">🎉</div>
      <h3 className="text-lg font-bold text-neutral-900">Welcome to your Queue!</h3>
      <p className="text-xs text-[#6B6B6B] mt-1 mb-6">
        Your channel is linked! You can now start scheduling posts according to your schedule.
      </p>
      <Button onClick={() => navigate('/dashboard/publish/queue')}>
        Go to Queue
      </Button>
    </div>
  );
};
