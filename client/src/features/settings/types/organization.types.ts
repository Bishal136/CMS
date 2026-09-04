export interface IRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface IPermission {
  id: string;
  label: string;
  description: string;
}

export interface IOrganization {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
}
