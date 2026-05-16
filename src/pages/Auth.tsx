import { useState } from 'react';
import { useStore } from '../store';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const login = useStore(state => state.login);
  const register = useStore(state => state.register);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Введите логин и пароль');
      return;
    }
    
    if (isLogin) {
      const success = login(username, password);
      if (!success) {
        setError('Неверный логин или пароль');
      }
    } else {
      if (!name) {
        setError('Введите имя');
        return;
      }
      register({ username, password, name });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBg">
      <div className="bg-white dark:bg-darkSurface p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">R</div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {isLogin ? 'Вход в Rubin' : 'Регистрация'}
        </h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Логин *</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brandBlue"
              placeholder="Введите логин"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Пароль *</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brandBlue"
              placeholder="Введите пароль"
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Имя *</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brandBlue"
                placeholder="Ваше имя"
              />
            </div>
          )}
          
          <button type="submit" className="w-full bg-brandBlue hover:bg-brandBlueHover text-white font-bold py-2 rounded-xl transition-colors">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium hover:underline text-brandBlue dark:text-brandBlue"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}
