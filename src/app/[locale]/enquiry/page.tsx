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

export default function EnquiryPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Enquiry</CardTitle>
          <CardDescription>
            Have a question? Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your Name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your Email" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Your message</Label>
              <Textarea placeholder="Type your message here." id="message" />
            </div>
            <Button>Submit Enquiry</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
