"use client";

import AuthPage from '@/components/AuthPage';
import { useRouter } from 'next/navigation';

export default function AuthPageRoute() {
  const router = useRouter();

  const handleAuth = (userData: any) => {
    // Store user data in localStorage or context
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/connect');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <AuthPage 
      onAuth={handleAuth}
      onBack={handleBack}
    />
  );
}