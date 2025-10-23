import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

const Orders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage your orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Orders List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Orders management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
