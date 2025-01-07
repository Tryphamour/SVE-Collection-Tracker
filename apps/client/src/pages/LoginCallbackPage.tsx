import { useSearchParams } from 'react-router-dom';

export default function LoginCallbackPage() {
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get('token');
  const refreshToken = searchParams.get('refreshToken');
  
  if (accessToken && refreshToken) {
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);
    window.opener.location.href = '/';
    window.close();
  }
  return null;
}
