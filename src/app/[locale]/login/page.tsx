'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { app } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  school: z.string().min(3, { message: 'School name is required.' }),
  class: z.string().min(1, { message: 'Class is required.' }),
  idNo: z.string().min(1, { message: 'ID Number is required.' }),
});

export default function LoginPage() {
  const t = useTranslations('Login');
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);
  const db = getFirestore(app);

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
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name: values.name,
          school: values.school,
          class: values.class,
          idNo: values.idNo,
          createdAt: serverTimestamp(),
          pointsTotal: 0,
        });
        
        // Store user info locally to use on the quiz page
        localStorage.setItem('userProfile', JSON.stringify({ uid: user.uid, ...values }));

        router.push('/quiz/today');
      }
    } catch (error) {
      console.error('Authentication or Firestore error:', error);
      toast({
        title: 'Login Failed',
        description: 'Could not sign you in. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : t('submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
