export type TabName =
  | 'home'
  | 'favorites'
  | 'history'
  | 'profile';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};