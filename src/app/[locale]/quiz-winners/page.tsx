import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function QuizWinnersPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Winners</CardTitle>
          <CardDescription>
            This is a placeholder page for the Quiz Winners section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would celebrate past quiz winners.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
