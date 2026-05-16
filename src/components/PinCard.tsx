import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, MoreHorizontal, ArrowUpRight, Download } from 'lucide-react';
import { Pin, useStore } from '../store';
import clsx from 'clsx';

interface PinCardProps {
  pin: Pin;
}

export function PinCard({ pin }: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser, savePin, users } = useStore();

  const isSaved = currentUser?.savedPins.includes(pin.id);
  const author = users.find(u => u.id === pin.authorId);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    savePin(pin.id);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // Simulate opening link
    alert('Переход по ссылке: ' + pin.imageUrl);
  };

  return (
    <div className="masonry-item relative group rounded-2xl overflow-hidden cursor-zoom-in">
      <Link to={`/pin/${pin.id}`} className="block relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
        <img 
          src={pin.imageUrl} 
          alt={pin.title} 
          className="w-full h-auto object-cover rounded-2xl"
          loading="lazy"
        />
        
        <div className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity duration-200 flex flex-col justify-between p-4",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className={clsx(
                "px-4 py-3 rounded-full font-semibold text-white transition-colors",
                isSaved ? "bg-black hover:bg-gray-800" : "bg-brandBlue hover:bg-brandBlueHover"
              )}
            >
              {isSaved ? 'Сохранено' : 'Сохранить'}
            </button>
          </div>
          
          <div className="flex justify-between items-end relative">
            <button 
              onClick={handleLinkClick}
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-black text-sm font-semibold py-2 px-3 rounded-full max-w-[70%] truncate"
            >
              <ArrowUpRight size={16} />
              <span className="truncate">Ссылка</span>
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  navigator.clipboard.writeText(window.location.origin + '/pin/' + pin.id);
                  alert('Ссылка на пин скопирована!');
                }}
                title="Поделиться"
                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black"
              >
                <Share2 size={16} />
              </button>
              
              <div className="relative group/more">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black"
                >
                  <MoreHorizontal size={16} />
                </button>
                <div className="absolute right-0 bottom-full mb-2 hidden group-hover/more:block bg-white dark:bg-darkSurface rounded-lg shadow-xl w-48 text-sm overflow-hidden z-50">
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Изображение сохранено'); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200">Скачать изображение</button>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Пин скрыт'); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200">Скрыть пин</button>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Жалоба отправлена'); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500">Пожаловаться</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {author && (
        <div className="mt-2 flex items-center gap-2 px-1">
          <Link to={`/profile/${author.id}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 group/author">
            <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-medium dark:text-gray-200 group-hover/author:underline">{author.name}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
