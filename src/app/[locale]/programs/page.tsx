import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProgramsPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Programs</CardTitle>
          <CardDescription>
            This is a placeholder page for the Programs section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would detail the various programs
            offered.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
