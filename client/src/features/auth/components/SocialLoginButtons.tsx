import React from 'react';
import { Button } from '@/components/ui/Button';

export const SocialLoginButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => (window.location.href = '/api/v1/auth/google')}
        className="flex items-center gap-2"
      >
        <span>🌐</span>
        <span>Google</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => (window.location.href = '/api/v1/auth/github')}
        className="flex items-center gap-2"
      >
        <span>🐙</span>
        <span>GitHub</span>
      </Button>
    </div>
  );
};
