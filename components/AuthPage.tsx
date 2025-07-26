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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="border border-gray-200 rounded-2xl shadow-lg max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-[#00A175] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We've sent a magic link to <strong className="text-gray-900">{email}</strong>. Click the link to sign in instantly.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <p className="text-blue-700 text-sm flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2" />
                Demo mode: Auto-signing you in...
              </p>
            </div>
            <Button 
              onClick={() => setMagicLinkSent(false)}
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <Button 
              onClick={onBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#725BF4] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Future Self</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Benefits */}
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
                Welcome to your
                <span className="block text-[#725BF4] mt-2">
                  Financial Future
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Join thousands of users who are building wealth with AI-powered guidance from their future selves.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#00A175] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Bank-level Security</h3>
                    <p className="text-gray-600">Your data is encrypted and protected with industry-leading security</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#725BF4] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Instant Setup</h3>
                    <p className="text-gray-600">Get started in under 2 minutes with our streamlined process</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">10,000+ Happy Users</h3>
                    <p className="text-gray-600">Join our growing community of financially empowered individuals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth Form */}
            <div>
              <Card className="border border-gray-200 rounded-2xl shadow-lg">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Welcome Back!' : 'Create Account'}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    {isLogin ? 'Sign in to continue your financial journey' : 'Start building your financial future today'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                  {/* Demo Login Banner */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                    <p className="text-yellow-800 text-sm mb-4 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try the demo with these credentials:
                    </p>
                    <div className="bg-white border border-yellow-200 rounded-xl p-4 mb-4">
                      <p className="text-gray-700 font-mono text-sm">
                        Email: {demoCredentials.email}
                      </p>
                    </div>
                    <Button 
                      onClick={handleDemoLogin}
                      className="bg-[#725BF4] hover:bg-[#5d47d9] text-white font-semibold w-full rounded-xl transition-all duration-200"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Quick Demo Login
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500">or continue with</span>
                    </div>
                  </div>

                  {/* Google Auth */}
                  <Button 
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    className="w-full h-14 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md"
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
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500">or use magic link</span>
                    </div>
                  </div>

                  {/* Magic Link */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="h-12 border-2 border-gray-200 focus:border-[#725BF4] rounded-xl mt-2 transition-colors"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleMagicLink}
                      disabled={!email || isLoading}
                      className="w-full h-12 bg-[#00A175] hover:bg-[#008a64] text-white border-0 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
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
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-[#725BF4] hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-[#725BF4] hover:underline">Privacy Policy</a>.
                    Your financial data is encrypted and secure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#725BF4] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Future Self</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Future Self. Built with ❤️ for your financial future.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}