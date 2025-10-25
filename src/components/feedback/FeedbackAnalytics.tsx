import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface AnalyticsData {
  departmentIssues: {
    department: string;
    count: number;
  }[];
  urgencyDistribution: {
    date: string;
    high: number;
    medium: number;
    low: number;
  }[];
  resolutionTimes: {
    department: string;
    avgTime: number;
  }[];
}

export function FeedbackAnalytics() {
  // Mock data - replace with actual API call
  const analyticsData: AnalyticsData = {
    departmentIssues: [],
    urgencyDistribution: [],
    resolutionTimes: [],
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feedback Analytics</h2>
        <Button onClick={handleExportCSV}>Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Issues per Department */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Issues by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.departmentIssues}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Urgency Heatmap */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Urgency Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.urgencyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#ff0000" />
              <Line type="monotone" dataKey="medium" stroke="#ffa500" />
              <Line type="monotone" dataKey="low" stroke="#00ff00" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Resolution Time Stats */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Average Resolution Time by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.resolutionTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgTime" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}