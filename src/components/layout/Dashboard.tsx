
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Truck, 
  Package, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Mock data for garage management
  const recentJobs = [
    { id: 1, vehicle: "Toyota RAV4", customer: "John Uwimana", status: "In Progress", priority: "High" },
    { id: 2, vehicle: "Honda Civic", customer: "Marie Mukamana", status: "Pending", priority: "Medium" },
    { id: 3, vehicle: "Nissan X-Trail", customer: "David Nshimiyimana", status: "Completed", priority: "Low" },
    { id: 4, vehicle: "Suzuki Swift", customer: "Grace Umutesi", status: "In Progress", priority: "High" },
  ];

  const equipmentAlerts = [
    { name: "Hydraulic Lift #2", issue: "Maintenance Due", severity: "warning" },
    { name: "Air Compressor", issue: "Low Pressure", severity: "error" },
    { name: "Diagnostic Scanner", issue: "Calibration Needed", severity: "info" },
  ];

  const lowStockItems = [
    { name: "Engine Oil 5W30", quantity: 5, unit: "bottles" },
    { name: "Brake Pads", quantity: 2, unit: "sets" },
    { name: "Air Filters", quantity: 8, unit: "pieces" },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 transition-all duration-300">
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Twiyubake Dashboard</h1>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slide-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
              <StatsCard 
                title="Active Jobs" 
                value="24"
                trend={12.5}
                icon={<Wrench />}
                className="bg-primary/5"
              />
              <StatsCard 
                title="Equipment Rented" 
                value="18"
                description="Out of 45 total"
                icon={<Truck />}
                className="bg-warning/5"
              />
              <StatsCard 
                title="Monthly Revenue" 
                value="₱2.4M"
                trend={8.2}
                trendLabel="vs last month"
                icon={<DollarSign />}
                className="bg-success/5"
              />
              <StatsCard 
                title="Low Stock Items" 
                value="6"
                description="Need restocking"
                icon={<Package />}
                className="bg-danger/5"
              />
            </div>
            
            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Recent Jobs */}
              <div className="space-y-4 animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Recent Jobs
                    </CardTitle>
                    <CardDescription>Latest garage activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{job.vehicle}</p>
                          <p className="text-sm text-muted-foreground">{job.customer}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant={
                            job.status === "Completed" ? "default" :
                            job.status === "In Progress" ? "secondary" : "outline"
                          }>
                            {job.status}
                          </Badge>
                          <Badge variant={
                            job.priority === "High" ? "destructive" :
                            job.priority === "Medium" ? "secondary" : "outline"
                          }>
                            {job.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Middle column - Equipment Alerts */}
              <div className="space-y-4 animate-slide-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Equipment Alerts
                    </CardTitle>
                    <CardDescription>Maintenance and issues</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {equipmentAlerts.map((alert, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className={`h-3 w-3 rounded-full ${
                          alert.severity === "error" ? "bg-danger" :
                          alert.severity === "warning" ? "bg-warning" : "bg-primary"
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{alert.name}</p>
                          <p className="text-sm text-muted-foreground">{alert.issue}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Low Stock Alert
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lowStockItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.quantity} {item.unit} remaining</p>
                        </div>
                        <Badge variant="outline">Low</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Quick Actions */}
              <div className="space-y-4 animate-slide-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Wrench className="h-4 w-4 mr-2" />
                      Create New Job
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Truck className="h-4 w-4 mr-2" />
                      Rent Equipment
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Add Customer
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Update Inventory
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Today's Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Jobs Completed</span>
                      <Badge variant="default">5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Equipment Returns</span>
                      <Badge variant="secondary">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Customers</span>
                      <Badge variant="outline">2</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Today</span>
                      <span className="font-medium">₱85,600</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
