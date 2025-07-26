"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, Shield, Banknote, TrendingUp, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';

interface AccountConnectionProps {
  connectedAccounts: string[];
  onAccountConnect: (account: string) => void;
  onAccountDisconnect: (account: string) => void;
  onContinue: () => void;
}

export default function AccountConnection({
  connectedAccounts,
  onAccountConnect,
  onAccountDisconnect,
  onContinue
}: AccountConnectionProps) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (account: string) => {
    setConnecting(account);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    onAccountConnect(account);
    setConnecting(null);
  };

  const accounts = [
    {
      id: 'fi-money',
      name: 'Fi Money',
      description: 'Digital banking & smart savings',
      icon: Banknote,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      connected: connectedAccounts.includes('fi-money')
    },
    {
      id: 'zerodha',
      name: 'Zerodha',
      description: 'Investment & trading platform',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      connected: connectedAccounts.includes('zerodha')
    }
  ];

  const progress = (connectedAccounts.length / accounts.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Financial Future Self
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect your financial accounts to unlock personalized insights and build your future self
          </p>
        </div>

        {/* Main Card */}
        <Card className="glass-effect border-0 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
              Connect Your Accounts
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Securely link your financial accounts to personalize your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Account Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {accounts.map((account) => {
                const IconComponent = account.icon;
                const isConnecting = connecting === account.id;
                
                return (
                  <Card
                    key={account.id}
                    className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-2 card-hover ${
                      account.connected
                        ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-emerald-100'
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-indigo-100'
                    } rounded-2xl`}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <div className={`w-full h-full bg-gradient-to-br ${account.color} rounded-full transform translate-x-16 -translate-y-16`}></div>
                    </div>
                    
                    <CardContent className="p-8 text-center relative z-10">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${account.color} flex items-center justify-center shadow-lg transform transition-transform hover:scale-110`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-bold text-xl text-slate-800 mb-3">
                        {account.name}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {account.description}
                      </p>
                      
                      {account.connected ? (
                        <div className="flex items-center justify-center space-x-3 text-emerald-600 bg-emerald-100 py-3 px-6 rounded-2xl">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-semibold text-lg">Connected</span>
                          <Star className="w-5 h-5 fill-current" />
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleConnect(account.id)}
                          disabled={isConnecting}
                          className={`w-full h-12 bg-gradient-to-r ${account.color} hover:shadow-lg text-white border-0 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105`}
                        >
                          {isConnecting ? (
                            <div className="flex items-center space-x-3">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Connecting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span>Connect {account.name}</span>
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Progress Section */}
            <div className="space-y-6 bg-gradient-to-r from-slate-50 to-indigo-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between text-base">
                <span className="text-slate-700 font-medium">
                  {connectedAccounts.length} of {accounts.length} accounts connected
                </span>
                {connectedAccounts.length > 0 && (
                  <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Ready to continue</span>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Progress value={progress} className="h-3 bg-slate-200 rounded-full overflow-hidden" />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start space-x-4 text-slate-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <Shield className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Bank-level Security</h4>
                <p className="leading-relaxed">
                  Your data is encrypted and protected with industry-leading security. We never store your login credentials and only access the information needed to personalize your financial journey.
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              onClick={onContinue}
              disabled={connectedAccounts.length === 0}
              className="w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span>Continue to Avatar Setup</span>
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}