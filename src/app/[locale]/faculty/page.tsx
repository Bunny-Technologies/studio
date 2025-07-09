import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FacultyPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Faculty Dashboard</CardTitle>
          <CardDescription>
            Manage categories and questions here. This page is a placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would be protected and contain CRUD
            interfaces for managing quiz content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
