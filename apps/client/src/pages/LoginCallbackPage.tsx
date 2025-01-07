import { useSearchParams } from 'react-router-dom';

export default function LoginCallbackPage() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  
  if (token) {
    window.localStorage.setItem('token', token);
    window.opener.location.href = '/';
    window.close();
  }
  return null;
}
