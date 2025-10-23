import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

const Inventory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
        <p className="text-muted-foreground mt-1">Manage your inventory</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Inventory Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Inventory management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
