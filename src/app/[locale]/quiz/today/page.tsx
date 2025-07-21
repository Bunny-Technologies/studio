'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

import type { Question } from '@/lib/types';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';

function DottedLineInput({ label, className }: { label: string, className?: string }) {
    return (
        <div className={`flex items-end gap-2 ${className}`}>
            <label className="text-sm font-medium whitespace-nowrap">{label}:</label>
            <div className="w-full border-b border-dotted border-gray-600 h-5"></div>
        </div>
    )
}

function StudentHeader() {
    return (
        <div className="border-2 border-blue-400 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Student Login:</h2>
                <div className="flex items-center gap-2">
                    <label className="font-bold">Daily Quiz :</label>
                    <div className="border-2 rounded-md w-24 h-6 bg-gray-100"></div>
                     <label className="font-bold">Date :</label>
                    <div className="border-2 rounded-md w-24 h-6 bg-gray-100"></div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>Name</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                 <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>Age</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                 <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>School</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                 <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>Class</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto_1fr] items-end gap-2">
                    <label>ID No.</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                    <label>Ph.No.</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                 <div className="grid grid-cols-[auto_1fr_auto_1fr] items-end gap-2">
                    <label>Area</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                    <label>Points obtained</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
            </div>
        </div>
    )
}

function QuestionRow({ question, index }: { question: Question; index: number }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 py-2 border-b border-gray-200">
        <div className="font-semibold pt-1">{`Q.${index + 1})`}</div>
        <div>
            <p className="font-medium mb-2">{question.text}</p>
            <RadioGroup className="flex flex-col sm:flex-row gap-x-6 gap-y-1">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={`${i}`} id={`q${index}-o${i}`} />
                  <Label htmlFor={`q${index}-o${i}`} className="font-normal">{`${String.fromCharCode(97 + i)})`}</Label>
                   <div className="w-28 border-b border-dotted border-gray-500">{option}</div>
                </div>
              ))}
            </RadioGroup>
        </div>
         <div className="flex gap-2 text-sm text-center pt-1">
            <span className="w-20">(.........)</span>
            <span className="w-20">(.........)</span>
            <span className="w-20">(.........)</span>
        </div>
    </div>
  );
}

function QuizLoadingSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-x-4 py-2">
                    <Skeleton className="h-6 w-10" />
                    <div className="w-full space-y-3">
                        <Skeleton className="h-5 w-4/5" />
                        <div className="flex gap-6">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-5 w-28" />
                        </div>
                    </div>
                </div>
            ))}
             <p className="text-center text-primary font-semibold">Generating your quiz questions...</p>
        </div>
    );
}

function ResultHeader() {
    return (
        <div className="grid grid-cols-[1fr_auto] gap-x-4 mb-2">
            <div></div>
            <div className="flex gap-2 text-sm font-bold text-center">
                <span className="w-20">Result</span>
                <span className="w-20">Right</span>
                <span className="w-20">Score/points</span>
            </div>
        </div>
    )
}

function SubmitSection() {
    return (
        <div className="flex flex-col items-center mt-4 text-sm">
             <div className="flex items-center gap-4">
                <Button>Submit : >>>>>> </Button>
                <div className="text-right">
                    <p>Result : ................</p>
                </div>
            </div>
            <p className="mt-2 font-semibold">Quiz contents: A). Health Topics B). Science & Technology C).Sports & Games D).G.K & Current Affairs E).History</p>
        </div>
    )
}


function PrivilegesBanner() {
    const t = useTranslations('Quiz');
    return (
        <div className="mt-8 p-4 bg-yellow-200 text-yellow-900 rounded-md border-2 border-yellow-400">
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(null);
        const quizQuestions = await generateQuiz({
          category: 'General Knowledge for students in India',
          count: 25,
          language: 'English'
        });
        setQuestions(quizQuestions);
      } catch (err) {
        console.error(err);
        setError('Failed to generate quiz questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <StudentHeader />
        
        <ResultHeader />
        
        {loading && <QuizLoadingSkeleton />}
        
        {error && (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {!loading && !error && (
            <>
                <div className="space-y-1">
                    {questions.map((q, i) => (
                      <QuestionRow key={q.id || i} question={q} index={i} />
                    ))}
                </div>
                <SubmitSection />
            </>
        )}

        <PrivilegesBanner />
      </div>
    </div>
  );
}
