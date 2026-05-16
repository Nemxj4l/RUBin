import { useState } from 'react';
import { useStore } from '../store';
import { Send, User as UserIcon } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

export function Messages() {
  const { currentUser, users, chats, sendMessage } = useStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  if (!currentUser) return null;

  // Users we follow or who follow us are available to chat
  const chatCandidates = users.filter(u => 
    u.id !== currentUser.id && 
    (currentUser.following.includes(u.id) || currentUser.followers.includes(u.id) || u.id === 'u1')
  );

  const selectedChat = selectedUserId 
    ? chats.find(c => c.participants.includes(currentUser.id) && c.participants.includes(selectedUserId) && c.participants.length === 2)
    : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUserId) return;
    sendMessage(selectedUserId, messageText);
    setMessageText('');
  };

  const selectedUser = users.find(u => u.id === selectedUserId);

  return (
    <div className="pt-24 pb-8 min-h-screen bg-gray-50 dark:bg-darkBg transition-colors flex justify-center px-4">
      <div className="bg-white dark:bg-darkSurface w-full max-w-5xl h-[80vh] rounded-[32px] shadow-xl flex overflow-hidden border dark:border-gray-800">
        
        {/* Sidebar */}
        <div className="w-1/3 border-r dark:border-gray-800 flex flex-col">
          <div className="p-6 border-b dark:border-gray-800">
            <h2 className="text-2xl font-bold dark:text-white">Сообщения</h2>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {chatCandidates.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">Нет доступных контактов. Подпишитесь на кого-нибудь!</p>
            ) : (
              chatCandidates.map(u => {
                const userChat = chats.find(c => c.participants.includes(currentUser.id) && c.participants.includes(u.id));
                const lastMessage = userChat?.messages[userChat.messages.length - 1];
                return (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUserId(u.id)}
                    className={clsx(
                      "w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left border-b dark:border-gray-800/50",
                      selectedUserId === u.id && "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold dark:text-white truncate">{u.name}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {lastMessage ? lastMessage.text : 'Начать чат'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col bg-gray-50/50 dark:bg-darkBg/50">
          {selectedUserId && selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b dark:border-gray-800 flex items-center gap-3 bg-white dark:bg-darkSurface">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold dark:text-white">{selectedUser.name}</h3>
                  <p className="text-xs text-gray-500">@{selectedUser.username}</p>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {!selectedChat || selectedChat.messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <UserIcon size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Это начало вашей переписки с {selectedUser.name}</p>
                  </div>
                ) : (
                  selectedChat.messages.map(msg => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                      <div key={msg.id} className={clsx("flex", isMe ? "justify-end" : "justify-start")}>
                        <div className={clsx(
                          "max-w-[70%] rounded-2xl px-4 py-2",
                          isMe ? "bg-pinRed text-white rounded-br-sm" : "bg-gray-200 dark:bg-gray-800 dark:text-white rounded-bl-sm"
                        )}>
                          <p>{msg.text}</p>
                          <p className={clsx("text-[10px] mt-1 text-right", isMe ? "text-red-200" : "text-gray-500")}>
                            {format(msg.createdAt, 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-darkSurface border-t dark:border-gray-800">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                  />
                  <button 
                    type="submit" 
                    disabled={!messageText.trim()}
                    className="p-3 bg-pinRed text-white rounded-full hover:bg-pinRedHover disabled:opacity-50 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Выберите чат из списка слева
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
