import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans transition-colors">
      <Header />
      <main className="pt-4 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pb-20">
        <Outlet />
      </main>
    </div>
  );
};
