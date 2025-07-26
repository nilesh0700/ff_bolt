"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccountConnection from '@/components/AccountConnection';

export default function ConnectPage() {
  const router = useRouter();
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleAccountConnect = (account: string) => {
    setConnectedAccounts(prev => [...prev, account]);
  };

  const handleAccountDisconnect = (account: string) => {
    setConnectedAccounts(prev => prev.filter(acc => acc !== account));
  };

  const handleContinue = () => {
    // Store connected accounts
    localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
    router.push('/onboarding');
  };

  if (!user) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <AccountConnection
      connectedAccounts={connectedAccounts}
      onAccountConnect={handleAccountConnect}
      onAccountDisconnect={handleAccountDisconnect}
      onContinue={handleContinue}
    />
  );
}