import tenantsData from '@/data/tenants.json';
import reportsData from '@/data/reports.json';

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    // Simulate API call
    await delay(1000);
    
    // Mock user data based on email
    let userData;
    if (email === 'admin@example.com') {
      userData = {
        id: 1,
        name: 'Super Admin',
        email: 'admin@example.com',
        role: 'superadmin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      };
    } else if (email === 'tenant@example.com') {
      userData = {
        id: 2,
        name: 'John Tenant',
        email: 'tenant@example.com',
        role: 'tenant',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tenant',
        tenantId: 1,
        tenantName: "Bella's Italian Bistro",
        businessCategory: 'Restaurant'
      };
    } else if (email === 'grocery@example.com') {
      userData = {
        id: 4,
        name: 'Emma Grocery',
        email: 'grocery@example.com',
        role: 'tenant',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grocery',
        tenantId: 2,
        tenantName: "FreshMart Groceries",
        businessCategory: 'Grocery'
      };
    } else if (email === 'salon@example.com') {
      userData = {
        id: 5,
        name: 'Sarah Salon',
        email: 'salon@example.com',
        role: 'tenant',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=salon',
        tenantId: 3,
        tenantName: "Glamour Studio & Spa",
        businessCategory: 'Salon'
      };
    } else if (email === 'retail@example.com') {
      userData = {
        id: 6,
        name: 'Mike Retail',
        email: 'retail@example.com',
        role: 'tenant',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=retail',
        tenantId: 4,
        tenantName: "Tech Haven Electronics",
        businessCategory: 'Retail'
      };
    } else {
      userData = {
        id: 3,
        name: 'Jane Staff',
        email: 'staff@example.com',
        role: 'staff',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=staff',
        tenantId: 1,
        tenantName: "Bella's Italian Bistro",
        businessCategory: 'Restaurant'
      };
    }

    return {
      success: true,
      token: 'mock-jwt-token',
      user: userData
    };
  },
  
  logout: async () => {
    await delay(300);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    return { success: true };
  }
};

// Tenant API
export const tenantAPI = {
  getTenants: async () => {
    await delay(500);
    return tenantsData;
  },
  updateTenant: async (id: number, data: any) => {
    await delay(500);
    return { ...data, id };
  },
  createTenant: async (data: any) => {
    await delay(500);
    return { ...data, id: Math.random() };
  },
  deleteTenant: async (id: number) => {
    await delay(500);
    return { success: true };
  }
};

// Reports API
export const reportsAPI = {
  getDashboardStats: async () => {
    await delay(500);
    return {
      totalTenants: 78,
      activeUsers: 342,
      totalRevenue: 268000,
      expiringPlans: 12
    };
  },
  
  getRevenueTrends: async () => {
    await delay(600);
    return reportsData.revenueByMonth;
  },
  
  getTenantGrowth: async () => {
    await delay(600);
    return reportsData.tenantGrowth;
  },
  
  getCategoryDistribution: async () => {
    await delay(500);
    return reportsData.categoryDistribution;
  },
  
  exportReport: async (type: string, format: string) => {
    await delay(500);
    return { success: true };
  }
};

// Module API
export const moduleAPI = {
  getModulesByCategory: async (category: string) => {
    await delay(500);
    return [];
  },
  getTenantModules: async (tenantId: number) => {
    await delay(500);
    return [];
  },
  updateTenantModules: async (tenantId: number, modules: string[]) => {
    await delay(500);
    return { success: true };
  }
};

// User API
export const userAPI = {
  getUsers: async () => {
    await delay(500);
    return [];
  }
};

// Activity API
export const activityAPI = {
  getRecentActivity: async (limit: number = 10) => {
    await delay(400);
    return [
      { id: 1, user: 'Maria Bella', action: 'upgraded plan', target: 'Professional', time: '5 minutes ago', type: 'upgrade' },
      { id: 2, user: 'John Davis', action: 'created new branch', target: 'Downtown Location', time: '12 minutes ago', type: 'create' },
      { id: 3, user: 'Sarah Thompson', action: 'enabled module', target: 'Appointments', time: '23 minutes ago', type: 'update' },
      { id: 4, user: 'Michael Chen', action: 'added users', target: '3 new users', time: '1 hour ago', type: 'create' }
    ].slice(0, limit);
  }
};
