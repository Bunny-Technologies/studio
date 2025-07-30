import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ScholarshipsPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Scholarships</CardTitle>
          <CardDescription>
            This is a placeholder page for the Scholarships section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would provide information on
            available scholarships.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
