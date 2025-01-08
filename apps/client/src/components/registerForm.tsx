import { zodResolver } from '@hookform/resolvers/zod';
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

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().max(32),
    confirmPassword: z.string().max(32),
    username: z.string().max(32),
    birthDate: z
      .string({ errorMap: () => ({ message: 'Birth Date is required' }) })
      .min(1),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: 'Passwords do not match',
        code: 'custom',
        path: ['confirmPassword'],
      });
    }
  });

export default function RegisterForm({
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
      confirmPassword: '',
      username: '',
      birthDate: '',
    },
  });

  const onSubmit = async (values: Partial<z.infer<typeof formSchema>>) => {
    setIsLoading(true);
    console.log(values);
    // delete values.confirmPassword;
    // const response = await postRequest<PostPublicRegisterResponseBody>({
    //   endpoint: '/public/register',
    //   payload: values,
    // });

    // const errorMessage = 'Something went wrong';
    // if (isErrorMessage(response.data)) {
    //   errorMessage = response.data.message;
    // }
    // if (response.status === 422) {
    //   form.setError('email', {
    //     type: 'manual',
    //     message: errorMessage,
    //   });
    // } else if (response.status === 201) {
    //   window.localStorage.setItem('user', JSON.stringify(response.data));
    //   window.location.href = '/';
    // }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">
            Create a <span className="text-accent-foreground">Matcha</span>{' '}
            account in a few seconds
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-left">
              <div className="space-y-2">
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-8"
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?&#32;
            <Link
              to="#"
              className="underline"
              onClick={() => setFormType('login')}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
