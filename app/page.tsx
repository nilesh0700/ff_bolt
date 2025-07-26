"use client";

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import AccountConnection from '@/components/AccountConnection';
import OnboardingPage from '@/components/OnboardingPage';
import ChatInterface from '@/components/ChatInterface';
import ScenarioDashboard from '@/components/ScenarioDashboard';
import ActionCenter from '@/components/ActionCenter';
import ProgressTracker from '@/components/ProgressTracker';

type AppState = 'landing' | 'auth' | 'connect' | 'onboarding' | 'chat' | 'scenarios' | 'actions' | 'progress';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('landing');
  const [user, setUser] = useState<any>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState({
    age: 28,
    futureAge: 45,
    personality: 'balanced',
    goals: ['retirement', 'house'],
    avatar: 'default'
  });

  const handleAuth = (userData: any) => {
    setUser(userData);
    setCurrentScreen('connect');
  };

  const handleAccountConnect = (account: string) => {
    setConnectedAccounts(prev => [...prev, account]);
  };

  const handleAccountDisconnect = (account: string) => {
    setConnectedAccounts(prev => prev.filter(acc => acc !== account));
  };

  const handleContinueToOnboarding = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile);
    setCurrentScreen('chat');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingPage 
            onJoinBeta={() => setCurrentScreen('auth')}
            onTryDemo={() => setCurrentScreen('auth')}
          />
        );
      case 'auth':
        return (
          <AuthPage 
            onAuth={handleAuth}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'connect':
        return (
          <AccountConnection
            connectedAccounts={connectedAccounts}
            onAccountConnect={handleAccountConnect}
            onAccountDisconnect={handleAccountDisconnect}
            onContinue={handleContinueToOnboarding}
          />
        );
      case 'onboarding':
        return (
          <OnboardingPage
            userProfile={userProfile}
            onProfileUpdate={(updates) => setUserProfile(prev => ({ ...prev, ...updates }))}
            onComplete={handleOnboardingComplete}
            onBack={() => setCurrentScreen('connect')}
          />
        );
      case 'chat':
        return (
          <ChatInterface
            user={user}
            userProfile={userProfile}
            connectedAccounts={connectedAccounts}
            onNavigate={setCurrentScreen}
          />
        );
      case 'scenarios':
        return (
          <ScenarioDashboard
            userProfile={userProfile}
            onNavigate={setCurrentScreen}
          />
        );
      case 'actions':
        return (
          <ActionCenter
            userProfile={userProfile}
            onNavigate={setCurrentScreen}
          />
        );
      case 'progress':
        return (
          <ProgressTracker
            userProfile={userProfile}
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return <LandingPage onJoinBeta={() => setCurrentScreen('auth')} onTryDemo={() => setCurrentScreen('auth')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}