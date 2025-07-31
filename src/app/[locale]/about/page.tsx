import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Goal, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About EduQuiz.world</CardTitle>
          <CardDescription>
            Nurturing curiosity and knowledge in students across Telangana and beyond.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            EduQuiz.world was founded on the principle that learning should be engaging, accessible, and rewarding. We are a passionate team of educators, technologists, and innovators dedicated to creating a dynamic platform that challenges students to expand their horizons. Our daily quizzes are carefully crafted to align with academic curricula while also incorporating real-world knowledge, current affairs, and critical thinking skills.
          </p>
          <p>
            We believe in the power of healthy competition to motivate students. Our platform not only tests knowledge but also celebrates participation and achievement through a transparent leaderboard and exciting rewards program.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader className="flex-row items-center gap-4">
                <Goal className="w-12 h-12 text-primary" />
                <div>
                    <CardTitle>Our Mission</CardTitle>
                    <CardDescription>To make learning a fun and integral part of every student's daily routine.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>Our mission is to provide a high-quality, engaging quiz platform that encourages students to continuously learn and challenge themselves. We aim to foster a community of curious minds and reward their dedication to knowledge.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex-row items-center gap-4">
                <Eye className="w-12 h-12 text-primary" />
                <div>
                    <CardTitle>Our Vision</CardTitle>
                    <CardDescription>To be the leading educational quiz platform in India.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>We envision a future where every student has the tools and motivation to explore their potential. We strive to be a trusted partner for schools, parents, and students in their educational journey, promoting both academic excellence and lifelong learning.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
