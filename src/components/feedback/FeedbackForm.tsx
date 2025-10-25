import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => void;
}

export interface FeedbackFormData {
  text: string;
  screenshot?: File;
  userId?: string;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    text: '',
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onSubmit({
        ...formData,
        screenshot: screenshot || undefined,
      });
      setFormData({ text: '' });
      setScreenshot(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Feedback
            <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Please describe your feedback or issue..."
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Screenshot (optional)
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </Card>
  );
}