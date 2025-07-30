import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const scholarships = [
    {
        title: "Annual Merit Scholarship",
        amount: "₹1,00,000",
        description: "Awarded to the top 100 students with the highest cumulative scores over a 365-day participation period. This scholarship is intended to support their further education.",
        eligibility: "Must be an active participant for 365 days. Based on cumulative score and consistency.",
        deadline: "December 31st, Annually",
        status: "Open"
    },
    {
        title: "STEM Achiever Grant",
        amount: "₹50,000",
        description: "A special grant for students who excel in our quarterly Science & Technology Olympiads. This grant aims to encourage future innovators and scientists.",
        eligibility: "Must be among the top 10 winners of any Science or Mathematics Olympiad in the academic year.",
        deadline: "June 30th, Annually",
        status: "Open"
    },
     {
        title: "Rural Talent Support",
        amount: "₹25,000 + Tech Gadget",
        description: "A dedicated scholarship to support and encourage talented students from rural areas to participate and excel in our quiz programs.",
        eligibility: "Top 50 performers from designated rural districts. Proof of residence required.",
        deadline: "September 30th, Annually",
        status: "Upcoming"
    },
    {
        title: "Linguistic Excellence Award",
        amount: "₹20,000",
        description: "For students demonstrating exceptional skills in Telugu, Hindi, or English language quizzes throughout the year.",
        eligibility: "Highest average score in language-specific quiz categories over a 6-month period.",
        deadline: "July 31st, Annually",
        status: "Closed"
    },
]

export default function ScholarshipsPage() {
  return (
    <div className="p-4 md:p-8">
       <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <CardTitle>Scholarships & Awards</CardTitle>
          </div>
          <CardDescription>
            Rewarding academic excellence and consistent participation. We believe in investing in our brightest minds.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {scholarships.map((scholarship) => (
            <Card key={scholarship.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="mb-1">{scholarship.title}</CardTitle>
                            <CardDescription>
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Award className="w-5 h-5"/>
                                    <span>{scholarship.amount}</span>
                                </div>
                            </CardDescription>
                        </div>
                        <Badge variant={scholarship.status === 'Open' ? 'default' : 'secondary'} 
                               className={scholarship.status === 'Open' ? 'bg-green-600 text-white' : ''}>
                            {scholarship.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                    <div>
                        <h4 className="font-semibold text-sm mb-1">Eligibility:</h4>
                        <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4"/>
                        <strong>Deadline:</strong>
                        <span>{scholarship.deadline}</span>
                    </div>
                    <Button disabled={scholarship.status !== 'Open'}>
                        {scholarship.status === 'Open' ? 'Learn More & Apply' : 'Applications Closed'}
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}