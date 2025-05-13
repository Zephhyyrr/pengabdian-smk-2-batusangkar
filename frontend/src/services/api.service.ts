export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  data?: any,
  token?: string
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const options: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  const res = await fetch(endpoint, options);

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.json();
};
