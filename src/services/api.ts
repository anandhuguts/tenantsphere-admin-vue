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

// src/services/api.ts
const API_BASE = "http://localhost:5000";

export const tenantAPI = {
  // Get all tenants
  getTenants: async () => {
    const res = await fetch(`${API_BASE}/tenants`);
    if (!res.ok) throw new Error("Failed to fetch tenants");
    return await res.json();
  },

  // Get single tenant by ID
  getTenant: async (id: number) => {
    const res = await fetch(`${API_BASE}/tenants/${id}`);
    if (!res.ok) throw new Error("Failed to fetch tenant");
    return await res.json();
  },

  // Create a new tenant
  createTenant: async (tenantData: any) => {
    const res = await fetch(`${API_BASE}/tenants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tenantData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create tenant");
    return data;
  },

  // Update existing tenant
  updateTenant: async (id: number, tenantData: any) => {
    const res = await fetch(`${API_BASE}/tenants/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tenantData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update tenant");
    return data;
  },

  // Delete tenant by ID
  deleteTenant: async (id: number) => {
    const res = await fetch(`${API_BASE}/tenants/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete tenant");
    return data;
  },
};
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
    
    // Determine role and user info based on email
    let role: 'superadmin' | 'tenant' | 'staff';
    let name: string;
    let tenantId: number | undefined;
    let tenantName: string | undefined;
    
    if (email.includes('admin@')) {
      role = 'superadmin';
      name = 'Super Admin';
    } else if (email.includes('tenant@')) {
      role = 'tenant';
      name = 'Maria Bella';
      tenantId = 1;
      tenantName = "Bella's Italian Bistro";
    } else if (email.includes('staff@')) {
      role = 'staff';
      name = 'John Staff';
      tenantId = 1;
      tenantName = "Bella's Italian Bistro";
    } else {
      throw new Error('Invalid credentials');
    }
    
    return {
      success: true,
      token: 'dummy-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        tenantId,
        tenantName
      }
    };
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

// export const tenantAPI = {
//   /**
//    * Get all tenants with optional filters
//    * TODO: Replace with actual GET /tenants?status=active&category=restaurant
//    */
//   getTenants: async (filters?: { status?: string; category?: string }) => {
//     await delay(600);
//     let tenants = [...tenantsData];
    
//     if (filters?.status) {
//       tenants = tenants.filter(t => t.status === filters.status);
//     }
//     if (filters?.category) {
//       tenants = tenants.filter(t => t.category === filters.category);
//     }
    
//     return tenants;
//   },

//   /**
//    * Get single tenant by ID
//    * TODO: Replace with actual GET /tenants/:id
//    */
//   getTenant: async (id: number) => {
//     await delay(400);
//     const tenant = tenantsData.find(t => t.id === id);
//     if (!tenant) throw new Error('Tenant not found');
//     return tenant;
//   },

//   /**
//    * Create new tenant
//    * TODO: Replace with actual POST /tenants
//    */
//   createTenant: async (data: any) => {
//     await delay(800);
//     const newTenant = {
//       id: Math.max(...tenantsData.map(t => t.id)) + 1,
//       ...data,
//       joinDate: new Date().toISOString().split('T')[0],
//       status: 'Active'
//     };
//     return newTenant;
//   },

//   /**
//    * Update existing tenant
//    * TODO: Replace with actual PUT /tenants/:id
//    */
//   updateTenant: async (id: number, data: any) => {
//     await delay(700);
//     const tenant = tenantsData.find(t => t.id === id);
//     if (!tenant) throw new Error('Tenant not found');
//     return { ...tenant, ...data };
//   },

//   /**
//    * Delete tenant
//    * TODO: Replace with actual DELETE /tenants/:id
//    */
//   deleteTenant: async (id: number) => {
//     await delay(500);
//     return { success: true, id };
//   }
// };

// ============================================
// MODULE APIs
// ============================================

export const moduleAPI = {
  /**
   * Get modules for a tenant
   * GET /tenants/:id/modules
   */
  getTenantModules: async (tenantId: string) => {
    try {
      const response = await fetch(`${API_URL}/tenants/${tenantId}/modules`);
      if (!response.ok) throw new Error('Failed to fetch modules');
      return await response.json();
    } catch (error) {
      console.error('Get modules error:', error);
      throw error;
    }
  },

  /**
   * Update modules for a tenant
   * PUT /tenants/:id/modules
   */
updateTenantModules: async (
  tenantId: number,
  modules: Record<string, boolean>
) => {
  const res = await fetch(`${API_BASE}/tenants/${tenantId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modules }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update tenant modules");
  return data;
},
};
// ============================================
// REPORTS APIs
// ============================================

const API_URL = 'http://localhost:5000'; // Change to your backend URL

export const reportsAPI = {
  /**
   * Get dashboard statistics
   * GET /reports/dashboard
   */
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_URL}/reports/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      console.log('Dashboard Stats:', data);
      return data;
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  },

  /**
   * Get revenue trends
   * GET /reports/revenue?period=monthly&year=2025
   */
  getRevenueTrends: async (period: 'daily' | 'monthly' | 'yearly' = 'monthly', year?: number) => {
    try {
      const params = new URLSearchParams();
      if (period) params.append('period', period);
      if (year) params.append('year', year.toString());

      const response = await fetch(`${API_URL}/reports/revenue?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch revenue trends');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Revenue trends error:', error);
      throw error;
    }
  },

  /**
   * Get tenant growth data
   * GET /reports/tenant-growth?period=monthly&limit=12
   */
  getTenantGrowth: async (period: 'monthly' | 'yearly' = 'monthly', limit: number = 12) => {
    try {
      const params = new URLSearchParams();
      params.append('period', period);
      params.append('limit', limit.toString());

      const response = await fetch(`${API_URL}/reports/tenant-growth?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tenant growth');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Tenant growth error:', error);
      throw error;
    }
  },

  /**
   * Get category distribution
   * GET /reports/categories
   */
  getCategoryDistribution: async () => {
    try {
      const response = await fetch(`${API_URL}/reports/categories`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch category distribution');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Category distribution error:', error);
      throw error;
    }
  },

  /**
   * Get plan distribution
   * GET /reports/plans
   */
  getPlanDistribution: async () => {
    try {
      const response = await fetch(`${API_URL}/reports/plans`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plan distribution');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Plan distribution error:', error);
      throw error;
    }
  },

  /**
   * Export report data
   * GET /reports/export?type=csv&report=revenue&from=2025-01-01&to=2025-12-31
   */
  exportReport: async (
    reportType: string, 
    format: 'csv' | 'pdf' | 'excel',
    filters?: { from?: string; to?: string; category?: string }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append('type', format);
      params.append('report', reportType);
      
      if (filters?.from) params.append('from', filters.from);
      if (filters?.to) params.append('to', filters.to);
      if (filters?.category) params.append('category', filters.category);

      const response = await fetch(`${API_URL}/reports/export?${params.toString()}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to export report');
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return { success: true, message: `Report exported as ${format}` };
    } catch (error) {
      console.error('Export report error:', error);
      throw error;
    }
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