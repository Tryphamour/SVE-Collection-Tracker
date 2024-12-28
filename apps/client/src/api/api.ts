import { HttpRequest } from '#shared/classes/httpRequestClass';

const baseUrl = import.meta.env.VITE_BASE_APP_URL;

export interface RequestConfiguration {
  endpoint: string;
  payload?: Record<string, unknown>;
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

  return request.get<T>(endpoint);
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

  return request.post<T>(endpoint);
};
