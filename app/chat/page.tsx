"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  useEffect(() => {
    // Check authentication and data
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('userProfile');
    const accountsData = localStorage.getItem('connectedAccounts');

    if (!userData) {
      router.push('/auth');
      return;
    }

    if (!accountsData || JSON.parse(accountsData).length === 0) {
      router.push('/connect');
      return;
    }

    if (!profileData) {
      router.push('/onboarding');
      return;
    }

    setUser(JSON.parse(userData));
    setUserProfile(JSON.parse(profileData));
    setConnectedAccounts(JSON.parse(accountsData));
  }, [router]);

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'scenarios':
        router.push('/scenarios');
        break;
      case 'actions':
        router.push('/actions');
        break;
      case 'progress':
        router.push('/progress');
        break;
      case 'landing':
        router.push('/');
        break;
      default:
        break;
    }
  };

  if (!user || !userProfile) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <ChatInterface
      user={user}
      userProfile={userProfile}
      connectedAccounts={connectedAccounts}
      onNavigate={handleNavigate}
    />
  );
}