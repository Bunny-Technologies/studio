import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>About Us</CardTitle>
          <CardDescription>
            This is a placeholder page for the About Us section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would contain information about the
            company or organization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
