import { dailyQuestions } from "@/lib/data";
import { QuizClient } from "@/components/quiz-client";

export default function QuizPage() {
  // In a real app, you would fetch the daily questions for the current date.
  const questions = dailyQuestions;

  return <QuizClient questions={questions} />;
}
