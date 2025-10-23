import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  ShoppingCart,
  BarChart3,
  Grid3x3,
  ListTodo,
  UserCircle,
  UtensilsCrossed,
  Scissors,
  Calendar,
  Store,
  ClipboardList
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Define navigation items based on user role and business category
  const getNavigationItems = () => {
    if (user?.role === 'superadmin') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: Users, label: 'Tenants', href: '/tenants' },
        { icon: Grid3x3, label: 'Modules', href: '/modules' },
        { icon: BarChart3, label: 'Reports', href: '/reports' },
        { icon: UserCircle, label: 'Users', href: '/users' },
        { icon: Settings, label: 'Settings', href: '/settings' },
      ];
    } else if (user?.role === 'tenant') {
      const baseItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      ];

      // Business-specific navigation items
      if (user?.businessCategory === 'Restaurant') {
        baseItems.push(
          { icon: UtensilsCrossed, label: 'Tables', href: '/orders' },
          { icon: ClipboardList, label: 'Menu', href: '/inventory' },
          { icon: Users, label: 'Staff', href: '/staff' },
          { icon: BarChart3, label: 'Reports', href: '/reports' },
        );
      } else if (user?.businessCategory === 'Grocery') {
        baseItems.push(
          { icon: ShoppingCart, label: 'Sales', href: '/orders' },
          { icon: Package, label: 'Inventory', href: '/inventory' },
          { icon: Users, label: 'Staff', href: '/staff' },
          { icon: BarChart3, label: 'Reports', href: '/reports' },
        );
      } else if (user?.businessCategory === 'Salon') {
        baseItems.push(
          { icon: Calendar, label: 'Appointments', href: '/orders' },
          { icon: Scissors, label: 'Services', href: '/inventory' },
          { icon: Users, label: 'Staff', href: '/staff' },
          { icon: BarChart3, label: 'Reports', href: '/reports' },
        );
      } else if (user?.businessCategory === 'Retail') {
        baseItems.push(
          { icon: Store, label: 'Sales', href: '/orders' },
          { icon: Package, label: 'Products', href: '/inventory' },
          { icon: Users, label: 'Staff', href: '/staff' },
          { icon: BarChart3, label: 'Reports', href: '/reports' },
        );
      } else {
        baseItems.push(
          { icon: ShoppingCart, label: 'Orders', href: '/orders' },
          { icon: Package, label: 'Inventory', href: '/inventory' },
          { icon: Users, label: 'Staff', href: '/staff' },
          { icon: BarChart3, label: 'Reports', href: '/reports' },
        );
      }

      baseItems.push({ icon: Settings, label: 'Settings', href: '/settings' });
      return baseItems;
    } else {
      // Staff role - business-specific items
      const baseItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: ListTodo, label: 'My Tasks', href: '/tasks' },
      ];

      if (user?.businessCategory === 'Restaurant') {
        baseItems.push(
          { icon: UtensilsCrossed, label: 'Tables', href: '/orders' },
          { icon: ClipboardList, label: 'Menu', href: '/inventory' },
        );
      } else if (user?.businessCategory === 'Salon') {
        baseItems.push(
          { icon: Calendar, label: 'Appointments', href: '/orders' },
          { icon: Scissors, label: 'Services', href: '/inventory' },
        );
      } else {
        baseItems.push(
          { icon: ShoppingCart, label: 'Orders', href: '/orders' },
          { icon: Package, label: 'Inventory', href: '/inventory' },
        );
      }

      baseItems.push({ icon: Settings, label: 'Settings', href: '/settings' });
      return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">TS</span>
          </div>
          <span className="text-sidebar-foreground font-semibold text-lg">TenantSphere</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
