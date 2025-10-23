/**
 * API Service Layer
 * 
 * This file simulates API calls with dummy data.
 * Replace these functions with actual HTTP requests to your backend.
 * 
 * Example with fetch:
 * const response = await fetch(`${API_BASE_URL}/tenants`, {
 *   method: 'GET',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   }
 * });
 * return response.json();
 */

import tenantsData from '@/data/tenants.json';
import reportsData from '@/data/reports.json';

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Base URL - replace with your actual backend URL
const API_BASE_URL = 'https://api.tenantsphere.com';

// ============================================
// AUTH APIs
// ============================================

export const authAPI = {
  /**
   * Login with email and password
   * TODO: Replace with actual POST /auth/login
   */
  login: async (email: string, password: string) => {
    await delay(800);
    
    // Simulate login validation
    if (email === 'admin@tenantsphere.com' && password === 'admin123') {
      return {
        success: true,
        token: 'dummy-jwt-token-' + Date.now(),
        user: {
          id: 1,
          name: 'Super Admin',
          email: 'admin@tenantsphere.com',
          role: 'super_admin',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },

  /**
   * Logout current user
   * TODO: Replace with actual POST /auth/logout
   */
  logout: async () => {
    await delay(300);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    return { success: true };
  },

  /**
   * Get current authenticated user
   * TODO: Replace with actual GET /auth/me
   */
  getCurrentUser: async () => {
    await delay(400);
    const userData = localStorage.getItem('user_data');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
};

// ============================================
// TENANT APIs
// ============================================

export const tenantAPI = {
  /**
   * Get all tenants with optional filters
   * TODO: Replace with actual GET /tenants?status=active&category=restaurant
   */
  getTenants: async (filters?: { status?: string; category?: string }) => {
    await delay(600);
    let tenants = [...tenantsData];
    
    if (filters?.status) {
      tenants = tenants.filter(t => t.status === filters.status);
    }
    if (filters?.category) {
      tenants = tenants.filter(t => t.category === filters.category);
    }
    
    return tenants;
  },

  /**
   * Get single tenant by ID
   * TODO: Replace with actual GET /tenants/:id
   */
  getTenant: async (id: number) => {
    await delay(400);
    const tenant = tenantsData.find(t => t.id === id);
    if (!tenant) throw new Error('Tenant not found');
    return tenant;
  },

  /**
   * Create new tenant
   * TODO: Replace with actual POST /tenants
   */
  createTenant: async (data: any) => {
    await delay(800);
    const newTenant = {
      id: Math.max(...tenantsData.map(t => t.id)) + 1,
      ...data,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    return newTenant;
  },

  /**
   * Update existing tenant
   * TODO: Replace with actual PUT /tenants/:id
   */
  updateTenant: async (id: number, data: any) => {
    await delay(700);
    const tenant = tenantsData.find(t => t.id === id);
    if (!tenant) throw new Error('Tenant not found');
    return { ...tenant, ...data };
  },

  /**
   * Delete tenant
   * TODO: Replace with actual DELETE /tenants/:id
   */
  deleteTenant: async (id: number) => {
    await delay(500);
    return { success: true, id };
  }
};

// ============================================
// MODULE APIs
// ============================================

export const moduleAPI = {
  /**
   * Get available modules by category
   * TODO: Replace with actual GET /modules?category=restaurant
   */
  getModulesByCategory: async (category: string) => {
    await delay(500);
    
    const modulesByCategory: Record<string, string[]> = {
      'Restaurant': ['POS', 'Table Management', 'KOT', 'Kitchen Display', 'Reservations', 'Inventory', 'Reports', 'Multi-branch'],
      'Grocery': ['POS', 'Barcode Scanning', 'Inventory', 'Batch Tracking', 'Supplier Management', 'Purchase Orders', 'Reports', 'Multi-branch'],
      'Salon': ['POS', 'Appointments', 'Staff Management', 'Service Packages', 'Inventory', 'Reports', 'Multi-branch'],
      'Retail': ['POS', 'Inventory', 'Warranty Tracking', 'Barcode Scanning', 'Reports', 'Multi-branch']
    };
    
    return modulesByCategory[category] || [];
  },

  /**
   * Get tenant's enabled modules
   * TODO: Replace with actual GET /tenants/:id/modules
   */
  getTenantModules: async (tenantId: number) => {
    await delay(400);
    const tenant = tenantsData.find(t => t.id === tenantId);
    return tenant?.modules || [];
  },

  /**
   * Update tenant's modules
   * TODO: Replace with actual PUT /tenants/:id/modules
   */
  updateTenantModules: async (tenantId: number, modules: string[]) => {
    await delay(600);
    return { success: true, tenantId, modules };
  }
};

// ============================================
// REPORTS APIs
// ============================================

export const reportsAPI = {
  /**
   * Get dashboard statistics
   * TODO: Replace with actual GET /reports/dashboard
   */
  getDashboardStats: async () => {
    await delay(700);
    return {
      totalTenants: 78,
      activeUsers: 342,
      totalRevenue: 268000,
      expiringPlans: 12
    };
  },

  /**
   * Get revenue trends
   * TODO: Replace with actual GET /reports/revenue
   */
  getRevenueTrends: async () => {
    await delay(600);
    return reportsData.revenueByMonth;
  },

  /**
   * Get tenant growth data
   * TODO: Replace with actual GET /reports/tenant-growth
   */
  getTenantGrowth: async () => {
    await delay(600);
    return reportsData.tenantGrowth;
  },

  /**
   * Get category distribution
   * TODO: Replace with actual GET /reports/categories
   */
  getCategoryDistribution: async () => {
    await delay(500);
    return reportsData.categoryDistribution;
  },

  /**
   * Export report data
   * TODO: Replace with actual GET /reports/export?type=csv&report=revenue
   */
  exportReport: async (reportType: string, format: 'csv' | 'pdf' | 'excel') => {
    await delay(1000);
    // Simulate file download
    console.log(`Exporting ${reportType} as ${format}`);
    return { success: true, message: `Report exported as ${format}` };
  }
};

// ============================================
// ACTIVITY APIs
// ============================================

export const activityAPI = {
  /**
   * Get recent activity feed
   * TODO: Replace with actual GET /activity?limit=10
   */
  getRecentActivity: async (limit: number = 10) => {
    await delay(500);
    return [
      { id: 1, user: 'Maria Bella', action: 'upgraded plan', target: 'Professional', time: '5 minutes ago', type: 'upgrade' },
      { id: 2, user: 'John Davis', action: 'created new branch', target: 'Downtown Location', time: '12 minutes ago', type: 'create' },
      { id: 3, user: 'Sarah Thompson', action: 'enabled module', target: 'Appointments', time: '23 minutes ago', type: 'update' },
      { id: 4, user: 'Michael Chen', action: 'added users', target: '3 new users', time: '1 hour ago', type: 'create' },
      { id: 5, user: 'Li Wei', action: 'submitted support ticket', target: 'Payment Issue', time: '2 hours ago', type: 'support' },
      { id: 6, user: 'Emma Wilson', action: 'renewed subscription', target: 'Annual Plan', time: '3 hours ago', type: 'payment' },
      { id: 7, user: 'Robert Brown', action: 'updated settings', target: 'Tax Configuration', time: '4 hours ago', type: 'update' },
      { id: 8, user: 'James Rodriguez', action: 'requested feature', target: 'SMS Integration', time: '5 hours ago', type: 'feature' }
    ].slice(0, limit);
  }
};

// ============================================
// USER APIs
// ============================================

export const userAPI = {
  /**
   * Get all super admin users
   * TODO: Replace with actual GET /users
   */
  getUsers: async () => {
    await delay(600);
    return [
      { id: 1, name: 'Super Admin', email: 'admin@tenantsphere.com', role: 'Super Admin', status: 'Active', lastLogin: '2024-10-23' },
      { id: 2, name: 'Jane Smith', email: 'jane@tenantsphere.com', role: 'Admin', status: 'Active', lastLogin: '2024-10-22' },
      { id: 3, name: 'Tom Wilson', email: 'tom@tenantsphere.com', role: 'Support', status: 'Active', lastLogin: '2024-10-23' }
    ];
  }
};
