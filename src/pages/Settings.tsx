import { useState } from 'react';
import { useStore } from '../store';
import clsx from 'clsx';

export function Settings() {
  const { currentUser, updateProfile } = useStore();
  
  if (!currentUser) return null;

  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    about: currentUser.about || '',
    website: currentUser.website || '',
    username: currentUser.username || '',
    avatar: currentUser.avatar || ''
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Изменение профиля' },
    { id: 'account', label: 'Управление аккаунтом' },
    { id: 'privacy', label: 'Конфиденциальность' },
    { id: 'notifications', label: 'Уведомления' },
  ];

  return (
    <div className="pt-24 pb-8 min-h-screen bg-white dark:bg-darkBg transition-colors">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "text-left px-4 py-3 rounded-xl font-semibold transition-colors",
                  activeTab === tab.id 
                    ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" 
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {activeTab === 'profile' && (
            <div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Изменение профиля</h1>
              <p className="text-gray-500 mb-8">Сохраняйте свои личные данные в тайне. Информация, которую вы добавите здесь, будет видна всем.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Фотография</label>
                  <div className="flex items-center gap-4">
                    <img src={formData.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border dark:border-gray-700" />
                    <input 
                      type="text" 
                      value={formData.avatar}
                      onChange={e => setFormData({...formData, avatar: e.target.value})}
                      placeholder="URL изображения"
                      className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Имя</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Имя пользователя</label>
                    <input 
                      type="text" 
                      value={formData.username}
                      onChange={e => setFormData({...formData, username: e.target.value})}
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">О себе</label>
                  <textarea 
                    value={formData.about}
                    onChange={e => setFormData({...formData, about: e.target.value})}
                    rows={4}
                    placeholder="Расскажите немного о себе..."
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Веб-сайт</label>
                  <input 
                    type="text" 
                    value={formData.website}
                    onChange={e => setFormData({...formData, website: e.target.value})}
                    placeholder="Добавьте ссылку на свой сайт"
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button type="submit" className="px-6 py-3 bg-pinRed hover:bg-pinRedHover text-white font-bold rounded-full transition-colors">
                    Сохранить
                  </button>
                  {saved && <span className="text-green-500 font-medium">Профиль успешно обновлен!</span>}
                </div>
              </form>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div className="py-20 text-center text-gray-500 dark:text-gray-400">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{tabs.find(t => t.id === activeTab)?.label}</h2>
              <p>Эта функция находится в разработке и скоро будет доступна.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
