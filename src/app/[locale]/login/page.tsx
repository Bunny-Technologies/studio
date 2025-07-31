'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  school: z.string().min(3, { message: 'School must be at least 3 characters.' }),
  class: z.string().min(1, { message: 'Class is required.' }),
  idNo: z.string().min(1, {message: "ID No. is required."}),
});

function RewardsBanner() {
    return (
        <div className="w-full max-w-md bg-yellow-200 border-2 border-yellow-400 p-4 rounded-lg text-xs text-yellow-900 mb-6">
            <p>A). Daily Participants: 40% to 50% Gift Vouchers on Gadgets + Gifts for first 1000 rankers</p>
            <p>B) 30 days regular participants: Month end gifts and felicitation at near by College.</p>
            <p>C) 365 days participants: Top 100 nos. 1 lakh Study Scholarship with Privilege Merit Cards</p>
            <p className="text-center mt-1">Every month end an open debate will be conducted in your near by Jr.college for Event & Prizes** Relay in TV & social Media</p>
        </div>
    );
}

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('Login');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      school: '',
      class: '',
      idNo: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      // Create a simple user profile object
      const userProfile = {
        uid: `user_${new Date().getTime()}`, // Generate a simple unique ID
        ...values,
        pointsTotal: 0,
      };

      // Save the profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(userProfile));

      // Redirect to the quiz page
      router.push('/quiz/today');

    } catch (error) {
      console.error('Login Failed:', error);
      // Here you could use a toast to show an error message to the user
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <RewardsBanner />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('school')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your school" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('class')}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., '6th' or '10th'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="idNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('idNo')}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t('submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
