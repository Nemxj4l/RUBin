import { useMemo, useState } from 'react';
import { useStore, CATEGORIES } from '../store';
import { MasonryLayout } from '../components/MasonryLayout';

export function Home() {
  const { pins, searchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPins = useMemo(() => {
    let filtered = pins;
    
    if (selectedCategory) {
      filtered = filtered.filter(pin => pin.categories.includes(selectedCategory));
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        pin => 
          pin.title.toLowerCase().includes(q) || 
          pin.description.toLowerCase().includes(q) ||
          pin.categories.some(c => c.toLowerCase().includes(q))
      );
    }
    
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  }, [pins, searchQuery, selectedCategory]);

  return (
    <div className="pt-24 pb-8 min-h-screen bg-white dark:bg-darkBg transition-colors">
      <div className="max-w-screen-2xl mx-auto px-4 mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
            selectedCategory === null 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Все
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
              selectedCategory === cat 
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {filteredPins.length > 0 ? (
        <MasonryLayout pins={filteredPins} />
      ) : (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-xl font-semibold">Ничего не найдено</p>
          <p className="mt-2">Попробуйте изменить запрос поиска или категорию.</p>
        </div>
      )}
    </div>
  );
}
