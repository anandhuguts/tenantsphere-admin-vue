import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Eye, Download } from 'lucide-react';

const dummyOrders = [
  { id: 'ORD-001', customer: 'John Smith', tenant: 'Unit 102', items: 3, total: 245.50, status: 'delivered', date: '2024-01-10' },
  { id: 'ORD-002', customer: 'Sarah Johnson', tenant: 'Unit 205', items: 2, total: 180.00, status: 'processing', date: '2024-01-12' },
  { id: 'ORD-003', customer: 'Mike Davis', tenant: 'Unit 301', items: 5, total: 420.75, status: 'shipped', date: '2024-01-13' },
  { id: 'ORD-004', customer: 'Emily Brown', tenant: 'Unit 105', items: 1, total: 95.00, status: 'pending', date: '2024-01-14' },
  { id: 'ORD-005', customer: 'David Wilson', tenant: 'Unit 208', items: 4, total: 310.25, status: 'delivered', date: '2024-01-11' },
  { id: 'ORD-006', customer: 'Lisa Anderson', tenant: 'Unit 403', items: 2, total: 165.50, status: 'processing', date: '2024-01-15' },
];

const Orders = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-500';
      case 'shipped': return 'bg-blue-500/10 text-blue-500';
      case 'processing': return 'bg-yellow-500/10 text-yellow-500';
      case 'pending': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = [
    { label: 'Total Orders', value: dummyOrders.length },
    { label: 'Pending', value: dummyOrders.filter(o => o.status === 'pending').length },
    { label: 'Processing', value: dummyOrders.filter(o => o.status === 'processing').length },
    { label: 'Delivered', value: dummyOrders.filter(o => o.status === 'delivered').length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track your orders</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Orders List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.tenant}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
