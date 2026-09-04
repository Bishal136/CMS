import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { openComposer, closeComposer, setContent, toggleChannel } from '../slices/composerSlice';

export function usePostComposer() {
  const dispatch = useAppDispatch();
  const composer = useAppSelector((state) => state.composer);

  return {
    ...composer,
    open: () => dispatch(openComposer()),
    close: () => dispatch(closeComposer()),
    updateContent: (val: string) => dispatch(setContent(val)),
    toggleChannelSelect: (chId: string) => dispatch(toggleChannel(chId)),
  };
}
