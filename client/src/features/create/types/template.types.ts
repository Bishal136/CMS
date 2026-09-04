export interface ITemplate {
  id: string;
  _id?: string;
  title: string;
  content: string;
  category: string;
  emoji?: string;
  isPersonal?: boolean;
  isDiscoverable?: boolean;
  createdAt?: string;
}

export interface ITemplateCategory {
  id: string;
  name: string;
}

export interface ITemplatesApiResponse {
  success: boolean;
  data: ITemplate[];
  message?: string;
}
