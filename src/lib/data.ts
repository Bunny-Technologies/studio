export type Question = {
  id: string;
  category: "Awareness" | "Physical-Health" | "Mentality" | "Productivity" | "Digital-Wellbeing";
  text: string;
  options: string[];
  correctIndex: number;
  points: number;
};

export const dailyQuestions: Question[] = [
  // Awareness
  {
    id: "Q001",
    category: "Awareness",
    text: "On average, how many times do people unlock their phones per day?",
    options: ["< 20 times", "20-50 times", "50-80 times", "> 80 times"],
    correctIndex: 3,
    points: 4,
  },
  {
    id: "Q002",
    category: "Awareness",
    text: "What is 'phubbing'?",
    options: ["A new type of phishing scam", "Ignoring someone in favor of your phone", "A phone charging technology", "A social media trend"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q003",
    category: "Awareness",
    text: "Which of these is a common symptom of digital eye strain?",
    options: ["Improved vision", "Dry eyes and headaches", "Better sleep", "Increased focus"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q004",
    category: "Awareness",
    text: "What does the term 'doomscrolling' refer to?",
    options: ["Playing a specific mobile game", "Scrolling through good news", "Obsessively reading negative news online", "A type of coding practice"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q005",
    category: "Awareness",
    text: "What is a 'digital footprint'?",
    options: ["A measurement of your screen size", "The trail of data you leave online", "A new fitness app", "A type of computer virus"],
    correctIndex: 1,
    points: 4,
  },
  // Physical-Health
  {
    id: "Q006",
    category: "Physical-Health",
    text: "What is 'tech neck'?",
    options: ["A brand of headphones", "A new smartphone model", "Pain from looking down at devices", "A type of charger"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q007",
    category: "Physical-Health",
    text: "The blue light from screens can interfere with the production of which hormone?",
    options: ["Adrenaline", "Insulin", "Testosterone", "Melatonin"],
    correctIndex: 3,
    points: 4,
  },
  {
    id: "Q008",
    category: "Physical-Health",
    text: "To reduce eye strain, what is the recommended 20-20-20 rule?",
    options: ["Every 20 mins, look 20 feet away for 20 secs", "Read 20 pages, take a 20 min break", "Type for 20 mins, stretch for 20 secs", "Use 20 apps for 20 mins each"],
    correctIndex: 0,
    points: 4,
  },
  {
    id: "Q009",
    category: "Physical-Health",
    text: "How can excessive headphone use affect your hearing?",
    options: ["It can improve it", "It has no effect", "It can lead to permanent damage", "It only affects balance"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q010",
    category: "Physical-Health",
    text: "Which of these is a good practice for better sleep hygiene?",
    options: ["Using your phone in bed until you fall asleep", "Watching TV in bed", "Avoiding screens for an hour before bed", "Drinking coffee before bed"],
    correctIndex: 2,
    points: 4,
  },
  // Mentality
  {
    id: "Q011",
    category: "Mentality",
    text: "Social media use has been linked to increased feelings of:",
    options: ["Calm and relaxation", "Contentment", "Anxiety and depression", "Detachment"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q012",
    category: "Mentality",
    text: "What is FOMO?",
    options: ["Fear of Missing Out", "Focus on My Objectives", "Forget about My Obstacles", "Fun on My Own"],
    correctIndex: 0,
    points: 4,
  },
  {
    id: "Q013",
    category: "Mentality",
    text: "What is a healthy way to deal with online negativity or cyberbullying?",
    options: ["Engaging in arguments", "Ignoring it completely", "Blocking, reporting, and talking to a trusted adult", "Posting your own negative comments"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q014",
    category: "Mentality",
    text: "The constant notifications from our devices can lead to:",
    options: ["A state of deep focus", "A state of continuous partial attention", "Improved multitasking skills", "Feeling more organized"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q015",
    category: "Mentality",
    text: "Mindfulness can be practiced by:",
    options: ["Checking your phone every two minutes", "Paying full attention to the present moment", "Thinking about the past and future", "Multitasking as much as possible"],
    correctIndex: 1,
    points: 4,
  },
  // Productivity
  {
    id: "Q016",
    category: "Productivity",
    text: "On average, how long does it take to refocus after a phone-based interruption?",
    options: ["1-2 minutes", "5-10 minutes", "15-25 minutes", "Over 30 minutes"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q017",
    category: "Productivity",
    text: "What is the 'Pomodoro Technique'?",
    options: ["A way to cook pasta", "A productivity method using timed work intervals", "A social media challenge", "A type of software"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q018",
    category: "Productivity",
    text: "Which of these is a strategy to reduce distractions from your phone while working?",
    options: ["Keep it on your desk, face up", "Turn on all notifications", "Put it in another room or on silent", "Check it every 5 minutes"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q019",
    category: "Productivity",
    text: "How can 'batching' notifications help with focus?",
    options: ["It makes notifications louder", "It delivers them all at once at set times", "It disables all notifications permanently", "It color-codes them"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q020",
    category: "Productivity",
    text: "The concept of 'deep work' refers to:",
    options: ["Working late at night", "Professional activities in a state of distraction-free concentration", "Collaborating with a large team", "Working on many tasks at once"],
    correctIndex: 1,
    points: 4,
  },
  // Digital-Wellbeing
  {
    id: "Q021",
    category: "Digital-Wellbeing",
    text: "A 'digital detox' involves:",
    options: ["Cleaning your devices", "Upgrading your software", "Taking a break from technology", "Organizing your files"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q022",
    category: "Digital-Wellbeing",
    text: "What is a benefit of curating your social media feeds?",
    options: ["You see more ads", "It can create a more positive and inspiring online environment", "It makes your feed load slower", "It automatically follows more people"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q023",
    category: "Digital-Wellbeing",
    text: "Which feature on most smartphones is designed to help you manage your screen time?",
    options: ["Airplane Mode", "Bluetooth", "Digital Wellbeing / Screen Time", "Calculator"],
    correctIndex: 2,
    points: 4,
  },
  {
    id: "Q024",
    category: "Digital-Wellbeing",
    text: "JOMO, an alternative to FOMO, stands for:",
    options: ["Journey of My Own", "Joy of Missing Out", "Joke on My Own", "Job of My Own"],
    correctIndex: 1,
    points: 4,
  },
  {
    id: "Q025",
    category: "Digital-Wellbeing",
    text: "What is a good first step to reduce phone addiction?",
    options: ["Throwing your phone away", "Turning off non-essential notifications", "Buying a new phone", "Downloading more apps"],
    correctIndex: 1,
    points: 4,
  },
];


export type LeaderboardEntry = {
  uid: string;
  rank: number;
  displayName: string;
  score: number;
  avatarUrl: string;
};

export const leaderboardEntries: LeaderboardEntry[] = [
  { uid: "abc123", rank: 1, displayName: "Ramarao", score: 96, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "def456", rank: 2, displayName: "Anitha", score: 92, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "ghi789", rank: 3, displayName: "Venkat", score: 92, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "jkl012", rank: 4, displayName: "Sravya", score: 88, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "mno345", rank: 5, displayName: "Prasad", score: 85, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "pqr678", rank: 6, displayName: "Lakshmi", score: 81, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "stu901", rank: 7, displayName: "Narender", score: 77, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "vwx234", rank: 8, displayName: "Bhavani", score: 75, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "yza567", rank: 9, displayName: "Rajesh", score: 70, avatarUrl: "https://placehold.co/40x40.png" },
  { uid: "bcd890", rank: 10, displayName: "Sultana", score: 66, avatarUrl: "https://placehold.co/40x40.png" },
];

export type Coupon = {
  id: string;
  title: string;
  sponsor: string;
  description: string;
  validUntil: string;
  link: string;
};

export const userCoupons: Coupon[] = [
  { id: "C10", title: "15% off on Traditional Wear", sponsor: "Kalamandir", description: "Get 15% off on your next purchase of traditional wear.", validUntil: "2025-12-31", link: "#" },
  { id: "C11", title: "Free Dessert with Biryani", sponsor: "Paradise Biryani", description: "Enjoy a free Double ka Meetha with any Biryani purchase. Show this coupon to redeem.", validUntil: "2025-10-31", link: "#" },
  { id: "C12", title: "20% off Books", sponsor: "Walden Books", description: "Expand your mind with 20% off any book in our store.", validUntil: "2025-11-30", link: "#" },
];
