"use client";

import { useRouter } from 'next/navigation';
import AccountConnection from '@/components/AccountConnection';
import { useAuthGuard } from '@/lib/supabase-auth';

export default function ConnectPage() {
  const router = useRouter();
  const auth = useAuthGuard({ requireAuth: true });

  const handleContinue = () => {
    router.push('/onboarding');
  };

  const handleBack = () => {
    router.push('/auth');
  };

  if (auth.loading || !auth.user) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <AccountConnection
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}