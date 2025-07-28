'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
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

import { app } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  userId: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore(app);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        setError(null);
        
        const today = new Date().toISOString().split('T')[0];
        
        // 1. Get top 100 submissions for today
        const submissionsQuery = query(
          collection(db, 'quizSubmissions'),
          where('quizDate', '==', today),
          orderBy('score', 'desc'),
          limit(100)
        );
        
        const submissionDocs = await getDocs(submissionsQuery);
        
        if (submissionDocs.empty) {
          setLeaderboard([]);
          return;
        }

        // 2. Get user profiles for the top submissions
        const leaderboardDataPromises = submissionDocs.docs.map(async (submissionDoc, index) => {
          const submissionData = submissionDoc.data();
          const userDocRef = doc(db, 'users', submissionData.userId);
          const userDoc = await getDoc(userDocRef);

          let name = 'Unknown User';
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            name = userData.name;
          }
          
          return {
            rank: index + 1,
            name: name,
            score: submissionData.score,
            userId: submissionData.userId,
          };
        });

        const resolvedLeaderboardData = await Promise.all(leaderboardDataPromises);
        setLeaderboard(resolvedLeaderboardData);

      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load the leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [db]);

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Today's Leaderboard</CardTitle>
          <CardDescription>Top 100 players for today's quiz.</CardDescription>
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
