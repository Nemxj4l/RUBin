import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle, Search, User, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';

export function Header() {
  const { 
    currentUser, theme, toggleTheme, logout, 
    notifications, markNotificationsRead, searchQuery, setSearchQuery 
  } = useStore();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => n.userId === currentUser?.id && !n.read);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowProfileMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-darkBg z-50 flex items-center px-4 md:px-6 shadow-sm">
      <Link to="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex-shrink-0">
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">R</div>
      </Link>
      
      <nav className="hidden md:flex ml-2 space-x-2 flex-shrink-0">
        <Link to="/" className="px-4 py-3 rounded-full font-semibold bg-brandBlue text-white">Главная</Link>
        <Link to="/create" className="px-4 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200">Создать</Link>
      </nav>

      <div className="flex-1 mx-4 max-w-full">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full bg-gray-100 dark:bg-darkSurface dark:text-white dark:border-darkBorder border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-full py-3 pl-10 pr-4 block"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
        <button onClick={toggleTheme} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300">
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setShowNotifs(!showNotifs);
              if (unreadNotifs.length > 0) markNotificationsRead();
            }}
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300 relative"
          >
            <Bell size={24} />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full border-2 border-white dark:border-darkBg"></span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-darkSurface rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-4 z-50">
              <h3 className="px-4 text-lg font-bold mb-2 dark:text-white">Уведомления</h3>
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.filter(n => n.userId === currentUser.id).length === 0 ? (
                  <p className="px-4 text-gray-500 dark:text-gray-400">Нет новых уведомлений</p>
                ) : (
                  notifications.filter(n => n.userId === currentUser.id).sort((a,b)=>b.createdAt - a.createdAt).map(n => (
                    <div key={n.id} className={clsx("px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-start gap-3", !n.read && "bg-blue-50 dark:bg-gray-800/50")}>
                      <div className="flex-1">
                        <p className="text-sm dark:text-gray-200">
                          <span className="font-bold">Пользователь</span> {n.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{format(n.createdAt, 'dd MMM yyyy HH:mm', { locale: ru })}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Link to="/messages" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300">
          <MessageCircle size={24} />
        </Link>

        <div className="relative" ref={menuRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <img src={currentUser.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-darkSurface rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50">
              <div className="px-4 py-2 flex items-center gap-3 border-b dark:border-gray-700">
                <img src={currentUser.avatar} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold dark:text-white">{currentUser.name}</p>
                  <p className="text-sm text-gray-500">@{currentUser.username}</p>
                </div>
              </div>
              
              <div className="py-2">
                <Link to={`/profile/${currentUser.id}`} onClick={() => setShowProfileMenu(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-gray-200">
                  <User size={20} /> Профиль
                </Link>
                <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 dark:text-gray-200">
                  <Settings size={20} /> Настройки
                </Link>
                <button 
                  onClick={() => { setShowProfileMenu(false); logout(); }} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-red-500"
                >
                  <LogOut size={20} /> Выйти
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
