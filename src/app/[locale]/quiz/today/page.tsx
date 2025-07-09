import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Question } from '@/lib/types';

// Mock Data
const dailyQuestions: Question[] = Array.from({ length: 25 }, (_, i) => ({
    id: `q${i + 1}`,
    text: `Question ${i + 1}: Who was the first Prime Minister of India? This is a sample question text that might be long.`,
    options: ['Option A', 'Option B', 'Option C'],
    correctIndex: 0,
    category: 'GK',
    difficulty: 'easy',
}));

function StudentHeaderCard() {
  const t = useTranslations('Quiz');
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('student_login')}</h2>
          <div className="flex items-center gap-2">
            <Label htmlFor="date">{`Daily Quiz: Date:`}</Label>
            <Input id="date" type="text" className="w-32" defaultValue={new Date().toLocaleDateString()} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">{t('name')}</Label>
            <Input type="text" id="name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="age">{t('age')}</Label>
            <Input type="number" id="age" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="class">{t('class')}</Label>
            <Input type="text" id="class" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="school">{t('school')}</Label>
            <Input type="text" id="school" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="idNo">{t('id_no')}</Label>
            <Input type="text" id="idNo" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone">{t('phone_no')}</Label>
            <Input type="tel" id="phone" />
          </div>
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="area">{t('area')}</Label>
            <Input type="text" id="area" />
          </div>
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="points">{t('points_obtained')}</Label>
            <Input type="text" id="points" readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuestionRow({ question, index }: { question: Question; index: number }) {
  // State for result would be handled here in a real app
  return (
    <TableRow>
      <TableCell className="font-medium align-top">{`Q.${index + 1}`}</TableCell>
      <TableCell className="align-top">
        <p className="mb-2 font-semibold">{question.text}</p>
        <RadioGroup className="flex flex-col md:flex-row gap-4">
          {question.options.map((option, i) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={`${i}`} id={`q${index}-o${i}`} />
              <Label htmlFor={`q${index}-o${i}`}>{`${String.fromCharCode(97 + i)}) ${option}`}</Label>
            </div>
          ))}
        </RadioGroup>
      </TableCell>
      <TableCell className="text-center align-top">(.........)</TableCell>
      <TableCell className="text-center align-top">(.........)</TableCell>
      <TableCell className="text-center align-top">(.........)</TableCell>
    </TableRow>
  );
}

function PrivilegesBanner() {
    const t = useTranslations('Quiz');
    return (
        <div className="mt-8 p-4 bg-yellow-200 text-yellow-900 rounded-md border border-yellow-300">
            <h3 className="font-bold text-center text-lg mb-2">{t('privileges_banner_title')}</h3>
            <div className="text-sm space-y-1">
                <p>{t('privileges_line_a')}</p>
                <p>{t('privileges_line_b')}</p>
                <p>{t('privileges_line_c')}</p>
            </div>
            <p className="text-xs mt-3 text-center">{t('privileges_footer')}</p>
        </div>
    )
}

export default function DailyQuizPage() {
  const t = useTranslations('Quiz');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <StudentHeaderCard />
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No.</TableHead>
                  <TableHead>Question & Options</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-center">Right</TableHead>
                  <TableHead className="text-center">Score/points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyQuestions.map((q, i) => (
                  <QuestionRow key={q.id} question={q} index={i} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="fixed bottom-4 right-4">
            <Button size="lg" className="shadow-2xl">{t('submit')}</Button>
        </div>

        <PrivilegesBanner />
      </div>
    </div>
  );
}
