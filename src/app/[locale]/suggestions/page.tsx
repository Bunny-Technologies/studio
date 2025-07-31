'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lightbulb, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SuggestionsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion) {
      toast({
        title: 'Suggestion Required',
        description: 'Please enter your suggestion before submitting.',
        variant: 'destructive',
      });
      return;
    }

    const subject = `New Suggestion for EduQuiz.world from ${name || 'Anonymous'}`;
    const body = `Name: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\nSuggestion:\n${suggestion}`;
    const mailtoLink = `mailto:vtejasviram@bunnytechnologies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default email client
    window.location.href = mailtoLink;

    // Provide feedback to the user
    toast({
      title: 'Redirecting to Email Client',
      description: 'Please complete sending the email from your mail application.',
    });
  };

  return (
    <div className="p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Lightbulb className="w-8 h-8 text-primary" />
            <CardTitle>Valuable Suggestions</CardTitle>
          </div>
          <CardDescription>
            We highly value your feedback. Please share any suggestions you have to help us improve the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., Priya Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g., priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="suggestion">Your Suggestion</Label>
              <Textarea
                placeholder="Please describe your suggestion in detail here."
                id="suggestion"
                rows={6}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="gap-2">
                <Send className="w-4 h-4" />
                Submit Suggestion
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
