import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Calendar,
  TrendingUp,
  ArrowUpRight,
  UtensilsCrossed,
  Package,
  Scissors,
  Store,
  Clock,
  CheckCircle2
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const getBusinessData = (category: string) => {
  switch (category) {
    case 'Restaurant':
      return {
        stats: [
          { label: "Today's Revenue", value: "$2,450", icon: DollarSign, trend: "+12.5%", color: "text-green-500" },
          { label: "Active Tables", value: "12/20", icon: UtensilsCrossed, trend: "60% occupied", color: "text-blue-500" },
          { label: "Orders Today", value: "87", icon: ShoppingCart, trend: "+8.2%", color: "text-orange-500" },
          { label: "Avg Wait Time", value: "18 min", icon: Clock, trend: "-5 min", color: "text-purple-500" }
        ],
        recentOrders: [
          { id: 1, table: "Table 5", items: "2x Pasta, 1x Salad", amount: 45.50, status: "Preparing", time: "5 min ago" },
          { id: 2, table: "Table 12", items: "3x Pizza, 2x Drinks", amount: 78.00, status: "Served", time: "12 min ago" },
          { id: 3, table: "Table 3", items: "1x Steak, 1x Wine", amount: 95.00, status: "Completed", time: "25 min ago" }
        ]
      };
    case 'Grocery':
      return {
        stats: [
          { label: "Today's Sales", value: "$8,420", icon: DollarSign, trend: "+15.3%", color: "text-green-500" },
          { label: "Customers", value: "342", icon: Users, trend: "+22.4%", color: "text-blue-500" },
          { label: "Low Stock Items", value: "23", icon: Package, trend: "Needs attention", color: "text-red-500" },
          { label: "Avg Basket", value: "$24.62", icon: ShoppingCart, trend: "+3.1%", color: "text-purple-500" }
        ],
        recentOrders: [
          { id: 1, customer: "John Smith", items: "15 items", amount: 67.80, status: "Completed", time: "2 min ago" },
          { id: 2, customer: "Sarah Johnson", items: "8 items", amount: 34.20, status: "Processing", time: "8 min ago" },
          { id: 3, customer: "Mike Davis", items: "22 items", amount: 89.50, status: "Completed", time: "15 min ago" }
        ]
      };
    case 'Salon':
      return {
        stats: [
          { label: "Today's Revenue", value: "$1,680", icon: DollarSign, trend: "+9.8%", color: "text-green-500" },
          { label: "Appointments", value: "18", icon: Calendar, trend: "3 remaining", color: "text-blue-500" },
          { label: "Services Done", value: "15", icon: CheckCircle2, trend: "+5 from yesterday", color: "text-purple-500" },
          { label: "Avg Service Time", value: "45 min", icon: Clock, trend: "On schedule", color: "text-orange-500" }
        ],
        recentOrders: [
          { id: 1, client: "Emma Wilson", service: "Haircut & Color", amount: 120.00, status: "In Progress", time: "10 min ago" },
          { id: 2, client: "Lisa Brown", service: "Manicure", amount: 45.00, status: "Completed", time: "30 min ago" },
          { id: 3, client: "Anna Taylor", service: "Spa Package", amount: 180.00, status: "Scheduled", time: "Next: 2:00 PM" }
        ]
      };
    case 'Retail':
      return {
        stats: [
          { label: "Today's Sales", value: "$5,230", icon: DollarSign, trend: "+18.2%", color: "text-green-500" },
          { label: "Customers", value: "156", icon: Users, trend: "+12.8%", color: "text-blue-500" },
          { label: "Items Sold", value: "234", icon: Store, trend: "+25.4%", color: "text-orange-500" },
          { label: "Inventory Value", value: "$45.2K", icon: Package, trend: "Healthy", color: "text-purple-500" }
        ],
        recentOrders: [
          { id: 1, customer: "David Lee", items: "Laptop, Mouse", amount: 899.00, status: "Completed", time: "5 min ago" },
          { id: 2, customer: "Rachel Green", items: "Phone Case", amount: 29.99, status: "Processing", time: "18 min ago" },
          { id: 3, customer: "Tom Harris", items: "Headphones, Cable", amount: 159.00, status: "Completed", time: "35 min ago" }
        ]
      };
    default:
      return {
        stats: [
          { label: "Today's Sales", value: "$3,240", icon: DollarSign, trend: "+12.5%", color: "text-green-500" },
          { label: "Active Users", value: "24", icon: Users, trend: "+3.2%", color: "text-blue-500" },
          { label: "Total Orders", value: "145", icon: ShoppingCart, trend: "+8.1%", color: "text-orange-500" },
          { label: "Plan Expiry", value: "45 days", icon: Calendar, trend: "Active", color: "text-purple-500" }
        ],
        recentOrders: [
          { id: 1, customer: "Customer 1", items: "General", amount: 125.00, status: "Completed", time: "5 min ago" },
          { id: 2, customer: "Customer 2", items: "General", amount: 89.50, status: "Processing", time: "12 min ago" },
          { id: 3, customer: "Customer 3", items: "General", amount: 234.00, status: "Completed", time: "25 min ago" }
        ]
      };
  }
};

// Dummy data for charts
const revenueData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 1900 },
  { name: 'Wed', revenue: 1500 },
  { name: 'Thu', revenue: 2200 },
  { name: 'Fri', revenue: 2800 },
  { name: 'Sat', revenue: 3200 },
  { name: 'Sun', revenue: 2600 }
];

const salesData = [
  { time: '9AM', sales: 45 },
  { time: '12PM', sales: 82 },
  { time: '3PM', sales: 65 },
  { time: '6PM', sales: 95 },
  { time: '9PM', sales: 58 }
];

const TenantDashboard = () => {
  const { user } = useAuth();
  const businessCategory = user?.businessCategory || 'Retail';
  const businessData = getBusinessData(businessCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">{user?.tenantName} - {businessCategory}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {businessData.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Daily Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent {businessCategory === 'Restaurant' ? 'Orders' : businessCategory === 'Salon' ? 'Appointments' : 'Transactions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businessData.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                <div>
                  <p className="font-medium text-foreground">
                    {businessCategory === 'Restaurant' ? order.table : businessCategory === 'Salon' ? order.client : order.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {businessCategory === 'Restaurant' ? order.items : businessCategory === 'Salon' ? order.service : order.items}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${order.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completed' || order.status === 'Served' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Processing' || order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDashboard;
