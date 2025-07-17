"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Skeleton } from '@/components/common/Skeleton';
import { apiRequest } from '@/services/api.service';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiRequest({
        endpoint: '/auth/login',
        method: 'POST',
        data: formData,
      });

      // Assuming the API returns a token
      if (response.token) {
        document.cookie = `token=${response.token}; path=/; secure; samesite=strict`;
        document.cookie = `role=${response.role}; path=/; secure; samesite=strict`;
        if (response.role === "siswa") {
          router.push('/siswa');
        }else{
          router.push('/dashboard/kepsek');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header with theme toggle */}

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <div className="flex justify-center items-center">
          <div className='mb-10'>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              {isLoading ? (
                <Skeleton className="h-10 w-full mt-1" />
              ) : (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              {isLoading ? (
                <Skeleton className="h-10 w-full mt-1" />
              ) : (
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              {isLoading ? (
                <div className="w-full">
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !formData.email || !formData.password}
                >
                  Sign in
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}