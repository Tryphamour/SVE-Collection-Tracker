import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LoginCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  
  if (token) {
    window.localStorage.setItem('token', token);
    navigate('/');
  }
  return null;
}
