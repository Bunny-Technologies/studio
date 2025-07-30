import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function EventsPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            This is a placeholder page for the Events section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would list upcoming and past events.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
