"use client";

import { useRouter } from 'next/navigation';
import ScenarioDashboard from '@/components/ScenarioDashboard';
import { useAuthGuard } from '@/lib/auth';

export default function ScenariosPage() {
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

  if (auth.isLoading || !auth.userProfile) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <ScenarioDashboard
      userProfile={auth.userProfile}
      onNavigate={handleNavigate}
    />
  );
}