"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, MessageCircle, TrendingUp, Shield, ArrowRight, Play, Star, Users, Zap, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleJoinBeta = () => {
    router.push('/auth');
  };

  const handleTryDemo = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#725BF4] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Future Self
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Reviews</a>
              <Button 
                onClick={handleJoinBeta}
                className="bg-[#725BF4] hover:bg-[#5d47d9] text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200"
              >
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-3 mb-8 border border-gray-200">
              <Star className="w-5 h-5 text-[#00A175] mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ users</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
              Talk to your
              <span className="block text-[#725BF4] mt-2">
                Future Self
              </span>
              <span className="block text-4xl md:text-5xl text-gray-600 mt-4 font-normal">about Money</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              An AI-powered mirror to your financial future. Get personalized advice from the person who knows you best - your future self.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={handleJoinBeta}
                className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                Join Beta - Free
              </Button>
              <Button 
                onClick={handleTryDemo}
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-3" />
                Try Demo
              </Button>
            </div>
          </div>

          {/* Mock Chat Preview */}
          <div className="max-w-4xl mx-auto">
            <Card className="border border-gray-200 rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#725BF4] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">You</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-6 py-4 max-w-md">
                      <p className="text-gray-800">Should I buy that expensive car I've been wanting?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 justify-end">
                    <div className="bg-[#00A175] bg-opacity-10 border border-[#00A175] border-opacity-20 rounded-2xl px-6 py-4 max-w-md">
                      <p className="text-gray-800">Hey, it's me at 45! That car will cost you ₹12L in opportunity cost. Instead, invest that money and I'll have ₹45L extra for our dream house! 🏡</p>
                    </div>
                    <div className="w-12 h-12 bg-[#00A175] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">45</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 max-w-lg">
                      <p className="text-gray-800">Based on your Fi Money data, here are 3 better alternatives that align with your long-term goals...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Why Future Self Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining real financial data with AI to create the most personal financial advisor you'll ever have
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-[#00A175] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Real Data Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Connects to Fi Money & Zerodha for accurate, personalized financial projections based on your actual spending and investments.
              </p>
            </Card>
            
            <Card className="border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-[#725BF4] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">3-Way Conversations</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with your future self at different ages (35, 45, 60) and get AI-powered insights that feel personal and motivating.
              </p>
            </Card>
            
            <Card className="border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Actionable Scenarios</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize different life paths, compare financial outcomes, and get specific recommendations you can act on immediately.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              How it Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#725BF4] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Connect Your Accounts</h3>
                <p className="text-gray-600">
                  Securely link your Fi Money and Zerodha accounts to get personalized insights.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00A175] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Build Your Future Self</h3>
                <p className="text-gray-600">
                  Set your goals, risk tolerance, and create your AI-powered future persona.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Start Conversations</h3>
                <p className="text-gray-600">
                  Chat with your future self and get actionable financial advice tailored to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              What Users Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#725BF4] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">R</span>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-lg">Rahul, 29</h4>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Talking to my 45-year-old self made me realize I was spending too much on gadgets. Now I'm investing ₹15K more per month!"
              </p>
              <div className="flex text-[#00A175]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </Card>
            
            <Card className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#00A175] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-lg">Priya, 34</h4>
                  <p className="text-gray-600 text-sm">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "The scenarios feature showed me exactly how to afford my dream home. I'm on track to buy it 3 years earlier than planned!"
              </p>
              <div className="flex text-[#00A175]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#725BF4] mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#00A175] mb-2">₹50Cr+</div>
                <div className="text-gray-600 font-medium">Money Managed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-700 mb-2">95%</div>
                <div className="text-gray-600 font-medium">User Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#725BF4] mb-2">2 Min</div>
                <div className="text-gray-600 font-medium">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Meet Your Future Self?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of users who are already building their financial future with AI-powered guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleJoinBeta}
                className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Users className="w-5 h-5 mr-3" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#00A175]" />
                Free beta
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#00A175]" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#00A175]" />
                2-minute setup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
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