"use client";

import { useRouter } from 'next/navigation';
import AuthPage from '@/components/AuthPage';
import { useAuth } from '@/lib/auth';
import { getTimeAgo } from '@/lib/utils';

export default function AuthPageRoute() {
  const router = useRouter();
  const { updateUser } = useAuth();

  const handleAuth = (userData: any) => {
    // Generate dynamic timestamps instead of hardcoded values
    const enhancedUserData = {
      ...userData,
      dateJoined: userData.dateJoined || new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      }),
      lastLogin: getTimeAgo(new Date()) // "Just now" for new login
    };
    
    updateUser(enhancedUserData);
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