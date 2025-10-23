import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Package,
  DollarSign
} from 'lucide-react';

// Dummy data for staff
const myTasks = [
  { id: 1, title: 'Process refund for Order #1245', priority: 'High', dueTime: '2 hours', status: 'pending' },
  { id: 2, title: 'Update inventory count', priority: 'Medium', dueTime: '4 hours', status: 'in-progress' },
  { id: 3, title: 'Prepare monthly report', priority: 'Low', dueTime: 'Tomorrow', status: 'pending' },
  { id: 4, title: 'Customer follow-up call', priority: 'High', dueTime: '1 hour', status: 'pending' },
];

const myStats = [
  { label: 'Tasks Completed Today', value: '8', icon: CheckCircle2, color: 'text-success' },
  { label: 'Pending Tasks', value: '4', icon: Clock, color: 'text-warning' },
  { label: 'Orders Processed', value: '23', icon: Package, color: 'text-primary' },
];

const recentActivity = [
  { action: 'Completed Order #1234', time: '5 mins ago', type: 'success' },
  { action: 'Updated customer details', time: '15 mins ago', type: 'info' },
  { action: 'Processed refund $89.99', time: '1 hour ago', type: 'warning' },
  { action: 'Added new product to inventory', time: '2 hours ago', type: 'success' },
];

const StaffDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hello, {user?.name || 'Staff Member'}</h1>
        <p className="text-muted-foreground mt-1">Your workspace at {user?.tenantName || 'TenantSphere'}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {myStats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            My Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`h-2 w-2 rounded-full ${
                    task.priority === 'High' ? 'bg-destructive' :
                    task.priority === 'Medium' ? 'bg-warning' :
                    'bg-success'
                  }`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due in {task.dueTime}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${
                        task.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                        task.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                        'bg-success/10 text-success'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant={task.status === 'in-progress' ? 'secondary' : 'outline'}>
                  {task.status === 'in-progress' ? 'In Progress' : 'Start'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'warning' ? 'bg-warning' :
                  'bg-primary'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Package className="h-5 w-5" />
              <span className="text-sm">New Order</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Process Refund</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Complete Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">View Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
