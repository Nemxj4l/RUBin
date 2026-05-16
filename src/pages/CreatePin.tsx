import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Check } from 'lucide-react';
import { useStore, CATEGORIES } from '../store';
import clsx from 'clsx';

export function CreatePin() {
  const navigate = useNavigate();
  const { addPin, currentUser } = useStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleCategory = (cat: string) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return alert('Добавьте картинку и название');
    
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0).map(t => t.startsWith('#') ? t : `#${t}`);

    addPin({
      title,
      description,
      imageUrl,
      categories: selectedCats,
      tags
    });
    
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="pt-24 pb-8 min-h-screen bg-gray-50 dark:bg-darkBg transition-colors flex justify-center px-4">
      <div className="bg-white dark:bg-darkSurface w-full max-w-4xl rounded-[32px] shadow-xl p-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Image Upload */}
        <div className="md:w-1/2">
          {imageUrl ? (
            <div className="relative group rounded-2xl overflow-hidden h-full min-h-[400px]">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => setImageUrl('')}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload size={32} className="text-gray-500 mb-4" />
              <p className="font-semibold dark:text-white">Выберите файл или перетащите его сюда</p>
              <p className="text-sm text-gray-500 mt-2">Рекомендуется использовать высококачественные изображения .jpg размером менее 20 МБ</p>
              
              <div className="mt-6 w-full">
                <p className="text-sm text-gray-500 mb-2">Или вставьте ссылку на изображение:</p>
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-darkBg border dark:border-gray-700 text-sm dark:text-white"
                  onClick={e => e.stopPropagation()}
                  onChange={e => setImageUrl(e.target.value)}
                />
              </div>
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 flex flex-col">
          <div className="flex justify-end mb-6">
            <button 
              onClick={handleSubmit}
              disabled={!title || !imageUrl}
              className="px-6 py-3 bg-pinRed hover:bg-pinRedHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full transition-colors"
            >
              Опубликовать
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="Добавьте название"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-4xl font-bold border-b-2 border-transparent focus:border-blue-500 bg-transparent outline-none pb-2 dark:text-white dark:placeholder-gray-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <img src={currentUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
              <span className="font-semibold dark:text-white">{currentUser.name}</span>
            </div>

            <div>
              <textarea 
                placeholder="Расскажите всем, о чем ваш пин"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full text-lg border-b-2 border-transparent focus:border-brandBlue bg-transparent outline-none pb-2 dark:text-white dark:placeholder-gray-500 transition-colors resize-none min-h-[100px]"
              />
            </div>
            
            <div>
              <input 
                type="text" 
                placeholder="Добавьте хештеги через запятую (например: дизайн, интерьер)"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                className="w-full text-md border-b-2 border-transparent focus:border-brandBlue bg-transparent outline-none pb-2 dark:text-white dark:placeholder-gray-500 transition-colors"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3 dark:text-white">Выберите категории:</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                  const isSelected = selectedCats.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={clsx(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center gap-1",
                        isSelected 
                          ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white" 
                          : "bg-transparent text-gray-700 border-gray-300 hover:border-gray-400 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                      )}
                    >
                      {isSelected && <Check size={14} />}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
