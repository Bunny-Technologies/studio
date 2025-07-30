import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Handshake, Building, BookOpen } from 'lucide-react';
import Image from 'next/image';

const partners = [
    {
        name: "Telangana Model Schools",
        description: "Partnering to provide our quiz platform to all model schools, enhancing digital learning initiatives.",
        logo: "https://placehold.co/150x80.png",
        hint: "school building",
    },
    {
        name: "State Board of Education, TS",
        description: "Collaborating on curriculum-aligned content and promoting state-wide educational competitions.",
        logo: "https://placehold.co/150x80.png",
        hint: "government building",
    },
    {
        name: "Innovate Tech Solutions",
        description: "Our technology partner, ensuring a robust, scalable, and secure platform for all our users.",
        logo: "https://placehold.co/150x80.png",
        hint: "technology logo",
    },
    {
        name: "Vidya Publishing House",
        description: "Providing high-quality educational content and resources for our diverse range of quiz topics.",
        logo: "https://placehold.co/150x80.png",
        hint: "book logo",
    },
    {
        name: "Future Minds Foundation",
        description: "A non-profit organization helping us provide scholarships and rewards to deserving students.",
        logo: "https://placehold.co/150x80.png",
        hint: "charity logo",
    },
    {
        name: "Regional Science Centre",
        description: "Jointly organizing science and technology-focused events and quizzes to foster innovation.",
        logo: "https://placehold.co/150x80.png",
        hint: "science museum",
    }
]

export default function AssociatesPage() {
  return (
    <div className="p-4 md:p-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
              <Handshake className="w-8 h-8 text-primary" />
            <CardTitle>Our Associates & Partners</CardTitle>
          </div>
          <CardDescription>
            We are proud to collaborate with leading educational institutions and organizations to enrich the learning experience for students.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => (
            <Card key={partner.name} className="flex flex-col">
                <CardHeader className="items-center">
                    <div className="relative w-40 h-20 mb-4">
                        <Image 
                            src={partner.logo} 
                            alt={`${partner.name} logo`} 
                            layout="fill" 
                            objectFit="contain"
                            data-ai-hint={partner.hint} 
                        />
                    </div>
                    <CardTitle className="text-center">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground text-center">
                        {partner.description}
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}