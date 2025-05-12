export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'author' | 'reader';
} 