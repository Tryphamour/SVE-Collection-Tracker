import { HttpRequest, HttpResponse } from '#shared/classes/httpRequestClass';
import { HttpHeaders, HttpStatusCodes } from '#shared/constants/httpConstants';

const baseUrl = import.meta.env.VITE_BASE_APP_URL;

export interface RequestConfiguration {
  endpoint: string;
  payload?: Record<string, unknown>;
}

const handleResponse = async <T>(responsePromise: Promise<HttpResponse<T>>) => {
  const response = await responsePromise;

  if (response.status === HttpStatusCodes.Unauthorized) {
    // Clear storage and redirect to login
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  return response;
};

const setHeaders = (request: HttpRequest) => {
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken) {
    request.setHttpHeader(HttpHeaders.Authorization, `Bearer ${accessToken}`);
  }
}

/**
 * @throws If the underlying fetch request returns a non-200 status code,
 * catch this error to display a user-friendly notification.
 */
export const getRequest = <T = Record<string, unknown>>(
  configuration: RequestConfiguration,
) => {
  const { endpoint, payload = {} } = configuration;

  const request = new HttpRequest()
    .setBaseUrl(`${baseUrl}/api`)
    .setPayload(payload);

  setHeaders(request);

  return handleResponse(request.get<T>(endpoint));
};

/**
 * @throws If the underlying fetch request returns a non-200 status code,
 * catch this error to display a user-friendly notification.
 */
export const postRequest = <T = Record<string, unknown>>(
  configuration: RequestConfiguration,
) => {
  const { endpoint, payload = {} } = configuration;
  const request = new HttpRequest()
    .setBaseUrl(`${baseUrl}/api`)
    .setPayload(payload);

  setHeaders(request);

  return handleResponse(request.post<T>(endpoint));
};
