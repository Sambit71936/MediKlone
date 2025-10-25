import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedbackItem {
  id: string;
  text: string;
  aiSummary: string;
  rootCause: string;
  department: string;
  status: 'new' | 'in-progress' | 'resolved';
  urgency: 1 | 2 | 3;
  category: string;
  createdAt: string;
}

export function FeedbackDashboard() {
  const [filters, setFilters] = useState({
    category: 'all',
    urgency: 'all',
    status: 'all',
  });

  // Mock data - replace with actual API call
  const feedbackData: FeedbackItem[] = [];

  const getUrgencyColor = (urgency: number) => {
    switch (urgency) {
      case 3: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 1: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex gap-4 mb-6">
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="clinical">Clinical</SelectItem>
            <SelectItem value="administrative">Administrative</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.urgency}
          onValueChange={(value) => setFilters({ ...filters, urgency: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgencies</SelectItem>
            <SelectItem value="1">Low</SelectItem>
            <SelectItem value="2">Medium</SelectItem>
            <SelectItem value="3">High</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>AI Summary</TableHead>
            <TableHead>Root Cause</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbackData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.aiSummary}</TableCell>
              <TableCell>{item.rootCause}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getUrgencyColor(item.urgency)}>
                  {item.urgency}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}