"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, Shield, Banknote, TrendingUp, Sparkles, Star, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ZerodhaLogo from '@/public/zerodha_logo.png';
import FiLogo from '@/public/fi_logo.jpg';

import { useToast } from '@/hooks/use-toast';

interface AccountConnectionProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function AccountConnection({
  onContinue,
  onBack
}: AccountConnectionProps) {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load saved connections when component mounts
  useEffect(() => {
    const loadSavedConnections = async () => {
      try {
        // First, try to load from localStorage
        const savedAccounts = localStorage.getItem('connectedAccounts');
        if (savedAccounts) {
          const accounts = JSON.parse(savedAccounts);
          setConnectedAccounts(accounts);
          console.log('Loaded connections from localStorage:', accounts);
        }

        // Optional: Try to sync with API, but don't overwrite local state if API fails
        try {
          const response = await fetch('/api/connected-accounts');
          if (response.ok) {
            const data = await response.json();
            const connected = data.accounts
              ?.filter((acc: any) => acc.is_connected)
              ?.map((acc: any) => acc.account_type) || [];
            
            // Only update if we got data from API and no local data exists
            if (connected.length > 0 && !savedAccounts) {
              setConnectedAccounts(connected);
              localStorage.setItem('connectedAccounts', JSON.stringify(connected));
              console.log('Loaded connections from API:', connected);
            }
          }
        } catch (apiError) {
          console.log('API not available, using localStorage only');
        }
      } catch (error) {
        console.log('No saved connections found, starting fresh');
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure auth context is ready
    const initDelay = setTimeout(() => {
      loadSavedConnections();
    }, 100);

    return () => clearTimeout(initDelay);
  }, []); // Remove user dependency to prevent infinite re-runs

  const handleConnect = async (accountType: string, accountName: string) => {
    setConnecting(accountType);
    
    try {
      // Simulate connection delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Connecting account:', { accountType, accountName });
      
      // Update local state immediately (simple demo solution)
      setConnectedAccounts(prev => {
        const updatedAccounts = [...prev, accountType];
        // Save to localStorage for persistence
        localStorage.setItem('connectedAccounts', JSON.stringify(updatedAccounts));
        return updatedAccounts;
      });

      // Optional: Try to sync with API, but don't fail if it doesn't work
      try {
        const response = await fetch('/api/connected-accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account_type: accountType,
            account_name: accountName
          }),
        });
        
        if (response.ok) {
          console.log('Successfully synced with API');
        } else {
          console.log('API sync failed, but continuing with local state');
        }
      } catch (apiError) {
        console.log('API not available, using local state only');
      }

      toast({
        title: "Account Connected!",
        description: `${accountName} has been successfully connected.`,
      });
    } catch (error: any) {
      console.error('Error connecting account:', error);
      toast({
        title: "Connection Failed", 
        description: error.message || "Failed to connect account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(null);
    }
  };

  const progress = (connectedAccounts.length / 2) * 100; // 2 accounts total

  const isConnected = (accountType: string) => {
    return connectedAccounts.includes(accountType);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#725BF4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          {/* <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-3 mb-8 border border-gray-200">
              <Star className="w-5 h-5 text-[#00A175] mr-2" />
              <span className="text-sm font-medium text-gray-700">Secure & Encrypted</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
              Connect Your
              <span className="block text-[#725BF4] mt-2">
                Accounts
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Securely link your financial accounts to unlock personalized insights and build your future self
            </p>
          </div> */}

          {/* Account Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Fi Money Card */}
            <Card
              className={`card-modern transition-all duration-300 hover:scale-105 ${
                isConnected('fi-money')
                  ? 'border-[#00A175] bg-gradient-to-br from-[#00A175]/5 to-[#008a64]/5'
                  : 'hover:shadow-xl'
              }`}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Image src={FiLogo} alt="Fi Money" width={60} height={60} className="object-contain rounded-xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Fi Money
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Digital banking & smart savings
                </p>
                
                {isConnected('fi-money') ? (
                  <div className="flex items-center justify-center space-x-3 text-[#00A175] bg-[#00A175]/10 py-4 px-6 rounded-2xl border border-[#00A175]/20">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Connected</span>
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                ) : (
                  <Button
                    onClick={() => handleConnect('fi-money', 'Fi Money')}
                    disabled={connecting === 'fi-money'}
                    className="w-full h-14 bg-gradient-to-r from-[#00A175] to-[#008a64] hover:shadow-lg text-white border-0 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  >
                    {connecting === 'fi-money' ? (
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Connect Fi Money</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Zerodha Card */}
            <Card
              className={`card-modern transition-all duration-300 hover:scale-105 ${
                isConnected('zerodha')
                  ? 'border-[#00A175] bg-gradient-to-br from-[#00A175]/5 to-[#008a64]/5'
                  : 'hover:shadow-xl'
              }`}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Image
                    src={ZerodhaLogo}
                    alt="Zerodha"
                    width={72}
                    height={56}
                    className="object-contain"
                    style={{ maxWidth: '72px', maxHeight: '56px' }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Zerodha
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Investment & trading platform
                </p>
                
                {isConnected('zerodha') ? (
                  <div className="flex items-center justify-center space-x-3 text-[#00A175] bg-[#00A175]/10 py-4 px-6 rounded-2xl border border-[#00A175]/20">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Connected</span>
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                ) : (
                  <Button
                    onClick={() => handleConnect('zerodha', 'Zerodha')}
                    disabled={connecting === 'zerodha'}
                    className="w-full h-14 bg-gradient-to-r from-[#725BF4] to-[#5d47d9] hover:shadow-lg text-white border-0 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  >
                    {connecting === 'zerodha' ? (
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Connect Zerodha</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Section */}
          <Card className="card-modern mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-700 font-medium">
                    {connectedAccounts.length} of 2 accounts connected
                  </span>
                  {connectedAccounts.length > 0 && (
                    <div className="flex items-center space-x-2 text-[#00A175] bg-[#00A175]/10 px-4 py-2 rounded-full border border-[#00A175]/20">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Ready to continue</span>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <Progress value={progress} className="h-4 bg-gray-200 rounded-full" />
                  <div 
                    className="absolute top-0 left-0 h-4 bg-gradient-to-r from-[#725BF4] to-[#5d47d9] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="card-modern mb-8">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 text-gray-600">
                <Shield className="w-8 h-8 text-[#00A175] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Bank-level Security</h4>
                  <p className="text-lg leading-relaxed">
                    Your data is encrypted and protected with industry-leading security. We never store your login credentials and only access the information needed to personalize your financial journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={onContinue}
              disabled={connectedAccounts.length === 0}
              className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold text-lg px-12 py-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}