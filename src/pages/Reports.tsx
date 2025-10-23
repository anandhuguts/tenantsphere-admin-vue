import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { reportsAPI } from '@/services/api';
import { Download, FileText, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Reports = () => {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [tenantGrowth, setTenantGrowth] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv');
  const { toast } = useToast();

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    try {
      // TODO: Replace with actual API calls
      const [revenue, growth, categories] = await Promise.all([
        reportsAPI.getRevenueTrends(),
        reportsAPI.getTenantGrowth(),
        reportsAPI.getCategoryDistribution()
      ]);

      setRevenueData(revenue);
      setTenantGrowth(growth);
      setCategoryData(categories);
    } catch (error) {
      console.error('Failed to load report data:', error);
    }
  };

  const handleExport = async (reportType: string) => {
    try {
      // TODO: Replace with actual export API call
      await reportsAPI.exportReport(reportType, exportFormat);
      
      toast({
        title: 'Export started',
        description: `Exporting ${reportType} report as ${exportFormat.toUpperCase()}...`,
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export report. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights into your business performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Revenue Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Monthly revenue trends over the past 10 months</CardDescription>
            </div>
            <Button variant="outline" onClick={() => handleExport('revenue')}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => `$${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fill="url(#colorRevenue)"
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Growth Metrics */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Tenant Growth */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tenant Growth</CardTitle>
                <CardDescription>Active vs trial tenants comparison</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport('tenant-growth')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tenantGrowth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="active" fill="hsl(var(--primary))" name="Active" radius={[4, 4, 0, 0]} />
                <Bar dataKey="trial" fill="hsl(var(--secondary))" name="Trial" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Tenants by business category</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport('categories')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue (YTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,824,000</div>
            <div className="flex items-center gap-1 text-sm text-success mt-2">
              <TrendingUp className="h-4 w-4" />
              <span>+18.2% from last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Revenue per Tenant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$23,385</div>
            <div className="flex items-center gap-1 text-sm text-success mt-2">
              <TrendingUp className="h-4 w-4" />
              <span>+12.4% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.2%</div>
            <div className="flex items-center gap-1 text-sm text-success mt-2">
              <TrendingUp className="h-4 w-4" />
              <span>+2.1% from last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export All Reports</CardTitle>
          <CardDescription>Download comprehensive reports in your preferred format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start" onClick={() => handleExport('revenue')}>
              <FileText className="mr-2 h-4 w-4" />
              Revenue Report
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleExport('tenants')}>
              <FileText className="mr-2 h-4 w-4" />
              Tenant Report
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleExport('users')}>
              <FileText className="mr-2 h-4 w-4" />
              User Report
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleExport('comprehensive')}>
              <FileText className="mr-2 h-4 w-4" />
              Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
