import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardList, Plus, Filter } from 'lucide-react';
import { useState } from 'react';

const dummyTasks = [
  { id: 1, title: 'Review maintenance request', description: 'Unit 102 - AC repair', priority: 'high', status: 'pending', dueDate: '2024-01-15' },
  { id: 2, title: 'Process rent payment', description: 'Tenant John Doe - Unit 205', priority: 'medium', status: 'in-progress', dueDate: '2024-01-16' },
  { id: 3, title: 'Schedule property inspection', description: 'Building A - Annual inspection', priority: 'low', status: 'pending', dueDate: '2024-01-20' },
  { id: 4, title: 'Update lease agreement', description: 'Unit 301 - Renewal', priority: 'high', status: 'pending', dueDate: '2024-01-14' },
  { id: 5, title: 'Respond to tenant inquiry', description: 'Parking space request', priority: 'medium', status: 'completed', dueDate: '2024-01-12' },
  { id: 6, title: 'Organize maintenance team', description: 'Monthly meeting', priority: 'low', status: 'in-progress', dueDate: '2024-01-18' },
];

const Tasks = () => {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState(dummyTasks);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-500';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = [
    { label: 'Total Tasks', value: tasks.length },
    { label: 'Pending', value: tasks.filter(t => t.status === 'pending').length },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
    { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage and track your tasks</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
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

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Task List
            </CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox 
                  checked={task.status === 'completed'}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </h3>
                    <Badge variant={getPriorityColor(task.priority) as any}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
