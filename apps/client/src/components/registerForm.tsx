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
import {
  Select,
  SelectTrigger,
  SelectValue
} from './ui/select';

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().max(32),
    confirmPassword: z.string().max(32),
    firstName: z.string().max(32),
    lastName: z.string().max(32),
    username: z.string().max(32),
    birthDate: z
      .string({ errorMap: () => ({ message: 'Birth Date is required' }) })
      .min(1),
    gender: z
      .string({ errorMap: () => ({ message: 'Gender is required' }) })
      .min(1),
    orientation: z.string(),
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
      firstName: '',
      lastName: '',
      username: '',
      birthDate: '',
      gender: '',    },
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 text-left"
            >
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        {/* <SelectContent>
                          {Object.values(UserGender)
                            .filter((value) => typeof value === 'string')
                            .map((value) => (
                              <SelectItem key={value} value={value}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </SelectItem>
                            ))}
                        </SelectContent> */}
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />              
              <Button type="submit" className="w-full" disabled={isLoading}>
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
