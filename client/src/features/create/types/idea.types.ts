export type TIdeaStatus = 'unassigned' | 'todo' | 'in-progress' | 'in_progress' | 'done';

export interface IIdea {
  id: string;
  _id?: string;
  title: string;
  content?: string;
  description?: string;
  status: TIdeaStatus;
  columnId?: string;
  groupName?: string;
  order?: number;
  previewIllustration?: string;
  tags?: string[];
  createdAt?: string;
}

export interface IIdeaColumn {
  id: string;
  title: string;
  ideas: IIdea[];
  isCustom?: boolean;
}

export interface IIdeaGroup {
  id?: string;
  _id?: string;
  name: string;
  order?: number;
}

export interface IIdeasApiResponse {
  success: boolean;
  data: {
    ideas: IIdea[];
    groups: IIdeaGroup[];
  };
}
