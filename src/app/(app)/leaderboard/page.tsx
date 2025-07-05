import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leaderboardEntries } from "@/lib/data";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const entries = leaderboardEntries;

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-accent" />
            <CardTitle className="font-headline text-3xl">
              Daily Leaderboard
            </CardTitle>
          </div>
          <CardDescription>
            Top performers from today's quiz. Keep it up!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.uid}>
                  <TableCell className="font-bold text-lg text-muted-foreground">
                    {entry.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={entry.avatarUrl} alt={entry.displayName} data-ai-hint="person avatar" />
                        <AvatarFallback>
                          {entry.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.displayName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg text-primary">
                    {entry.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
