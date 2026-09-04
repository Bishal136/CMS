import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ITemplate } from '../../types/template.types';
import { Button } from '@/components/ui/Button';

export interface ITemplateDetailModalProps {
  template: ITemplate | null;
  onClose: () => void;
}

export const TemplateDetailModal: React.FC<ITemplateDetailModalProps> = ({ template, onClose }) => {
  if (!template) return null;

  return (
    <Modal isOpen={!!template} onClose={onClose} title={template.title}>
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 rounded-lg text-sm text-neutral-800 whitespace-pre-wrap">
          {template.content}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Use This Template</Button>
        </div>
      </div>
    </Modal>
  );
};
