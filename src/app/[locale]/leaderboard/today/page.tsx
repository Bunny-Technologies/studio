'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  userId: string;
}

// Mock data for the leaderboard
const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
    { rank: 1, name: 'Aarav Sharma', score: 98, userId: 'user1' },
    { rank: 2, name: 'Vivaan Patel', score: 95, userId: 'user2' },
    { rank: 3, name: 'Aditya Singh', score: 92, userId: 'user3' },
    { rank: 4, name: 'Diya Gupta', score: 90, userId: 'user4' },
    { rank: 5, name: 'Ishaan Kumar', score: 88, userId: 'user5' },
    { rank: 6, name: 'Ananya Reddy', score: 85, userId: 'user6' },
    { rank: 7, name: 'Rohan Mehta', score: 83, userId: 'user7' },
    { rank: 8, name: 'Saanvi Joshi', score: 80, userId: 'user8' },
    { rank: 9, name: 'Kabir Verma', score: 78, userId: 'user9' },
    { rank: 10, name: 'Myra Khan', score: 75, userId: 'user10' },
];


export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use mock data instead of fetching from Firebase
        setLeaderboard(MOCK_LEADERBOARD_DATA);

      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load the leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Today's Leaderboard</CardTitle>
          <CardDescription>Top 10 players for today's quiz. (Mock Data)</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!loading && !error && leaderboard.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((player) => (
                  <TableRow key={player.userId}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-right">{player.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
           {!loading && !error && leaderboard.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
                No submissions for today's quiz yet. Be the first!
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
