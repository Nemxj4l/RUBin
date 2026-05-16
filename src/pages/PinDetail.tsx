import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';

export function PinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pins, users, comments, currentUser, likePin, savePin, addComment, likeComment, deletePin } = useStore();
  const [commentText, setCommentText] = useState('');

  const pin = pins.find(p => p.id === id);
  if (!pin || !currentUser) return <div className="pt-24 text-center">Пин не найден</div>;

  const author = users.find(u => u.id === pin.authorId);
  const pinComments = comments.filter(c => c.pinId === pin.id).sort((a, b) => b.createdAt - a.createdAt);

  const isLiked = pin.likes.includes(currentUser.id);
  const isSaved = currentUser.savedPins.includes(pin.id);
  const isAuthor = pin.authorId === currentUser.id;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(pin.id, commentText);
    setCommentText('');
  };

  const handleDelete = () => {
    if (confirm('Удалить этот пин?')) {
      deletePin(pin.id);
      navigate('/');
    }
  };

  return (
    <div className="pt-24 pb-8 min-h-screen bg-gray-50 dark:bg-darkBg transition-colors flex justify-center px-4">
      <div className="absolute top-24 left-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-white dark:bg-darkSurface rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md transition-colors">
          <ArrowLeft size={24} className="dark:text-white" />
        </button>
      </div>

      <div className="bg-white dark:bg-darkSurface w-full max-w-5xl rounded-[32px] shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <img src={pin.imageUrl} alt={pin.title} className="w-full h-auto object-cover max-h-[80vh]" />
        </div>

        {/* Content */}
        <div className="md:w-1/2 flex flex-col max-h-[80vh]">
          {/* Header Actions */}
          <div className="p-6 flex justify-between items-center sticky top-0 bg-white/90 dark:bg-darkSurface/90 backdrop-blur z-10">
            <div className="flex gap-2">
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <MoreHorizontal size={24} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <Share2 size={24} />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              {isAuthor && (
                <button onClick={handleDelete} className="px-4 py-3 rounded-full font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Удалить
                </button>
              )}
              <button onClick={() => savePin(pin.id)} className={clsx("px-6 py-3 rounded-full font-bold text-white transition-colors", isSaved ? "bg-black hover:bg-gray-800" : "bg-pinRed hover:bg-pinRedHover")}>
                {isSaved ? 'Сохранено' : 'Сохранить'}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 hide-scrollbar">
            <div className="flex flex-wrap gap-2 mb-4">
              {pin.categories.map(c => (
                 <span key={c} className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">{c}</span>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{pin.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{pin.description}</p>

            <div className="flex items-center justify-between mb-8">
              <Link to={`/profile/${author?.id}`} className="flex items-center gap-3 group">
                <img src={author?.avatar} alt={author?.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold dark:text-white group-hover:underline">{author?.name}</p>
                  <p className="text-sm text-gray-500">{author?.followers.length} подписчиков</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => likePin(pin.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Heart size={20} className={clsx(isLiked && "fill-pinRed text-pinRed")} />
                <span className="font-semibold dark:text-white">{pin.likes.length}</span>
              </button>
              <div className="text-sm text-gray-500">
                {format(pin.createdAt, 'dd MMMM yyyy HH:mm', { locale: ru })}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                Комментарии <span className="text-gray-500 text-lg font-normal">{pinComments.length}</span>
              </h2>

              <div className="space-y-4 mb-6">
                {pinComments.map(comment => {
                  const commentAuthor = users.find(u => u.id === comment.authorId);
                  const isCommentLiked = comment.likes.includes(currentUser.id);
                  return (
                    <div key={comment.id} className="flex gap-3">
                      <Link to={`/profile/${commentAuthor?.id}`}>
                        <img src={commentAuthor?.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-1" />
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <Link to={`/profile/${commentAuthor?.id}`} className="font-bold text-sm dark:text-white hover:underline">
                            {commentAuthor?.name}
                          </Link>
                          <span className="text-xs text-gray-500">{format(comment.createdAt, 'dd.MM HH:mm')}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                        <div className="mt-1 flex items-center gap-3">
                          <button onClick={() => likeComment(comment.id)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs font-semibold">
                            <Heart size={14} className={clsx(isCommentLiked && "fill-pinRed text-pinRed")} />
                            {comment.likes.length || ''}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Comment Input Sticky Bottom */}
          <div className="p-6 border-t dark:border-gray-800 bg-white dark:bg-darkSurface mt-auto">
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
              <img src={currentUser.avatar} alt="You" className="w-10 h-10 rounded-full object-cover" />
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Добавить комментарий..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full px-4 py-3 border-transparent focus:border-gray-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-0"
              />
              <button type="submit" disabled={!commentText.trim()} className="p-3 text-white bg-pinRed hover:bg-pinRedHover rounded-full disabled:opacity-50 transition-colors">
                <MessageCircle size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
