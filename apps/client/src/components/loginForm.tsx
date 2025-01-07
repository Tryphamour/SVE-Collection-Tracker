import { zodResolver } from '@hookform/resolvers/zod';
// import { PostPublicLoginResponseBody } from '@packages/shared';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm({
  setFormType,
}: {
  setFormType: (type: 'login' | 'register') => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(values);
    // const response = await postRequest<PostPublicLoginResponseBody>({
    //   endpoint: '/public/login',
    //   payload: values,
    // });
    // if (response.status !== 200) {
    //   form.setError('email', {
    //     type: 'manual',
    //     message: 'Wrong email or password',
    //   });
    // } else {
    //   window.localStorage.setItem('user', JSON.stringify(response.data));
    //   window.location.href = '/';
    // }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                Login
              </Button>
            </form>
          </Form>
          {/* <Button variant="outline" className="w-full">
            <Google className='mr-2'/> Login with Google
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="#"
            className="underline"
            onClick={() => setFormType('register')}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
