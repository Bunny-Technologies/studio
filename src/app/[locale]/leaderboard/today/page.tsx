import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LeaderboardPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Today's Leaderboard</CardTitle>
          <CardDescription>
            This page is a placeholder for the daily leaderboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            In a real application, this page would display the top 1000 players
            with their ranks and reward tiers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
