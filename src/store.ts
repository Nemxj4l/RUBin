import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- TYPES ---
export type User = {
  id: string;
  username: string;
  password?: string;
  name: string;
  avatar: string;
  about: string;
  website: string;
  followers: string[];
  following: string[];
  savedPins: string[];
};

export type Pin = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  likes: string[];
  categories: string[];
  tags: string[];
  createdAt: number;
};

export type Comment = {
  id: string;
  pinId: string;
  authorId: string;
  text: string;
  likes: string[];
  createdAt: number;
};

export type Notification = {
  id: string;
  userId: string; 
  type: 'like' | 'comment' | 'follow' | 'save';
  sourceUserId: string;
  text: string;
  read: boolean;
  createdAt: number;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
};

export type Chat = {
  id: string;
  participants: string[];
  messages: Message[];
};

export const CATEGORIES = [
  'Искусство', 'Дизайн', 'Фотография', 'Еда', 'Природа', 
  'Мода', 'Технологии', 'Архитектура', 'Автомобили', 'Животные'
];

// --- MOCK DATA ---
const MOCK_USERS: User[] = [
  { id: 'u1', username: 'admin', password: 'qwerty', name: 'Администратор', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop', about: 'Создатель контента', website: 'https://admin.com', followers: ['u2'], following: ['u2', 'u3'], savedPins: ['p2', 'p3'] },
  { id: 'u2', username: 'maria_art', password: '123', name: 'Мария Искусство', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', about: 'Художник и дизайнер', website: '', followers: ['u1', 'u3'], following: ['u1'], savedPins: ['p1'] },
  { id: 'u3', username: 'tech_guru', password: '123', name: 'Иван Техник', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop', about: 'Гаджеты и код', website: 'https://techguru.ru', followers: ['u1'], following: ['u2'], savedPins: [] }
];

const MOCK_PINS: Pin[] = [
  { id: 'p1', title: 'Минималистичный интерьер', description: 'Красивая светлая комната.', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&fit=crop', authorId: 'u1', likes: ['u2', 'u3'], categories: ['Дизайн', 'Архитектура'], tags: ['#интерьер', '#свет'], createdAt: Date.now() - 10000000 },
  { id: 'p2', title: 'Космический арт', description: 'Рисунок космоса', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&fit=crop', authorId: 'u2', likes: ['u1'], categories: ['Искусство'], tags: ['#космос', '#арт'], createdAt: Date.now() - 20000000 },
  { id: 'p3', title: 'Рабочее место разработчика', description: 'Много мониторов', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&fit=crop', authorId: 'u3', likes: ['u1', 'u2'], categories: ['Технологии', 'Фотография'], tags: ['#код', '#pc'], createdAt: Date.now() - 5000000 },
  { id: 'p4', title: 'Вкусный завтрак', description: 'Панкейки с сиропом', imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&fit=crop', authorId: 'u2', likes: [], categories: ['Еда'], tags: ['#завтрак'], createdAt: Date.now() - 3000000 },
  { id: 'p5', title: 'Осенний лес', description: 'Золотая осень', imageUrl: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?w=600&fit=crop', authorId: 'u1', likes: ['u2'], categories: ['Природа', 'Фотография'], tags: ['#осень', '#лес'], createdAt: Date.now() - 15000000 },
];

const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', pinId: 'p1', authorId: 'u2', text: 'Очень красиво!', likes: ['u1'], createdAt: Date.now() - 500000 }
];

// --- STORE ---
interface AppState {
  theme: 'light' | 'dark';
  currentUser: User | null;
  users: User[];
  pins: Pin[];
  comments: Comment[];
  notifications: Notification[];
  chats: Chat[];
  searchQuery: string;
  
  // Actions
  toggleTheme: () => void;
  register: (data: Partial<User> & { username: string; password?: string }) => void;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setSearchQuery: (q: string) => void;
  
  addPin: (pin: Omit<Pin, 'id' | 'authorId' | 'likes' | 'createdAt'>) => void;
  deletePin: (id: string) => void;
  likePin: (id: string) => void;
  savePin: (id: string) => void;
  
  addComment: (pinId: string, text: string) => void;
  likeComment: (commentId: string) => void;
  
  followUser: (targetUserId: string) => void;
  
  sendMessage: (targetUserId: string, text: string) => void;
  markNotificationsRead: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      currentUser: null,
      users: MOCK_USERS,
      pins: MOCK_PINS,
      comments: MOCK_COMMENTS,
      notifications: [],
      chats: [
        { id: 'chat1', participants: ['u1', 'u2'], messages: [{ id: 'm1', senderId: 'u2', text: 'Привет! Классные пины.', createdAt: Date.now() - 10000 }] }
      ],
      searchQuery: '',

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setSearchQuery: (q) => set({ searchQuery: q }),
      
      register: (data) => set((state) => {
        const newUser: User = {
          id: 'u' + Date.now(),
          username: data.username,
          password: data.password,
          name: data.name || data.username,
          avatar: data.avatar || 'https://via.placeholder.com/200?text=' + data.username[0].toUpperCase(),
          about: data.about || '',
          website: data.website || '',
          followers: [], following: [], savedPins: []
        };
        return { users: [...state.users, newUser], currentUser: newUser };
      }),
      
      login: (username, password) => {
        const user = get().users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (user && (!user.password || user.password === password)) {
          set({ currentUser: user }); 
          return true; 
        }
        return false;
      },
      
      logout: () => set({ currentUser: null }),
      
      updateProfile: (data) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const updatedUser = { ...cu, ...data };
        return {
          currentUser: updatedUser,
          users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
        };
      }),

      addPin: (pinData) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const newPin: Pin = {
          ...pinData,
          id: 'p' + Date.now(),
          authorId: cu.id,
          likes: [],
          createdAt: Date.now()
        };
        return { pins: [newPin, ...state.pins] };
      }),

      deletePin: (id) => set((state) => ({
        pins: state.pins.filter(p => p.id !== id),
        comments: state.comments.filter(c => c.pinId !== id)
      })),

      likePin: (id) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const userId = cu.id;
        
        let notifs = [...state.notifications];
        const updatedPins = state.pins.map(pin => {
          if (pin.id === id) {
            const hasLiked = pin.likes.includes(userId);
            if (!hasLiked && pin.authorId !== userId) {
               notifs.unshift({ id: 'n'+Date.now(), userId: pin.authorId, type: 'like', sourceUserId: userId, text: 'лайкнул ваш пин', read: false, createdAt: Date.now() });
            }
            return { ...pin, likes: hasLiked ? pin.likes.filter(uid => uid !== userId) : [...pin.likes, userId] };
          }
          return pin;
        });
        return { pins: updatedPins, notifications: notifs };
      }),

      savePin: (id) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const userId = cu.id;
        
        const isSaved = cu.savedPins.includes(id);
        const updatedUser = {
          ...cu,
          savedPins: isSaved ? cu.savedPins.filter(pid => pid !== id) : [...cu.savedPins, id]
        };

        const pin = state.pins.find(p => p.id === id);
        let notifs = [...state.notifications];
        if (!isSaved && pin && pin.authorId !== userId) {
          notifs.unshift({ id: 'n'+Date.now(), userId: pin.authorId, type: 'save', sourceUserId: userId, text: 'сохранил ваш пин', read: false, createdAt: Date.now() });
        }

        return {
          currentUser: updatedUser,
          users: state.users.map(u => u.id === userId ? updatedUser : u),
          notifications: notifs
        };
      }),

      addComment: (pinId, text) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const userId = cu.id;
        const newComment: Comment = { id: 'c'+Date.now(), pinId, authorId: userId, text, likes: [], createdAt: Date.now() };
        
        const pin = state.pins.find(p => p.id === pinId);
        let notifs = [...state.notifications];
        if (pin && pin.authorId !== userId) {
          notifs.unshift({ id: 'n'+Date.now(), userId: pin.authorId, type: 'comment', sourceUserId: userId, text: 'прокомментировал ваш пин: "' + text + '"', read: false, createdAt: Date.now() });
        }
        
        return { comments: [...state.comments, newComment], notifications: notifs };
      }),

      likeComment: (commentId) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const userId = cu.id;
        return {
          comments: state.comments.map(c => {
            if (c.id === commentId) {
              const hasLiked = c.likes.includes(userId);
              return { ...c, likes: hasLiked ? c.likes.filter(uid => uid !== userId) : [...c.likes, userId] };
            }
            return c;
          })
        };
      }),

      followUser: (targetId) => set((state) => {
        const cu = state.currentUser;
        if (!cu || cu.id === targetId) return state;
        const userId = cu.id;

        const isFollowing = cu.following.includes(targetId);
        
        const updatedCurrentUser = {
          ...cu,
          following: isFollowing ? cu.following.filter(id => id !== targetId) : [...cu.following, targetId]
        };

        let notifs = [...state.notifications];
        const updatedUsers = state.users.map(u => {
          if (u.id === userId) return updatedCurrentUser;
          if (u.id === targetId) {
            if (!isFollowing) {
              notifs.unshift({ id: 'n'+Date.now(), userId: targetId, type: 'follow', sourceUserId: userId, text: 'подписался на вас', read: false, createdAt: Date.now() });
            }
            return {
              ...u,
              followers: isFollowing ? u.followers.filter(id => id !== userId) : [...u.followers, userId]
            };
          }
          return u;
        });

        return { currentUser: updatedCurrentUser, users: updatedUsers, notifications: notifs };
      }),

      sendMessage: (targetId, text) => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const userId = cu.id;

        const existingChat = state.chats.find(c => c.participants.includes(userId) && c.participants.includes(targetId) && c.participants.length === 2);
        const newMessage: Message = { id: 'm'+Date.now(), senderId: userId, text, createdAt: Date.now() };

        if (existingChat) {
          return {
            chats: state.chats.map(c => c.id === existingChat.id ? { ...c, messages: [...c.messages, newMessage] } : c)
          };
        } else {
          const newChat: Chat = { id: 'ch'+Date.now(), participants: [userId, targetId], messages: [newMessage] };
          return { chats: [...state.chats, newChat] };
        }
      }),

      markNotificationsRead: () => set((state) => {
        const cu = state.currentUser;
        if (!cu) return state;
        const userId = cu.id;
        return {
          notifications: state.notifications.map(n => n.userId === userId ? { ...n, read: true } : n)
        };
      })
    }),
    {
      name: 'rubin-storage',
    }
  )
);
