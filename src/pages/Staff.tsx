import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Staff = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
        <p className="text-muted-foreground mt-1">Manage your staff members</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Staff List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Staff management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
