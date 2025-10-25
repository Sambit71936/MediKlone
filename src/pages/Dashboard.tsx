import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import {
  Users,
  BedDouble,
  TestTube,
  Receipt,
  UserPlus,
  FileText,
  Activity,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      icon: Users,
      trend: "+12% from last month",
      trendUp: true,
      variant: "default" as const,
    },
    {
      title: "Occupied Beds",
      value: "156/200",
      icon: BedDouble,
      trend: "78% occupancy rate",
      trendUp: true,
      variant: "info" as const,
    },
    {
      title: "Pending Tests",
      value: "43",
      icon: TestTube,
      trend: "15 urgent",
      trendUp: false,
      variant: "warning" as const,
    },
    {
      title: "Today's Revenue",
      value: "$24,680",
      icon: Receipt,
      trend: "+8% vs yesterday",
      trendUp: true,
      variant: "success" as const,
    },
  ];

  const quickActions = [
    {
      title: "Register New Patient",
      description: "Add new patient to the system",
      icon: UserPlus,
      path: "/registration",
    },
    {
      title: "Generate Bill",
      description: "Create new billing invoice",
      icon: Receipt,
      path: "/billing",
    },
    {
      title: "View Discharge Summary",
      description: "Access patient discharge reports",
      icon: FileText,
      path: "/discharge",
    },
    {
      title: "Check Lab Results",
      description: "Review diagnostic reports",
      icon: Activity,
      path: "/diagnostics",
    },
  ];

  const recentActivities = [
    { patient: "Arun Kumar", action: "Registered", time: "2 mins ago", status: "success" },
    { patient: "Priya Shankar", action: "Lab Test Completed", time: "15 mins ago", status: "info" },
    { patient: "Karthik Subramanian", action: "Admitted to ICU", time: "1 hour ago", status: "warning" },
    { patient: "Meena Lakshmi", action: "Discharged", time: "2 hours ago", status: "success" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                {...action}
                onClick={() => navigate(action.path)}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{activity.patient}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Average Wait Time</span>
                    <span className="font-medium text-foreground">12 mins</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-3/4 rounded-full bg-success"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Bed Utilization</span>
                    <span className="font-medium text-foreground">78%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[78%] rounded-full bg-info"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Staff Efficiency</span>
                    <span className="font-medium text-foreground">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[92%] rounded-full bg-success"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
