import LoginForm from '#src/components/loginForm';
import RegisterForm from '#src/components/registerForm';
import { useState } from 'react';

export default function LoginPage() {
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {formType === 'login' ? (
        <LoginForm setFormType={setFormType} />
      ) : (
        <RegisterForm setFormType={setFormType} />
      )}
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          height="100%"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
