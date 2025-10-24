import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { tenantAPI } from '@/services/api';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  Building2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Tenants = () => {
  const [tenants, setTenants] = useState<any[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<any>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    plan: '',
    owner: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    loadTenants();
  }, []);

  useEffect(() => {
    // Filter tenants based on search query
    const filtered = tenants.filter(tenant =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTenants(filtered);
  }, [searchQuery, tenants]);

  const loadTenants = async () => {
    // TODO: Replace with actual API call
    const data = await tenantAPI.getTenants();
    setTenants(data);
    setFilteredTenants(data);
  
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTenant) {
        // TODO: Replace with actual PUT /tenants/:id API call
        await tenantAPI.updateTenant(editingTenant.id, formData);
        toast({
          title: 'Tenant updated',
          description: 'Tenant information has been updated successfully.',
        });
      } else {
        // TODO: Replace with actual POST /tenants API call
        await tenantAPI.createTenant(formData);
        toast({
          title: 'Tenant created',
          description: 'New tenant has been added successfully.',
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadTenants();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save tenant. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (tenant: any) => {
    setEditingTenant(tenant);
    setFormData({
      name: tenant.name,
      category: tenant.category,
      plan: tenant.plan,
      owner: tenant.owner,
      email: tenant.email,
      phone: tenant.phone,
      address: tenant.address
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tenant?')) return;
    
    try {
      // TODO: Replace with actual DELETE /tenants/:id API call
      await tenantAPI.deleteTenant(id);
      toast({
        title: 'Tenant deleted',
        description: 'Tenant has been removed successfully.',
      });
      loadTenants();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete tenant. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingTenant(null);
    setFormData({
      name: '',
      category: '',
      plan: '',
      owner: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-success/10 text-success hover:bg-success/20';
      case 'Expiring Soon': return 'bg-warning/10 text-warning hover:bg-warning/20';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground mt-1">Manage your tenant organizations and subscriptions</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTenant ? 'Edit Tenant' : 'Add New Tenant'}</DialogTitle>
              <DialogDescription>
                {editingTenant ? 'Update tenant information' : 'Create a new tenant organization'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Grocery">Grocery</SelectItem>
                        <SelectItem value="Salon">Salon</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner">Owner Name *</Label>
                    <Input
                      id="owner"
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">Subscription Plan *</Label>
                    <Select
                      value={formData.plan}
                      onValueChange={(value) => setFormData({ ...formData, plan: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTenant ? 'Update' : 'Create'} Tenant
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tenants by name, category, or owner..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tenants Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tenant.category}</p>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(tenant)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(tenant.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge variant="outline">{tenant.plan}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(tenant.status)}>
                  {tenant.status}
                </Badge>
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{tenant.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t grid grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold">{tenant.users}</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">${(tenant.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tenants found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by adding your first tenant'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tenants;
