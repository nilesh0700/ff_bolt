"use client";

import { useRouter } from 'next/navigation';
import ActionCenter from '@/components/ActionCenter';
import { useAuthGuard } from '@/lib/auth';

export default function ActionsPage() {
  const router = useRouter();
  const auth = useAuthGuard({ 
    requireAuth: true, 
    requireProfile: true 
  });

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'chat':
        router.push('/chat');
        break;
      case 'scenarios':
        router.push('/scenarios');
        break;
      case 'progress':
        router.push('/progress');
        break;
      default:
        break;
    }
  };

  if (auth.isLoading || !auth.userProfile) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <ActionCenter
      userProfile={auth.userProfile}
      onNavigate={handleNavigate}
    />
  );
}