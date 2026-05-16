export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  about: string;
  website: string;
  followers: number;
  following: number;
  password?: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  likes: string[];
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  userId: string;
  saves: number;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  tags: string[];
  categories: string[];
}

export interface Notification {
  id: string;
  type: 'save' | 'follow' | 'comment';
  userId: string;
  pinId?: string;
  read: boolean;
  createdAt: string;
}
