import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  Plus,
  UtensilsCrossed,
  Scissors,
  Store,
  Calendar
} from 'lucide-react';

const getStaffData = (category: string) => {
  switch (category) {
    case 'Restaurant':
      return {
        tasks: [
          { id: 1, title: "Clear Table 5", priority: "high", dueTime: "Now", status: "pending" },
          { id: 2, title: "Take order Table 12", priority: "high", dueTime: "5 min", status: "pending" },
          { id: 3, title: "Serve Table 8", priority: "medium", dueTime: "10 min", status: "in-progress" },
          { id: 4, title: "Prepare bill Table 3", priority: "low", dueTime: "15 min", status: "completed" }
        ],
        stats: [
          { label: "Tables Served", value: "12", icon: UtensilsCrossed, color: "text-blue-500" },
          { label: "Orders Taken", value: "28", icon: ShoppingCart, color: "text-green-500" },
          { label: "Revenue Generated", value: "$840", icon: DollarSign, color: "text-purple-500" }
        ],
        quickActions: [
          { label: "New Order", icon: Plus },
          { label: "Clear Table", icon: CheckCircle2 },
          { label: "View Menu", icon: Package }
        ],
        recentActivity: [
          { action: "Cleared Table 8", time: "2 min ago", type: "success" },
          { action: "New order from Table 5", time: "8 min ago", type: "info" },
          { action: "Bill prepared for Table 3", time: "15 min ago", type: "success" }
        ]
      };
    case 'Grocery':
      return {
        tasks: [
          { id: 1, title: "Restock Dairy Section", priority: "high", dueTime: "Now", status: "pending" },
          { id: 2, title: "Check expiry dates", priority: "medium", dueTime: "1 hour", status: "in-progress" },
          { id: 3, title: "Price update vegetables", priority: "low", dueTime: "2 hours", status: "pending" },
          { id: 4, title: "Organize checkout area", priority: "medium", dueTime: "3 hours", status: "completed" }
        ],
        stats: [
          { label: "Items Scanned", value: "342", icon: Package, color: "text-blue-500" },
          { label: "Customers Served", value: "89", icon: Users, color: "text-green-500" },
          { label: "Sales Today", value: "$2,140", icon: DollarSign, color: "text-purple-500" }
        ],
        quickActions: [
          { label: "New Sale", icon: Plus },
          { label: "Check Stock", icon: Package },
          { label: "Price Check", icon: DollarSign }
        ],
        recentActivity: [
          { action: "Restocked dairy products", time: "5 min ago", type: "success" },
          { action: "Served 12 customers", time: "20 min ago", type: "info" },
          { action: "Updated 24 prices", time: "45 min ago", type: "success" }
        ]
      };
    case 'Salon':
      return {
        tasks: [
          { id: 1, title: "Client at Station 3", priority: "high", dueTime: "Now", status: "in-progress" },
          { id: 2, title: "Prepare for 2 PM appointment", priority: "medium", dueTime: "30 min", status: "pending" },
          { id: 3, title: "Clean workstation", priority: "low", dueTime: "1 hour", status: "pending" },
          { id: 4, title: "Restock supplies", priority: "medium", dueTime: "2 hours", status: "completed" }
        ],
        stats: [
          { label: "Clients Today", value: "8", icon: Users, color: "text-blue-500" },
          { label: "Services Done", value: "12", icon: Scissors, color: "text-green-500" },
          { label: "Revenue", value: "$680", icon: DollarSign, color: "text-purple-500" }
        ],
        quickActions: [
          { label: "New Appointment", icon: Calendar },
          { label: "Mark Complete", icon: CheckCircle2 },
          { label: "View Schedule", icon: Clock }
        ],
        recentActivity: [
          { action: "Completed haircut service", time: "10 min ago", type: "success" },
          { action: "New walk-in appointment", time: "25 min ago", type: "info" },
          { action: "Cleaned workstation 2", time: "40 min ago", type: "success" }
        ]
      };
    case 'Retail':
      return {
        tasks: [
          { id: 1, title: "Process return request", priority: "high", dueTime: "Now", status: "pending" },
          { id: 2, title: "Assist customer in electronics", priority: "high", dueTime: "5 min", status: "in-progress" },
          { id: 3, title: "Update display window", priority: "low", dueTime: "2 hours", status: "pending" },
          { id: 4, title: "Check inventory levels", priority: "medium", dueTime: "3 hours", status: "completed" }
        ],
        stats: [
          { label: "Items Sold", value: "45", icon: Store, color: "text-blue-500" },
          { label: "Customers Helped", value: "32", icon: Users, color: "text-green-500" },
          { label: "Sales Today", value: "$1,280", icon: DollarSign, color: "text-purple-500" }
        ],
        quickActions: [
          { label: "New Sale", icon: Plus },
          { label: "Process Return", icon: Package },
          { label: "Check Price", icon: DollarSign }
        ],
        recentActivity: [
          { action: "Processed laptop sale", time: "12 min ago", type: "success" },
          { action: "Assisted 3 customers", time: "30 min ago", type: "info" },
          { action: "Restocked electronics", time: "1 hour ago", type: "success" }
        ]
      };
    default:
      return {
        tasks: [
          { id: 1, title: "Complete task", priority: "high", dueTime: "2 hours", status: "pending" },
          { id: 2, title: "Review documents", priority: "medium", dueTime: "4 hours", status: "in-progress" },
          { id: 3, title: "Update records", priority: "low", dueTime: "Tomorrow", status: "pending" }
        ],
        stats: [
          { label: "Tasks Done", value: "8", icon: CheckCircle2, color: "text-blue-500" },
          { label: "Pending", value: "5", icon: Clock, color: "text-orange-500" },
          { label: "Performance", value: "92%", icon: Users, color: "text-green-500" }
        ],
        quickActions: [
          { label: "New Task", icon: Plus },
          { label: "View All", icon: Package }
        ],
        recentActivity: [
          { action: "Completed 3 tasks", time: "20 min ago", type: "success" },
          { action: "Updated inventory", time: "45 min ago", type: "info" },
          { action: "Processed order", time: "1 hour ago", type: "success" }
        ]
      };
  }
};

const StaffDashboard = () => {
  const { user } = useAuth();
  const businessCategory = user?.businessCategory || 'Retail';
  const staffData = getStaffData(businessCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          {user?.tenantName} - {businessCategory} Staff
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {staffData.stats.map((stat, index) => (
          <Card key={index}>
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
          <CardTitle>My {businessCategory === 'Restaurant' ? 'Orders' : 'Tasks'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {staffData.tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`h-2 w-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due: {task.dueTime}
                      </span>
                      <span className={`px-2 py-0.5 rounded capitalize ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant={task.status === 'in-progress' ? 'secondary' : 'outline'}>
                  {task.status === 'in-progress' ? 'In Progress' : task.status === 'completed' ? 'Completed' : 'Start'}
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
            <AlertCircle className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffData.recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {staffData.quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-20 flex flex-col gap-2">
                <action.icon className="h-5 w-5" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
