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
import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const winners = [
    { rank: 1, name: 'Aditya Varma', school: 'Hyderabad Public School', prize: '₹25,000 Scholarship', avatar: 'https://placehold.co/40x40.png', hint: 'boy portrait' },
    { rank: 2, name: 'Saanvi Reddy', school: 'Oakridge International School', prize: 'Samsung Tablet', avatar: 'https://placehold.co/40x40.png', hint: 'girl portrait' },
    { rank: 3, name: 'Rohan Kumar', school: 'Delhi Public School, Nacharam', prize: 'Smart Watch', avatar: 'https://placehold.co/40x40.png', hint: 'boy professional' },
    { rank: 4, name: 'Isha Singh', school: 'Chirec International School', prize: 'Gift Vouchers', avatar: 'https://placehold.co/40x40.png', hint: 'girl professional' },
    { rank: 5, name: 'Kabir Das', school: 'Vidyaranya High School', prize: 'Gift Vouchers', avatar: 'https://placehold.co/40x40.png', hint: 'man glasses' },
]

export default function QuizWinnersPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Trophy className="w-8 h-8 text-primary" />
                <CardTitle>Recent Quiz Winners</CardTitle>
            </div>
          <CardDescription>
            Celebrating the brightest minds from our latest Monthly Championship (May 2024).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead className="text-right">Prize</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {winners.map(winner => (
                    <TableRow key={winner.rank}>
                        <TableCell className="font-bold text-lg">{winner.rank}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={winner.avatar} data-ai-hint={winner.hint} />
                                    <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{winner.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{winner.school}</TableCell>
                        <TableCell className="text-right font-semibold text-primary">{winner.prize}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}