import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ChannelSelector } from './ChannelSelector';
import { ComposerTextArea } from './ComposerTextArea';
import { MediaUploader } from './MediaUploader';
import { PostPreview } from './PostPreview';
import { ComposerActions } from './ComposerActions';
import { useCreatePostMutation } from '../../services/postsApi';
import { useGetChannelsQuery } from '@/features/channels/services/channelsApi';
import { Clock } from 'lucide-react';

export interface IPostComposerProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  initialDate?: string;
  initialTime?: string;
  initialPlatform?: string;
}

export const PostComposer: React.FC<IPostComposerProps> = ({
  isOpen,
  onClose,
  initialContent = '',
  initialDate,
  initialTime,
  initialPlatform,
}) => {
  const [content, setContent] = useState(initialContent);
  const [channels, setChannels] = useState<string[]>([]);
  const { data: availableChannels = [] } = useGetChannelsQuery();
  const [createPost, { isLoading }] = useCreatePostMutation();

  // Initialize selected channel based on available channels or initialPlatform
  useEffect(() => {
    if (availableChannels.length > 0) {
      if (initialPlatform) {
        const matched = availableChannels.find(
          (c: any) => c.platform.toLowerCase() === initialPlatform.toLowerCase()
        );
        if (matched) {
          setChannels([matched._id || (matched as any).id]);
          return;
        }
      }
      if (channels.length === 0) {
        setChannels([(availableChannels[0] as any)._id || (availableChannels[0] as any).id]);
      }
    }
  }, [availableChannels, initialPlatform, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || '');
    }
  }, [isOpen, initialContent]);

  const toggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((c) => c !== id) : prev) : [...prev, id]
    );
  };

  const getEffectiveChannelIds = () => {
    if (channels.length > 0) return channels;
    if (availableChannels.length > 0) {
      return [(availableChannels[0] as any)._id || (availableChannels[0] as any).id];
    }
    return [];
  };

  const computeScheduledDate = () => {
    if (!initialDate) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(9, 0, 0, 0);
      return d.toISOString();
    }

    let hour = 9;
    let minute = 0;
    if (initialTime) {
      const clean = initialTime.trim();
      const isPM = clean.toUpperCase().includes('PM');
      const timeParts = clean.replace(/(AM|PM)/i, '').trim().split(':');
      if (timeParts.length >= 1) {
        hour = parseInt(timeParts[0], 10);
        if (isPM && hour < 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
      }
      if (timeParts.length >= 2) {
        minute = parseInt(timeParts[1], 10) || 0;
      }
    }

    const [y, m, d] = initialDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d, hour, minute, 0, 0);
    return dateObj.toISOString();
  };

  const handleSaveDraft = async () => {
    if (!content.trim()) return;
    try {
      await createPost({
        content,
        channelIds: getEffectiveChannelIds(),
        status: 'draft',
      }).unwrap();
      onClose();
    } catch {
      onClose();
    }
  };

  const handleSchedule = async () => {
    if (!content.trim()) return;
    try {
      const scheduledAt = computeScheduledDate();
      await createPost({
        content,
        channelIds: getEffectiveChannelIds(),
        status: 'queued',
        scheduledAt,
      }).unwrap();
      onClose();
    } catch {
      onClose();
    }
  };

  const handlePostNow = async () => {
    if (!content.trim()) return;
    try {
      await createPost({
        content,
        channelIds: getEffectiveChannelIds(),
        status: 'sent',
      }).unwrap();
      onClose();
    } catch {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post" className="max-w-2xl">
      {initialTime && (
        <div className="mb-3 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center gap-2 text-xs text-neutral-600">
          <Clock size={14} className="text-emerald-600" />
          <span>
            Scheduling for: <strong className="text-neutral-800">{initialDate || 'Tomorrow'} at {initialTime}</strong>
          </span>
        </div>
      )}

      <ChannelSelector selectedChannels={channels} onToggle={toggleChannel} />
      <ComposerTextArea value={content} onChange={setContent} />
      <MediaUploader />
      <PostPreview content={content} />
      <ComposerActions
        onSaveDraft={handleSaveDraft}
        onSchedule={handleSchedule}
        onPostNow={handlePostNow}
      />
    </Modal>
  );
};
