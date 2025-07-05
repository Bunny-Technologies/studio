"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import type { Question } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Timer } from "lucide-react";
import { CategoryIcon } from "./category-icon";
import { Label } from "./ui/label";

interface QuizClientProps {
  questions: Question[];
}

const QUESTION_TIME_LIMIT_SEC = 45 * 25; // 45 seconds per question
const PASS_SCORE_PERCENT = 60;

export function QuizClient({ questions }: QuizClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = React.useState(false);
  const [finalScore, setFinalScore] = React.useState(0);

  const [timeLeft, setTimeLeft] = React.useState(QUESTION_TIME_LIMIT_SEC);
  const timerIntervalRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (isFinished) {
      clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, [isFinished]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (isFinished) return;

    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        score += q.points;
      }
    });
    setFinalScore(score);
    setIsFinished(true);
  };

  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl mx-auto">
      <Card className="mb-4">
        <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Timer className="h-6 w-6 text-primary" />
            <span className="font-mono" suppressHydrationWarning>
              {String(timerMinutes).padStart(2, "0")}:
              {String(timerSeconds).padStart(2, "0")}
            </span>
          </div>
          <div className="w-full md:w-1/2">
            <Progress value={((current + 1) / questions.length) * 100} />
            <p className="text-center text-sm mt-1 text-muted-foreground">
              Question {current + 1} of {questions.length}
            </p>
          </div>
        </CardContent>
      </Card>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {questions.map((question, index) => (
            <CarouselItem key={question.id}>
              <div className="p-1">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                           <CategoryIcon category={question.category} className="h-4 w-4 mr-1.5" />
                           {question.category}
                        </Badge>
                        <CardTitle className="font-headline text-2xl leading-tight">
                          {question.text}
                        </CardTitle>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {question.points} pts
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={String(answers[question.id])}
                      onValueChange={(value) => handleSelectOption(question.id, Number(value))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {question.options.map((option, i) => (
                        <div key={i}>
                          <RadioGroupItem
                            value={String(i)}
                            id={`${question.id}-${i}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`${question.id}-${i}`}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div className="flex justify-center mt-6">
        {current === questions.length - 1 ? (
          <Button size="lg" className="font-bold" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Use arrows to navigate.
          </p>
        )}
      </div>

      <AlertDialog open={isFinished}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-3xl text-center">
              Quiz Completed!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You scored
              <span
                className={cn(
                  "font-bold text-4xl block my-4",
                  finalScore >= (100 * PASS_SCORE_PERCENT) / 100
                    ? "text-green-500"
                    : "text-destructive"
                )}
              >
                {finalScore} / 100
              </span>
              {finalScore >= (100 * PASS_SCORE_PERCENT) / 100
                ? "Great job! You've shown strong awareness."
                : "Keep learning and try again tomorrow!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="w-full"
              onClick={() => router.push("/leaderboard")}
            >
              View Leaderboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
