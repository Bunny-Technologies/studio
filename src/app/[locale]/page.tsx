'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Data based on the image
const searchItems = [
    "Private schools (Play)",
    "Private schools (Day care)",
    "Private schools (Kinder Garden)",
    "Private schools (Primary)",
    "Private schools (Secondary)",
    "Tuition Centers",
    "Home Tutions (tutors)",
    "Online Tutors",
    "Child Psychologist",
    "Pediatric Doctors & Hospitals",
    "Book Publishers",
    "Book Stalls",
    "Electronic gadgets",
    "Teachers Training & Consultancy",
    "Non-Teaching Staff Consultancy"
];

const categories = [
    { name: "SPORTS & GAMES", color: "bg-sky-300" },
    { name: "TELUGU LANGUAGE", color: "bg-amber-300" },
    { name: "ENGLISH LANGUAGE", color: "bg-amber-300" },
    { name: "KIDS COMPUTER", color: "bg-orange-300" },
    { name: "HINDI LANGUAGE", color: "bg-amber-300" },
    { name: "MATHEMATICS SUBJECT", color: "bg-amber-300" },
    { name: "NEW INVENTIONS", color: "bg-indigo-300" },
    { name: "PHYSICAL SCIENCE", color: "bg-amber-300" },
    { name: "CHEMISTRY", color: "bg-amber-300" },
    { name: "GK current affairs", color: "bg-lime-400" },
    { name: "BIOLOGY", color: "bg-amber-300" },
    { name: "SOCIAL STUDIES", color: "bg-amber-300" },
    { name: "SCIENCE & TECHNOLOGY", color: "bg-cyan-400" },
    { name: "ROBOTICS", color: "bg-amber-300" },
    { name: "COMPUTER SCIENCE", color: "bg-amber-300" },
    { name: "HEALTH & EXERCISE", color: "bg-pink-400" },
];

const topNavLinks = ["ABOUT US", "ASSOCIATES", "PROGRAMS", "SCHOLARSHIPS", "EVENTS", "QUIZ WINNERS", "ENQUIRY"];

// Components recreated from the image
function LeftNav() {
    return (
        <aside className="w-64 bg-primary text-primary-foreground p-2 flex flex-col gap-2">
            <div className="text-center py-2 border-b-2 border-blue-300">
                <h2 className="text-xl font-bold">EDU QUIZ.WORLD</h2>
            </div>
            <div className="bg-yellow-400 text-black p-2 rounded-md text-xs font-semibold">
                Privileges and Rewards to Quiz Participants
            </div>
            <div className="bg-blue-800 text-white p-2 rounded-md text-center font-bold">
                SEARCH
            </div>
            <nav className="flex-1 flex flex-col gap-1">
                {searchItems.map((item, index) => (
                    <Button key={index} variant="secondary" className="justify-between h-8 text-xs">
                        {item}
                        <div className="border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-white"></div>
                    </Button>
                ))}
            </nav>
        </aside>
    );
}

function RightNav() {
    return (
        <aside className="w-8 bg-primary text-primary-foreground flex items-center justify-center">
            <h2 className="writing-vertical-rl rotate-180 font-bold tracking-wider">
                VALUABLE SUGGESTIONS
            </h2>
        </aside>
    );
}

function HeaderInfo() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <header className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-200 border-2 border-yellow-400 p-2 rounded-lg text-xs text-yellow-900">
                <p>A). Daily Participants: 40% to 50% Gift Vouchers on Gadgets + Gifts for first 1000 rankers</p>
                <p>B) 30 days regular participants: Month end gifts and felicitation at near by College.</p>
                <p>C) 365 days participants: Top 100 nos. 1 lakh Study Scholarship with Privilege Merit Cards</p>
                <p className="text-center mt-1">Every month end an open debate will be conducted in your near by Jr.college for Event & Prizes** Relay in TV & social Media</p>
            </div>
            <div className="bg-sky-200 border-2 border-sky-400 p-2 rounded-lg flex flex-col items-center justify-center text-sm font-semibold text-sky-900">
                <p>Today's: {time ? format(time, 'HH:mm:ss') : '00:00:00'}</p>
                <Link href="/login" className="bg-gray-600/75 text-white px-6 py-1 my-1 rounded-md shadow-md hover:bg-gray-700/75">
                    Quiz Login
                </Link>
                <p>Result</p>
                <div className="flex gap-2 mt-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
            </div>
        </header>
    );
}

function CategoryGrid() {
    return (
        <div className="grid grid-cols-3 gap-2">
            {categories.map((cat, index) => (
                <Button key={index} className={`${cat.color} text-black font-bold text-xs h-16 flex flex-col items-center justify-between shadow-md border-b-4 border-gray-500/50`}>
                    <div className="self-end border-t-[8px] border-b-[8px] border-r-[10px] border-transparent border-t-gray-600"></div>
                    <span className="text-center">{cat.name}</span>
                </Button>
            ))}
        </div>
    );
}

function LiveStream() {
    const liveYoutubeId = "jfKfPfyJRdk";
    return (
        <div className="mt-4 flex flex-col items-center">
            <div className="w-full max-w-lg bg-gray-700 p-2 rounded-t-lg border-b-8 border-gray-500">
                <div className="bg-black aspect-video rounded-md relative flex items-center justify-center">
                    {/* Placeholder for the live stream content */}
                     <iframe 
                        className="w-full h-full rounded-md"
                        src={`https://www.youtube.com/embed/${liveYoutubeId}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">Edu Quiz</div>
                    <div className="absolute bottom-4 text-center text-white">
                        <p className="text-sm">A theme for our</p>
                        <p className="font-bold">National Integrity and Moralism</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-400 w-32 h-4"></div>
            <div className="bg-gray-500 w-48 h-6 rounded-b-md"></div>
            <h3 className="text-red-600 font-bold text-lg tracking-widest mt-1">LIVE STREAMING</h3>
        </div>
    );
}

function MainContent() {
    return (
        <main className="flex-1 p-2 flex flex-col">
            <HeaderInfo />

            <div className="bg-primary text-primary-foreground p-1 rounded-md text-center text-xs font-bold flex justify-around my-2">
                {topNavLinks.map(link => <a href="#" key={link} className="hover:underline">{link}</a>)}
            </div>
            
            <p className="text-center font-semibold text-primary mb-2">Faculty Login form to enter the Quiz Bits & key:</p>
            
            <CategoryGrid />
            <LiveStream />
        </main>
    );
}

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <LeftNav />
            <div className="flex-1 flex flex-col">
                <MainContent />
                <footer className="w-full h-4 bg-gray-400 border-t-2 border-gray-500"></footer>
            </div>
            <RightNav />
        </div>
    );
}
