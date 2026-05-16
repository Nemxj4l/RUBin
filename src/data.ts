import { User, Pin, Notification } from './types';

export const currentUserMock: User = {
  id: 'user1',
  username: 'current_user',
  fullName: 'Иван Иванов',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150',
  about: 'Люблю дизайн, архитектуру и технологии.',
  website: 'https://ivan-design.com',
  followers: 1250,
  following: 340,
};

export const usersMock: Record<string, User> = {
  'user1': currentUserMock,
  'user2': {
    id: 'user2',
    username: 'art_lover',
    fullName: 'Анна Смирнова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    about: 'Художник-иллюстратор.',
    website: '',
    followers: 5000,
    following: 120,
  },
  'user3': {
    id: 'user3',
    username: 'tech_guru',
    fullName: 'Алексей Петров',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150',
    about: 'Гаджеты и технологии',
    website: 'https://techguru.ru',
    followers: 890,
    following: 450,
  }
};

export const initialPins: Pin[] = [
  {
    id: 'pin1',
    title: 'Минималистичный интерьер',
    description: 'Идеи для гостиной в скандинавском стиле.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
    link: 'https://interior.com',
    userId: 'user2',
    saves: 145,
    likes: ['user1'],
    categories: ['Дизайн', 'Интерьер'],
    comments: [],
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    tags: ['interior', 'design', 'minimalism']
  },
  {
    id: 'pin2',
    title: 'Кодинг сетап',
    description: 'Идеальное рабочее место программиста.',
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=600',
    link: 'https://setup.com',
    userId: 'user3',
    saves: 320,
    likes: [],
    categories: ['Технологии'],
    comments: [],
    createdAt: new Date(Date.now() - 200000000).toISOString(),
    tags: ['tech', 'workspace', 'coding']
  },
  {
    id: 'pin3',
    title: 'Вдохновение природой',
    description: 'Красивый вид на горы.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    link: '',
    userId: 'user2',
    saves: 89,
    likes: ['user3'],
    categories: ['Природа', 'Путешествия'],
    comments: [],
    createdAt: new Date(Date.now() - 300000000).toISOString(),
    tags: ['nature', 'mountains', 'travel']
  },
  {
    id: 'pin4',
    title: 'Абстрактное искусство',
    description: 'Современная живопись.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=600',
    link: 'https://art.com',
    userId: 'user1',
    saves: 12,
    likes: ['user2', 'user3'],
    categories: ['Искусство'],
    comments: [
      { id: 'c1', userId: 'user2', text: 'Потрясающие цвета!', createdAt: new Date().toISOString(), likes: ['user1'] }
    ],
    createdAt: new Date(Date.now() - 400000000).toISOString(),
    tags: ['art', 'abstract', 'painting']
  },
  {
    id: 'pin5',
    title: 'Рецепт пасты',
    description: 'Быстрый и вкусный ужин.',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600',
    link: 'https://foodblog.ru',
    userId: 'user2',
    saves: 450,
    likes: [],
    categories: ['Еда'],
    comments: [],
    createdAt: new Date(Date.now() - 500000000).toISOString(),
    tags: ['food', 'recipe', 'pasta']
  },
  {
    id: 'pin6',
    title: 'Дизайн мобильного приложения',
    description: 'UI/UX концепт.',
    imageUrl: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600',
    link: 'https://dribbble.com',
    userId: 'user3',
    saves: 890,
    likes: ['user1', 'user2'],
    categories: ['Дизайн', 'Технологии'],
    comments: [],
    createdAt: new Date(Date.now() - 600000000).toISOString(),
    tags: ['ui', 'ux', 'design', 'mobile']
  }
];

export const initialNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'save',
    userId: 'user2',
    pinId: 'pin4',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'notif2',
    type: 'follow',
    userId: 'user3',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'notif3',
    type: 'comment',
    userId: 'user2',
    pinId: 'pin4',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];
