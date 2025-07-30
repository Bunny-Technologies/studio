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
import { Mail, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function EnquiryPage() {
  return (
    <div className="p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Mail className="w-8 h-8 text-primary" />
                <CardTitle>Contact Us</CardTitle>
            </div>
          <CardDescription>
            Have a question, suggestion, or a partnership proposal? Fill out the form below and our team will get back to you shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="e.g., Priya Rao" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="e.g., priya@example.com" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                 <Select>
                    <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a reason for contacting us" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="general">General Enquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership Proposal</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="scholarship">Scholarship Information</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Your message</Label>
              <Textarea placeholder="Please describe your enquiry in detail here." id="message" rows={6}/>
            </div>
            <div className="flex justify-end">
                <Button className="gap-2">
                    <Send className="w-4 h-4" />
                    Submit Enquiry
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}