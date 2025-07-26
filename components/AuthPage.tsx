"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Sparkles, Chrome, Zap, Shield, Users } from 'lucide-react';

interface AuthPageProps {
  onAuth: (userData: any) => void;
  onBack: () => void;
}

export default function AuthPage({ onAuth, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // Demo credentials
  const demoCredentials = {
    email: 'demo@futureself.ai',
    name: 'Demo User'
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    onAuth({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    });
    setIsLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) return;
    setIsLoading(true);
    // Simulate magic link
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMagicLinkSent(true);
    setIsLoading(false);
    
    // Auto-login after 3 seconds for demo
    setTimeout(() => {
      onAuth({
        id: '2',
        name: email === demoCredentials.email ? demoCredentials.name : 'User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      });
    }, 3000);
  };

  const handleDemoLogin = () => {
    onAuth({
      id: 'demo',
      name: demoCredentials.name,
      email: demoCredentials.email,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    });
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <Card className="glass-effect-dark border border-white/20 rounded-3xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email!</h2>
            <p className="text-purple-200 mb-6 leading-relaxed">
              We've sent a magic link to <strong>{email}</strong>. Click the link to sign in instantly.
            </p>
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-4 mb-6">
              <p className="text-blue-200 text-sm">
                <Zap className="w-4 h-4 inline mr-2" />
                Demo mode: Auto-signing you in...
              </p>
            </div>
            <Button 
              onClick={() => setMagicLinkSent(false)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 pt-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Future Self</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Benefits */}
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome to your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 leading-relaxed">
              Join thousands of users who are building wealth with AI-powered guidance from their future selves.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Bank-level Security</h3>
                  <p className="text-purple-200">Your data is encrypted and protected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Instant Setup</h3>
                  <p className="text-purple-200">Get started in under 2 minutes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">10,000+ Happy Users</h3>
                  <p className="text-purple-200">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div>
            <Card className="glass-effect-dark border border-white/20 rounded-3xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-purple-200 text-lg">
                  {isLogin ? 'Sign in to continue your financial journey' : 'Start building your financial future today'}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                {/* Demo Login Banner */}
                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-4 text-center">
                  <p className="text-yellow-200 text-sm mb-3">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Try the demo with these credentials:
                  </p>
                  <div className="bg-black/20 rounded-xl p-3 mb-3">
                    <p className="text-yellow-100 font-mono text-sm">
                      Email: {demoCredentials.email}
                    </p>
                  </div>
                  <Button 
                    onClick={handleDemoLogin}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold w-full rounded-2xl"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Demo Login
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-transparent px-4 text-purple-200">or continue with</span>
                  </div>
                </div>

                {/* Google Auth */}
                <Button 
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full h-14 bg-white hover:bg-gray-100 text-gray-900 border-0 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-3" />
                  ) : (
                    <Chrome className="w-5 h-5 mr-3" />
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-transparent px-4 text-purple-200">or use magic link</span>
                  </div>
                </div>

                {/* Magic Link */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white font-medium">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-purple-300 rounded-2xl mt-2 focus:border-yellow-400"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleMagicLink}
                    disabled={!email || isLoading}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    ) : (
                      <Mail className="w-5 h-5 mr-3" />
                    )}
                    Send Magic Link
                  </Button>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-200 hover:text-white transition-colors text-sm"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>

                <p className="text-xs text-purple-300 text-center leading-relaxed">
                  By continuing, you agree to our Terms of Service and Privacy Policy. 
                  Your financial data is encrypted and secure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}