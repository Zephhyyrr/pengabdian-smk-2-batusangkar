import axios from 'axios';

export const apiRequest = async ({
  endpoint,
  method = 'GET',
  data,
}: {
  endpoint: string;
  method?: string;
  data?: any;
  token?: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

  var token = typeof window !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : undefined;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  // console.log(`Making API request to ${baseUrl}${endpoint} with method ${method}, token ${token}, and data:`, data);
  
  try {
    const res = await axios({
      url: `${baseUrl}${endpoint}`,
      method,
      headers,
      data,
    });

    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.response?.error || error.message || 'Failed to fetch'
    );
  }
};
