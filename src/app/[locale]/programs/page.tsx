import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarDays, Trophy, BrainCircuit } from 'lucide-react';

export default function ProgramsPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <BrainCircuit className="w-8 h-8 text-primary" />
                <CardTitle>Our Programs</CardTitle>
            </div>
          <CardDescription>
            Engaging activities and competitions designed to foster learning and reward excellence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Daily Quiz Challenge</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 text-muted-foreground">
                <p className="mb-2">The core of our platform. Every day, students can participate in a new, exciting quiz covering a range of subjects including science, mathematics, general knowledge, and current affairs. This program is designed to make learning a consistent and fun daily habit.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>25 new questions every day.</li>
                    <li>Instant results and performance analysis.</li>
                    <li>Earn points for every correct answer.</li>
                    <li>Top daily performers are featured on the leaderboard.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                 <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold">Monthly Championship</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 text-muted-foreground">
                <p className="mb-2">A grand competition held at the end of each month. The top 100 participants with the highest cumulative scores from the daily quizzes are invited to participate in a live championship event. This is where the best of the best compete for major prizes and recognition.</p>
                 <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Eligibility based on 30-day participation and scores.</li>
                    <li>Advanced-level questions to challenge top students.</li>
                    <li>Prizes include gadgets, gift vouchers, and certificates.</li>
                    <li>Winners are felicitated at a public event.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                 <div className="flex items-center gap-3">
                    <BrainCircuit className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Subject-Specific Olympiads</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 text-muted-foreground">
                <p className="mb-2">Quarterly events that allow students to dive deep into their favorite subjects. We host dedicated Olympiads for Mathematics, Science, Social Studies, and English. These events are perfect for students who want to showcase their expertise in a specific area.</p>
                 <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Separate competitions for different subjects.</li>
                    <li>In-depth questions prepared by subject matter experts.</li>
                    <li>Specialized certificates and medals for winners.</li>
                    <li>An opportunity to benchmark skills against peers statewide.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}