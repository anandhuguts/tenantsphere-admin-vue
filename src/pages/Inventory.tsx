import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Package, Plus, AlertTriangle } from 'lucide-react';

const dummyInventory = [
  { id: 1, name: 'Air Filters', category: 'HVAC', quantity: 45, minStock: 20, maxStock: 100, unit: 'pcs', location: 'Warehouse A' },
  { id: 2, name: 'Light Bulbs', category: 'Electrical', quantity: 12, minStock: 30, maxStock: 150, unit: 'pcs', location: 'Warehouse B' },
  { id: 3, name: 'Paint Cans', category: 'Maintenance', quantity: 28, minStock: 15, maxStock: 50, unit: 'cans', location: 'Storage Room' },
  { id: 4, name: 'Cleaning Supplies', category: 'Janitorial', quantity: 67, minStock: 40, maxStock: 100, unit: 'units', location: 'Warehouse A' },
  { id: 5, name: 'Door Locks', category: 'Security', quantity: 8, minStock: 10, maxStock: 30, unit: 'pcs', location: 'Warehouse B' },
  { id: 6, name: 'Plumbing Parts', category: 'Plumbing', quantity: 34, minStock: 20, maxStock: 60, unit: 'units', location: 'Storage Room' },
];

const Inventory = () => {
  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity < minStock) return 'low';
    if (quantity < minStock * 1.5) return 'warning';
    return 'good';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-red-500/10 text-red-500';
      case 'warning': return 'bg-yellow-500/10 text-yellow-500';
      case 'good': return 'bg-green-500/10 text-green-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStockPercentage = (quantity: number, maxStock: number) => {
    return (quantity / maxStock) * 100;
  };

  const lowStockItems = dummyInventory.filter(item => getStockStatus(item.quantity, item.minStock) === 'low').length;
  const totalValue = dummyInventory.reduce((sum, item) => sum + item.quantity, 0);

  const stats = [
    { label: 'Total Items', value: dummyInventory.length },
    { label: 'Low Stock', value: lowStockItems },
    { label: 'Total Units', value: totalValue },
    { label: 'Categories', value: new Set(dummyInventory.map(i => i.category)).size },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground mt-1">Track and manage your inventory</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {lowStockItems > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-semibold">{lowStockItems} item(s) are low on stock</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Inventory Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyInventory.map((item) => {
                const status = getStockStatus(item.quantity, item.minStock);
                const percentage = getStockPercentage(item.quantity, item.maxStock);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}/{item.maxStock}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStockColor(status)}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Restock
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
