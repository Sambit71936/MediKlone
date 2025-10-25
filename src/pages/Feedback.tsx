import React, { useState } from 'react';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { FeedbackDashboard } from '@/components/feedback/FeedbackDashboard';
import { FeedbackChat } from '@/components/feedback/FeedbackChat';
import { FeedbackAnalytics } from '@/components/feedback/FeedbackAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { feedbackService } from '@/services/feedbackService';


export default function FeedbackPage() {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [lastFeedback, setLastFeedback] = useState<any | null>(null);

  const handleFeedbackSubmit = async (formData: any) => {
    try {
      const response = await feedbackService.submitFeedback(formData);
      setLastFeedback(response);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback. See the AI summary below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <FeedbackDashboard />
        </TabsContent>

        <TabsContent value="submit">
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
          {lastFeedback && (
            <div className="mt-6 p-4 border rounded bg-muted">
              <h3 className="font-semibold mb-2">AI Feedback Summary</h3>
              <div><b>Summary:</b> {lastFeedback.aiSummary || 'N/A'}</div>
              <div><b>Workflow Fault:</b> {lastFeedback.workflowFault || 'None detected'}</div>
              <div><b>Actionable Advice:</b> {lastFeedback.actionableAdvice || 'N/A'}</div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <FeedbackAnalytics />
        </TabsContent>
      </Tabs>

      {selectedFeedbackId && (
        <FeedbackChat
          feedbackId={selectedFeedbackId}
          isOpen={chatOpen}
          onClose={() => {
            setChatOpen(false);
            setSelectedFeedbackId(null);
          }}
        />
      )}
    </div>
  );
}