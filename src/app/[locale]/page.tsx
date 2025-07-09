import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import {
  BookOpen,
  Clapperboard,
  FlaskConical,
  Globe,
  HeartPulse,
  Newspaper,
  Scroll,
  Star,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { Category, Suggestion } from '@/lib/types';

// Mock Data - In a real app, this would come from Firestore
const categories: Category[] = [
  { id: '1', nameEn: 'Health Topics', nameTe: 'ఆరోగ్య అంశాలు', icon: 'HeartPulse' },
  { id: '2', nameEn: 'Science & Tech', nameTe: 'సైన్స్ & టెక్', icon: 'FlaskConical' },
  { id: '3', nameEn: 'Sports & Games', nameTe: 'క్రీడలు & ఆటలు', icon: 'Clapperboard' },
  { id: '4', nameEn: 'GK & Current', nameTe: 'GK & కరెంట్', icon: 'Newspaper' },
  { id: '5', nameEn: 'History', nameTe: 'చరిత్ర', icon: 'Scroll' },
  { id: '6', nameEn: 'Geography', nameTe: 'భూగోళశాస్త్రం', icon: 'Globe' },
];

const suggestions: Suggestion[] = [
    { id: '1', text: 'Consider adding more questions about local Telangana history.'},
    { id: '2', text: 'The live stream was very helpful for understanding the new scholarship.'},
    { id: '3', text: 'Can we have a separate quiz for junior and senior classes?'},
    { id: '4', text: 'The mobile view of the quiz page is excellent.'},
    { id: '5', text: 'More events notifications would be great.'},
];

const searchChips = [
    "Private schools (Play)",
    "Electronic gadgets",
    "Scholarships",
    "Events",
    "GK & Current Affairs",
    "Science & Technology",
    "Health Topics",
    "Medals",
    "Competitive Exams",
    "Civics"
]

const iconMap: { [key: string]: React.ElementType } = {
  HeartPulse,
  FlaskConical,
  Clapperboard,
  Newspaper,
  Scroll,
  Globe,
  BookOpen,
};

function DateChip() {
  return (
    <div className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-full text-sm">
      {format(new Date(), 'dd MMM yyyy')}
    </div>
  );
}

function CategoryTile({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] || BookOpen;
  return (
    <Card className="hover:bg-secondary transition-colors cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
        <Icon className="h-8 w-8 text-primary" />
        <span className="text-center font-medium text-sm">{category.nameEn}</span>
        <span className="text-center text-xs text-muted-foreground">{category.nameTe}</span>
      </CardContent>
    </Card>
  );
}

function LiveStreamCard() {
    const t = useTranslations('Dashboard');
    // In a real app, 'live_youtube_id' would be fetched from Firebase Remote Config
    const liveYoutubeId = "jfKfPfyJRdk"; // Example ID

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 row-span-2">
            <CardHeader>
                <CardTitle>{t('live_streaming')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                        className="w-full h-full rounded-md"
                        src={`https://www.youtube.com/embed/${liveYoutubeId}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col items-center w-24 bg-card border-r py-4 sticky top-0 h-screen">
        <nav className="flex flex-col items-center gap-4 mt-8">
            {[t('scholarships'), t('events'), t('quiz_winners'), t('enquiry')].map((item, index) => (
                 <a key={index} href="#" className="flex flex-col items-center gap-1 text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                     <Star className="h-6 w-6"/>
                     <span>{item}</span>
                 </a>
            ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <DateChip />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-3">
                {categories.map(cat => (
                    <CategoryTile key={cat.id} category={cat} />
                ))}
            </div>
            
            <LiveStreamCard />

            <Card className="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-3">
              <CardHeader>
                <CardTitle>{t('valuable_suggestions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                    <div className="space-y-4">
                        {suggestions.map(sug => (
                            <p key={sug.id} className="text-sm border-b pb-2">{sug.text}</p>
                        ))}
                    </div>
                </ScrollArea>
              </CardContent>
            </Card>

          </div>
        </main>

        {/* Bottom Search Ribbon */}
        <footer className="sticky bottom-0 bg-card border-t p-2">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                    {searchChips.map((chip, i) => (
                        <Button key={i} variant="outline" size="sm" className="rounded-full">
                            {chip}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </footer>
      </div>
    </div>
  );
}
