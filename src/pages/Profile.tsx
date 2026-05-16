import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import { MasonryLayout } from '../components/MasonryLayout';

export function Profile() {
  const { id } = useParams();
  const { users, pins, currentUser, followUser } = useStore();
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

  const profileUser = users.find(u => u.id === id);
  
  if (!profileUser || !currentUser) {
    return <div className="pt-24 text-center">Пользователь не найден</div>;
  }

  const isOwnProfile = profileUser.id === currentUser.id;
  const isFollowing = currentUser.following.includes(profileUser.id);

  const createdPins = pins.filter(p => p.authorId === profileUser.id).sort((a,b)=>b.createdAt - a.createdAt);
  const savedPins = pins.filter(p => profileUser.savedPins.includes(p.id)).sort((a,b)=>b.createdAt - a.createdAt);

  const displayedPins = activeTab === 'created' ? createdPins : savedPins;

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-darkBg transition-colors pb-8">
      {/* Profile Header */}
      <div className="max-w-2xl mx-auto text-center px-4 mb-10">
        <img 
          src={profileUser.avatar} 
          alt={profileUser.name} 
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white dark:border-darkBg shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2 dark:text-white">{profileUser.name}</h1>
        <p className="text-gray-500 mb-2">@{profileUser.username}</p>
        
        {profileUser.about && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">{profileUser.about}</p>
        )}
        
        {profileUser.website && (
          <a href={profileUser.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline mb-4 inline-block font-semibold">
            {profileUser.website.replace(/^https?:\/\//, '')}
          </a>
        )}

        <div className="flex justify-center items-center gap-4 text-sm font-semibold mb-6 dark:text-gray-200">
          <span>{profileUser.followers.length} подписчиков</span>
          <span>·</span>
          <span>{profileUser.following.length} подписок</span>
        </div>

        {!isOwnProfile && (
          <button 
            onClick={() => followUser(profileUser.id)}
            className={`px-6 py-3 rounded-full font-bold transition-colors ${
              isFollowing 
                ? 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600' 
                : 'bg-pinRed text-white hover:bg-pinRedHover'
            }`}
          >
            {isFollowing ? 'Подписки' : 'Подписаться'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-8">
        <button 
          onClick={() => setActiveTab('created')}
          className={`pb-2 font-semibold text-lg transition-colors ${
            activeTab === 'created' 
              ? 'border-b-4 border-black dark:border-white text-black dark:text-white' 
              : 'text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          Созданные
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`pb-2 font-semibold text-lg transition-colors ${
            activeTab === 'saved' 
              ? 'border-b-4 border-black dark:border-white text-black dark:text-white' 
              : 'text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          Сохраненные
        </button>
      </div>

      {/* Grid */}
      {displayedPins.length > 0 ? (
        <MasonryLayout pins={displayedPins} />
      ) : (
        <div className="text-center py-12 text-gray-500">
          У пользователя пока нет {activeTab === 'created' ? 'созданных' : 'сохраненных'} пинов.
        </div>
      )}
    </div>
  );
}
