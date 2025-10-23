import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 transition-all duration-300">
        <Navbar />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
