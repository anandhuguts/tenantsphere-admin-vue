import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";
import { DashboardRouter } from "@/components/DashboardRouter";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TenantDashboard from "./pages/TenantDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Tenants from "./pages/Tenants";
import Modules from "./pages/Modules";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Staff from "./pages/Staff";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import InventoryModule from "./pages/tenant/InventoryModule";
import BillingModule from "./pages/tenant/BillingModule";
import ReportsModule from "./pages/tenant/ReportsModule";
import AccountsModule from "./pages/tenant/AccountsModule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<DashboardRouter />} />
                <Route path="tenants" element={<RoleBasedRoute allowedRoles={['superadmin']}><Tenants /></RoleBasedRoute>} />
                <Route path="modules" element={<RoleBasedRoute allowedRoles={['superadmin']}><Modules /></RoleBasedRoute>} />
                <Route path="reports" element={<RoleBasedRoute allowedRoles={['superadmin']}><Reports /></RoleBasedRoute>} />
                <Route path="users" element={<RoleBasedRoute allowedRoles={['superadmin']}><Users /></RoleBasedRoute>} />
                <Route path="settings" element={<Settings />} />
                
                {/* Tenant Routes */}
                <Route path="inventory" element={<RoleBasedRoute allowedRoles={['tenant']}><InventoryModule /></RoleBasedRoute>} />
                <Route path="billing" element={<RoleBasedRoute allowedRoles={['tenant']}><BillingModule /></RoleBasedRoute>} />
                <Route path="accounts" element={<RoleBasedRoute allowedRoles={['tenant']}><AccountsModule /></RoleBasedRoute>} />
                <Route path="staff" element={<RoleBasedRoute allowedRoles={['tenant']}><Staff /></RoleBasedRoute>} />
                
                {/* Staff Routes */}
                <Route path="orders" element={<RoleBasedRoute allowedRoles={['staff']}><Orders /></RoleBasedRoute>} />
                <Route path="tasks" element={<RoleBasedRoute allowedRoles={['staff']}><Tasks /></RoleBasedRoute>} />
              </Route>

              {/* Catch all - redirect to login */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
