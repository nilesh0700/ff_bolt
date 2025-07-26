"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScenarioDashboard from '@/components/ScenarioDashboard';

export default function ScenariosPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Check authentication and data
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('userProfile');

    if (!userData) {
      router.push('/auth');
      return;
    }

    if (!profileData) {
      router.push('/onboarding');
      return;
    }

    setUserProfile(JSON.parse(profileData));
  }, [router]);

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'chat':
        router.push('/chat');
        break;
      case 'actions':
        router.push('/actions');
        break;
      case 'progress':
        router.push('/progress');
        break;
      default:
        break;
    }
  };

  if (!userProfile) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <ScenarioDashboard
      userProfile={userProfile}
      onNavigate={handleNavigate}
    />
  );
}