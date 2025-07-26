"use client";

import { useRouter } from 'next/navigation';
import AuthPage from '@/components/AuthPage';
import { useAuth } from '@/lib/auth';

export default function AuthPageRoute() {
  const router = useRouter();
  const { updateUser } = useAuth();

  const handleAuth = (userData: any) => {
    updateUser({
      ...userData,
      dateJoined: 'January 2024',
      lastLogin: '2 hours ago'
    });
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