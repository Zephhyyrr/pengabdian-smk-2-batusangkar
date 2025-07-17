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

  var token = localStorage.getItem('token');

  if (!token){
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtYSI6IlN1cGVyIEFkbWliIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc1Mjc1MTk2MSwiZXhwIjoxNzU1MzQzOTYxfQ.jH8ayxxhtyqLPS7BfkXDR1YzQxnJsv6Ub2VZhVAQH6k';
    // console.log('No token found in localStorage');
  }

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

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
      error.response?.data?.message || error.message || 'Failed to fetch'
    );
  }
};
