import React from 'react';
import { Button } from '@/components/ui/Button';

export interface IComposerActionsProps {
  onSaveDraft?: () => void;
  onSchedule?: () => void;
  onPostNow?: () => void;
}

export const ComposerActions: React.FC<IComposerActionsProps> = ({
  onSaveDraft,
  onSchedule,
  onPostNow,
}) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-[#E8E8E8] mt-4">
      <Button variant="outline" size="sm" onClick={onSaveDraft}>
        Save as Draft
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onSchedule}>
          Add to Queue
        </Button>
        <Button size="sm" onClick={onPostNow}>
          Post Now
        </Button>
      </div>
    </div>
  );
};
