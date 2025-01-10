import { getRequest } from '#src/api/api';

export default function LogoutPage() {
  getRequest({ endpoint: '/auth/logout' }).then(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  return null;
}
