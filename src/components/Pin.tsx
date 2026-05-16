import { useState } from 'react';
import { Upload, MoreHorizontal } from 'lucide-react';

interface PinProps {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  authorAvatar: string;
}

export function Pin({ id, imageUrl, title, author, authorAvatar }: PinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative mb-4 break-inside-avoid group cursor-zoom-in" id={`pin-${id}`}>
      <div 
        className="relative rounded-2xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full object-cover rounded-2xl"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 transition-opacity duration-200">
            <div className="flex justify-end">
              <button className="bg-red-600 text-white font-semibold py-3 px-5 rounded-full hover:bg-red-700 transition">
                Сохранить
              </button>
            </div>
            
            <div className="flex justify-end gap-2">
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition flex items-center justify-center w-8 h-8">
                <Upload className="w-5 h-5 text-gray-900" />
              </button>
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition flex items-center justify-center w-8 h-8">
                <MoreHorizontal className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Title & Author below pin */}
      <div className="mt-2 flex items-center justify-between px-1">
        <h3 className="font-semibold text-sm truncate">{title}</h3>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-5 h-5 text-gray-500 hover:bg-gray-200 rounded-full" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-1 px-1">
        <img src={authorAvatar} alt={author} className="w-6 h-6 rounded-full" />
        <span className="text-xs text-gray-800">{author}</span>
      </div>
    </div>
  );
}