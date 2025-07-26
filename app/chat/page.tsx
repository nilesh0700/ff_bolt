"use client";

import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';
import { useAuthGuard } from '@/lib/auth';

export default function ChatPage() {
  const router = useRouter();
  const auth = useAuthGuard({ 
    requireAuth: true, 
    requireAccounts: true, 
    requireProfile: true 
  });

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

  if (auth.isLoading || !auth.user || !auth.userProfile) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <ChatInterface
      user={auth.user}
      userProfile={auth.userProfile}
      connectedAccounts={auth.connectedAccounts}
      onNavigate={handleNavigate}
    />
  );
}