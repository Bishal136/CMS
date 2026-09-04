import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { SocialPlatformGrid } from '@/components/common/SocialPlatformGrid';

export interface IConnectChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectChannelModal: React.FC<IConnectChannelModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect a Social Channel">
      <div className="space-y-4">
        <p className="text-xs text-[#6B6B6B]">
          Choose the social media platform you want to connect to CMSFlow:
        </p>
        <SocialPlatformGrid onSelect={(platform) => {
          window.location.href = `/api/v1/channels/connect/${platform}`;
        }} />
      </div>
    </Modal>
  );
};
