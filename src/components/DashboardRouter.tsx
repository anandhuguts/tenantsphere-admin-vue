import { useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/pages/Dashboard';
import TenantDashboard from '@/pages/TenantDashboard';
import StaffDashboard from '@/pages/StaffDashboard';

export const DashboardRouter = () => {
  const { user } = useAuth();

  if (user?.role === 'superadmin') {
    return <Dashboard />;
  } else if (user?.role === 'tenant') {
    return <TenantDashboard />;
  } else {
    return <StaffDashboard />;
  }
};
