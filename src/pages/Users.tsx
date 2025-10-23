import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userAPI } from '@/services/api';
import { Users as UsersIcon, Mail, Shield, Calendar } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // TODO: Replace with actual API call
    const data = await userAPI.getUsers();
    setUsers(data);
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'Super Admin': return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'Admin': return 'bg-secondary/10 text-secondary hover:bg-secondary/20';
      case 'Support': return 'bg-info/10 text-info hover:bg-info/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-success/10 text-success hover:bg-success/20'
      : 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Users</h1>
          <p className="text-muted-foreground mt-1">Manage administrative users and permissions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Super Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        <Shield className="mr-1 h-3 w-3" />
                        {user.role}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Last login: {user.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Permissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">Super Admin</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Full access to all features, tenant management, module configuration, user management, and system settings.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-secondary/20 bg-secondary/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-secondary" />
                <h4 className="font-semibold">Admin</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Can manage tenants, view reports, and configure modules. Cannot modify system settings or other admin users.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-info/20 bg-info/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-info" />
                <h4 className="font-semibold">Support</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                View-only access to tenants and reports. Can respond to support tickets but cannot modify configurations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
