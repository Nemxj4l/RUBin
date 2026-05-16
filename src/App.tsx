import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PinDetail } from './pages/PinDetail';
import { Profile } from './pages/Profile';
import { CreatePin } from './pages/CreatePin';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { Messages } from './pages/Messages';

function App() {
  const theme = useStore((state) => state.theme);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!currentUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pin/:id" element={<PinDetail />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="create" element={<CreatePin />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
