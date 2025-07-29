'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle2, XCircle } from 'lucide-react';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import type { Question, UserProfile } from '@/lib/types';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { cn } from '@/lib/utils';
import { app } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

function StudentHeader({ profile, score }: { profile: Partial<UserProfile> | null, score: number | null }) {
    const [today, setToday] = useState('');

    useEffect(() => {
        setToday(new Date().toLocaleDateString('en-GB'));
    }, []);

    return (
        <div className="border-2 border-blue-400 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Student Login:</h2>
                <div className="flex items-center gap-2">
                    <label className="font-bold">Daily Quiz :</label>
                    <div className="border-2 rounded-md w-24 h-6 bg-gray-100"></div>
                     <label className="font-bold">Date :</label>
                    <div className="border-2 rounded-md w-24 h-6 bg-gray-100 flex items-center justify-center text-sm">{today}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>Name</label><div className="border-b border-dotted border-gray-600 h-5">{profile?.name || '...'}</div>
                </div>
                 <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>Age</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                 <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>School</label><div className="border-b border-dotted border-gray-600 h-5">{profile?.school || '...'}</div>
                </div>
                 <div className="grid grid-cols-[auto_1fr] items-end gap-2">
                    <label>Class</label><div className="border-b border-dotted border-gray-600 h-5">{profile?.class || '...'}</div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto_1fr] items-end gap-2">
                    <label>ID No.</label><div className="border-b border-dotted border-gray-600 h-5">{profile?.idNo || '...'}</div>
                    <label>Ph.No.</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                </div>
                 <div className="grid grid-cols-[auto_1fr_auto_1fr] items-end gap-2">
                    <label>Area</label><div className="border-b border-dotted border-gray-600 h-5"></div>
                    <label>Points obtained</label><div className="border-b border-dotted border-gray-600 h-5">{score !== null ? score : '...'}</div>
                </div>
            </div>
        </div>
    )
}

function QuestionRow({ 
    question, 
    index, 
    onAnswerChange, 
    selectedAnswer,
    isSubmitted 
}: { 
    question: Question; 
    index: number;
    onAnswerChange: (questionIndex: number, answerIndex: number) => void;
    selectedAnswer: number | null;
    isSubmitted: boolean;
}) {
  const isCorrect = selectedAnswer === question.correctIndex;

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 py-2 border-b border-gray-200">
        <div className="font-semibold pt-1">{`Q.${index + 1})`}</div>
        <div>
            <p className="font-medium mb-2">{question.text}</p>
            <RadioGroup 
                className="flex flex-col sm:flex-row gap-x-6 gap-y-1"
                onValueChange={(value) => onAnswerChange(index, parseInt(value))}
                disabled={isSubmitted}
                value={selectedAnswer !== null ? String(selectedAnswer) : undefined}
            >
              {question.options.map((option, i) => {
                const isCorrectOption = i === question.correctIndex;
                return (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={`${i}`} id={`q${index}-o${i}`} />
                      <Label htmlFor={`q${index}-o${i}`} className={cn(
                          "font-normal",
                          isSubmitted && selectedAnswer === i && !isCorrect && "text-red-600",
                          isSubmitted && isCorrectOption && "text-green-600"
                      )}>
                        {`${String.fromCharCode(97 + i)})`}
                      </Label>
                       <div className="w-28 border-b border-dotted border-gray-500">{option}</div>
                    </div>
                );
              })}
            </RadioGroup>
        </div>
         <div className="flex gap-2 text-sm text-center pt-1">
            {isSubmitted && selectedAnswer !== null ? (
              isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="w-20 text-green-600 font-bold">Right</span>
                  <span className="w-20 font-bold">4</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="w-20 text-red-600 font-bold">Wrong</span>
                  <span className="w-20 font-bold">0</span>
                </>
              )
            ) : (
              <>
                <span className="w-20">(.........)</span>
                <span className="w-20">(.........)</span>
                <span className="w-20">(.........)</span>
              </>
            )}
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
             <p className="text-center text-primary font-semibold">Preparing your daily quiz...</p>
        </div>
    );
}

