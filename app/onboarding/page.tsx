"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingPage from '@/components/OnboardingPage';
import { useAuthGuard } from '@/lib/auth';

export default function OnboardingPageRoute() {
  const router = useRouter();
  const auth = useAuthGuard({ 
    requireAuth: true, 
    requireAccounts: true 
  });
  
  const [userProfile, setUserProfile] = useState(auth.userProfile || {
    age: 28,
    futureAge: 45,
    personality: 'balanced',
    goals: ['retirement', 'house'],
    avatar: 'default'
  });

  const handleProfileUpdate = (updates: any) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const handleComplete = (profile: any) => {
    auth.updateProfile(profile);
    router.push('/chat');
  };

  const handleBack = () => {
    router.push('/connect');
  };

  if (auth.isLoading || !auth.user) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <OnboardingPage
      userProfile={userProfile}
      onProfileUpdate={handleProfileUpdate}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}