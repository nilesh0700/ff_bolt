"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingPage from '@/components/OnboardingPage';

export default function OnboardingPageRoute() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    age: 28,
    futureAge: 45,
    personality: 'balanced',
    goals: ['retirement', 'house'],
    avatar: 'default'
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(userData));

    // Check if accounts are connected
    const connectedAccounts = localStorage.getItem('connectedAccounts');
    if (!connectedAccounts || JSON.parse(connectedAccounts).length === 0) {
      router.push('/connect');
      return;
    }
  }, [router]);

  const handleProfileUpdate = (updates: any) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const handleComplete = (profile: any) => {
    // Store user profile
    localStorage.setItem('userProfile', JSON.stringify(profile));
    router.push('/chat');
  };

  const handleBack = () => {
    router.push('/connect');
  };

  if (!user) {
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