function ResultHeader() {
    return (
        <div className="grid grid-cols-[1fr_auto] gap-x-4 mb-2">
            <div></div>
            <div className="flex gap-2 text-sm font-bold text-center">
                <span className="w-20">Result</span>
                <span className="w-20">Right/Wrong</span>
                <span className="w-20">Score/points</span>
            </div>
        </div>
    )
}

function SubmitSection({ 
    onSubmit, 
    isSubmitted, 
    score,
    isSubmitting
}: { 
    onSubmit: () => void;
    isSubmitted: boolean;
    score: number | null;
    isSubmitting: boolean;
}) {
    return (
        <div className="flex flex-col items-center mt-4 text-sm">
             <div className="flex items-center gap-4">
                <Button onClick={onSubmit} disabled={isSubmitted || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : (isSubmitted ? 'Submitted' : 'Submit : >>>>>>')}
                </Button>
                <div className="text-right font-semibold">
                    <p>Result : {score !== null ? `${score} / 100` : '................'}</p>
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile> | null>(null);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch user profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    let profile: Partial<UserProfile> | null = null;
    if (storedProfile) {
      profile = JSON.parse(storedProfile);
      setUserProfile(profile);
    }

    async function fetchOrGenerateQuiz() {
      if (!profile || !profile.class) {
        setError('Could not find student class. Please log in again.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const quizDocRef = doc(db, 'dailyQuizzes', today);
        const quizDoc = await getDoc(quizDocRef);

        let quizQuestions: Question[];

        if (quizDoc.exists()) {
          // Quiz for today already exists, fetch it
          quizQuestions = quizDoc.data().questions;
        } else {
          // No quiz for today, generate and save it
          quizQuestions = await generateQuiz({
            category: 'General Knowledge for students in India',
            studentClass: profile.class,
            count: 25,
            language: 'English'
          });
          await setDoc(quizDocRef, {
            questions: quizQuestions,
            createdAt: serverTimestamp(),
          });
        }

        setQuestions(quizQuestions);
        setSelectedAnswers(Array(quizQuestions.length).fill(null));
      } catch (err) {
        console.error(err);
        setError('Failed to load the daily quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchOrGenerateQuiz();
  }, [db]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        calculatedScore += 4; // 4 points per correct answer
      }
    });
    setScore(calculatedScore);

    const user = auth.currentUser;
    if (!user) {
        setError("You are not logged in. Cannot save score.");
        setIsSubmitting(false);
        return;
    }

    try {
        const today = new Date().toISOString().split('T')[0];
        const submissionDocRef = doc(collection(db, 'quizSubmissions'));
        
        await setDoc(submissionDocRef, {
            userId: user.uid,
            quizDate: today,
            answers: selectedAnswers,
            score: calculatedScore,
            submittedAt: serverTimestamp()
        });
        
        setIsSubmitted(true);
        toast({
            title: "Quiz Submitted!",
            description: `Your score is ${calculatedScore}.`,
        });

    } catch(err) {
        console.error("Failed to save score:", err);
        setError("There was an error submitting your score. Please try again.");
        toast({
            title: "Submission Failed",
            description: "Could not save your score. Please check your connection and try again.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <StudentHeader profile={userProfile} score={score} />
        
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
                      <QuestionRow 
                        key={q.id || i} 
                        question={q} 
                        index={i}
                        onAnswerChange={handleAnswerChange}
                        selectedAnswer={selectedAnswers[i]}
                        isSubmitted={isSubmitted}
                      />
                    ))}
                </div>
                <SubmitSection 
                  onSubmit={handleSubmit}
                  isSubmitted={isSubmitted}
                  isSubmitting={isSubmitting}
                  score={score}
                />
            </>
        )}

        <PrivilegesBanner />
      </div>
    </div>
  );
}
