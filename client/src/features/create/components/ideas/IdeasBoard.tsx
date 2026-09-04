import React, { useState } from 'react';
import { IdeaColumn } from './IdeaColumn';
import { NewGroupForm } from './NewGroupForm';
import { IdeaDetailModal } from './IdeaDetailModal';
import { IIdea, IIdeaColumn } from '../../types/idea.types';
import {
  useGetIdeasQuery,
  useUpdateIdeaMutation,
  useCreateGroupMutation,
} from '../../services/ideasApi';

export interface IIdeasBoardProps {
  onOpenCreateModal?: (defaultStatus?: string) => void;
  onOpenComposerWithIdea?: (content: string) => void;
}

const DEFAULT_SEEDED_IDEAS: IIdea[] = [
  {
    id: 'idea-plan-content',
    title: 'This is a place to plan ✍️ your content',
    content:
      'Save your Ideas before converting them into posts. Brainstorm, plan ahead, and organize your content effortlessly.',
    status: 'unassigned',
    columnId: 'unassigned',
    order: 0,
  },
  {
    id: 'idea-inspirations',
    title: 'Save Inspirations you find online with one click 🤩',
    content:
      'Use ⬇️ Buffer browser extension to save Ideas from the Web. Highlight text, grab images, and stash ideas directly.',
    status: 'unassigned',
    columnId: 'unassigned',
    previewIllustration: 'extension-mockup',
    order: 1,
  },
];

export const IdeasBoard: React.FC<IIdeasBoardProps> = ({
  onOpenCreateModal,
  onOpenComposerWithIdea,
}) => {
  const { data: responseData } = useGetIdeasQuery();
  const [updateIdea] = useUpdateIdeaMutation();
  const [createGroup] = useCreateGroupMutation();

  const [activeIdea, setActiveIdea] = useState<IIdea | null>(null);

  const rawIdeas: IIdea[] =
    responseData?.data?.ideas && responseData.data.ideas.length > 0
      ? responseData.data.ideas.map((item: any) => ({
          ...item,
          id: item._id || item.id,
        }))
      : DEFAULT_SEEDED_IDEAS;

  const customGroups = responseData?.data?.groups || [];

  // Group ideas into standard 4 columns
  const unassignedIdeas = rawIdeas.filter(
    (i) => i.status === 'unassigned' || !i.status
  );
  const todoIdeas = rawIdeas.filter((i) => i.status === 'todo');
  const inProgressIdeas = rawIdeas.filter(
    (i) => i.status === 'in-progress' || i.status === ('in_progress' as any)
  );
  const doneIdeas = rawIdeas.filter((i) => i.status === 'done');

  // Custom groups ideas
  const customColumns: IIdeaColumn[] = customGroups.map((grp: any) => ({
    id: grp._id || grp.id,
    title: grp.name,
    ideas: rawIdeas.filter((i) => i.groupName === grp.name),
    isCustom: true,
  }));

  const standardColumns: IIdeaColumn[] = [
    { id: 'unassigned', title: 'Unassigned', ideas: unassignedIdeas },
    { id: 'todo', title: 'To Do', ideas: todoIdeas },
    { id: 'in-progress', title: 'In Progress', ideas: inProgressIdeas },
    { id: 'done', title: 'Done', ideas: doneIdeas },
  ];

  const allColumns = [...standardColumns, ...customColumns];

  const handleDropIdea = (ideaId: string, targetColumnId: string) => {
    let targetStatus: 'unassigned' | 'todo' | 'in-progress' | 'done' = 'unassigned';
    let groupName = 'General';

    if (['unassigned', 'todo', 'in-progress', 'done'].includes(targetColumnId)) {
      targetStatus = targetColumnId as any;
    } else {
      const foundGroup = customGroups.find((g: any) => (g._id || g.id) === targetColumnId);
      if (foundGroup) {
        groupName = foundGroup.name;
      }
    }

    updateIdea({
      id: ideaId,
      data: { status: targetStatus, groupName },
    });
  };

  const handleAddGroup = (groupName: string) => {
    createGroup({ name: groupName });
  };

  return (
    <div className="flex items-start gap-5 overflow-x-auto pb-6 pt-1 select-none">
      {allColumns.map((col) => (
        <IdeaColumn
          key={col.id}
          column={col}
          onAddIdea={(colId) =>
            onOpenCreateModal ? onOpenCreateModal(colId) : null
          }
          onSelectIdea={setActiveIdea}
          onDropIdea={handleDropIdea}
        />
      ))}

      {/* "+ New Group" Button */}
      <div className="pt-8">
        <NewGroupForm onAddGroup={handleAddGroup} />
      </div>

      {/* Idea Detail Modal */}
      <IdeaDetailModal
        idea={activeIdea}
        onClose={() => setActiveIdea(null)}
        onCreatePost={(content) => {
          setActiveIdea(null);
          if (onOpenComposerWithIdea) {
            onOpenComposerWithIdea(content);
          }
        }}
      />
    </div>
  );
};
