"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Sparkles, Target, TrendingUp, Shield, Home, GraduationCap, Briefcase, Plane, Heart } from 'lucide-react';
import Avatar from '@/components/Avatar';

interface AvatarSetupProps {
  userProfile: {
    age: number;
    income: number;
    riskTolerance: 'low' | 'medium' | 'high';
    lifeGoal: string;
  };
  onProfileUpdate: (updates: any) => void;
  onBack: () => void;
}

export default function AvatarSetup({ userProfile, onProfileUpdate, onBack }: AvatarSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      title: "What's your current age?",
      description: "This helps us create realistic financial projections for your future",
      icon: Target,
      component: (
        <div className="space-y-6">
          <Label htmlFor="age" className="text-lg font-semibold text-slate-700">Current age</Label>
          <div className="relative">
            <Input
              id="age"
              type="number"
              value={userProfile.age}
              onChange={(e) => onProfileUpdate({ age: parseInt(e.target.value) || 25 })}
              className="h-16 text-2xl text-center rounded-2xl border-2 border-slate-200 focus:border-indigo-500 bg-gradient-to-r from-white to-slate-50"
              min="18"
              max="80"
              placeholder="25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-center text-slate-600">
            <span className="text-sm">Age range: 18-80 years</span>
          </div>
        </div>
      )
    },
    {
      title: "What's your annual income?",
      description: "We'll use this to create personalized investment recommendations",
      icon: TrendingUp,
      component: (
        <div className="space-y-8">
          <Label className="text-lg font-semibold text-slate-700">Annual income (₹)</Label>
          <div className="px-6">
            <Slider
              value={[userProfile.income]}
              onValueChange={(value) => onProfileUpdate({ income: value[0] })}
              max={2000000}
              min={100000}
              step={50000}
              className="w-full h-3"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>₹1L</span>
              <span>₹20L</span>
            </div>
          </div>
          <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
            <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ₹{userProfile.income.toLocaleString('en-IN')}
            </span>
            <p className="text-slate-600 mt-2">per year</p>
          </div>
        </div>
      )
    },
    {
      title: "What's your investment style?",
      description: "This determines your risk tolerance and investment strategy",
      icon: Shield,
      component: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {[
              { 
                value: 'low', 
                label: 'Conservative', 
                desc: 'Prefer stable, low-risk investments with steady returns',
                color: 'from-green-500 to-emerald-600',
                bgColor: 'from-green-50 to-emerald-50'
              },
              { 
                value: 'medium', 
                label: 'Balanced', 
                desc: 'Mix of growth and stability with moderate risk',
                color: 'from-blue-500 to-indigo-600',
                bgColor: 'from-blue-50 to-indigo-50'
              },
              { 
                value: 'high', 
                label: 'Aggressive', 
                desc: 'High-growth investments with higher risk tolerance',
                color: 'from-red-500 to-pink-600',
                bgColor: 'from-red-50 to-pink-50'
              }
            ].map((option) => (
              <Button
                key={option.value}
                variant={userProfile.riskTolerance === option.value ? "default" : "outline"}
                onClick={() => onProfileUpdate({ riskTolerance: option.value })}
                className={`h-auto p-6 text-left justify-start rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  userProfile.riskTolerance === option.value 
                    ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg` 
                    : `bg-gradient-to-r ${option.bgColor} hover:shadow-lg border-slate-200 hover:border-slate-300`
                }`}
              >
                <div className="w-full">
                  <div className="font-bold text-lg mb-2">{option.label}</div>
                  <div className={`text-sm opacity-90 leading-relaxed ${
                    userProfile.riskTolerance === option.value ? 'text-white' : 'text-slate-600'
                  }`}>
                    {option.desc}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "What's your primary life goal?",
      description: "Let's align your investments with what matters most to you",
      icon: Heart,
      component: (
        <div className="space-y-6">
          <Select value={userProfile.lifeGoal} onValueChange={(value) => onProfileUpdate({ lifeGoal: value })}>
            <SelectTrigger className="h-16 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 bg-gradient-to-r from-white to-slate-50">
              <SelectValue placeholder="Select your primary financial goal" className="text-lg" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="retirement" className="p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span>Comfortable Retirement</span>
                </div>
              </SelectItem>
              <SelectItem value="house" className="p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Home className="w-4 h-4 text-white" />
                  </div>
                  <span>Buy a Dream Home</span>
                </div>
              </SelectItem>
              <SelectItem value="education" className="p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <span>Children's Education</span>
                </div>
              </SelectItem>
              <SelectItem value="business" className="p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <span>Start a Business</span>
                </div>
              </SelectItem>
              <SelectItem value="travel" className="p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <span>Travel the World</span>
                </div>
              </SelectItem>
              <SelectItem value="emergency" className="p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span>Build Emergency Fund</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 flex items-center justify-center">
        <div className="max-w-5xl mx-auto">
          <Card className="glass-effect-dark border-0 rounded-3xl overflow-hidden backdrop-blur-xl">
            <CardContent className="p-12 text-center text-white">
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                <Avatar
                  age={userProfile.age + 35}
                  income={userProfile.income}
                  riskTolerance={userProfile.riskTolerance}
                  size="large"
                />
              </div>
              <div className="mb-6">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-bounce" />
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Meet Your Future Self! 🎉
              </h1>
              <p className="text-xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Based on your profile, here's a glimpse of your financial future at age {userProfile.age + 35}. 
                These projections are tailored to your risk tolerance and life goals.
              </p>
              <div className="grid gap-6 md:grid-cols-3 mb-10">
                <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-3xl p-8 border border-emerald-400/30">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">₹24L</div>
                  <div className="text-emerald-200 text-lg">Emergency Fund</div>
                  <div className="text-emerald-300 text-sm mt-2">6 months expenses covered</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-400/30">
                  <div className="text-4xl font-bold text-blue-400 mb-2">₹2.5Cr</div>
                  <div className="text-blue-200 text-lg">Investment Portfolio</div>
                  <div className="text-blue-300 text-sm mt-2">Diversified across assets</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30">
                  <div className="text-4xl font-bold text-purple-400 mb-2">₹45K</div>
                  <div className="text-purple-200 text-lg">Monthly Passive Income</div>
                  <div className="text-purple-300 text-sm mt-2">From investments & dividends</div>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-black font-bold h-16 px-12 rounded-3xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Start Your Financial Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-8">
          {/* Avatar Section */}
          <div className="order-2 lg:order-1">
            <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-0 rounded-3xl overflow-hidden shadow-2xl">
              <CardContent className="p-10 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-purple-100">
                    Your Future Self Preview
                  </h2>
                  <p className="text-purple-200">
                    Watch your avatar evolve as you progress!
                  </p>
                </div>
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" />
                  <Avatar
                    age={userProfile.age + Math.min(currentStep * 8, 35)}
                    income={userProfile.income}
                    riskTolerance={userProfile.riskTolerance}
                    size="large"
                  />
                </div>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-white">
                    Age {userProfile.age + Math.min(currentStep * 8, 35)}
                  </div>
                  <div className="text-purple-200">
                    {currentStep === 0 && "Starting your journey..."}
                    {currentStep === 1 && "Building wealth..."}
                    {currentStep === 2 && "Growing investments..."}
                    {currentStep === 3 && "Achieving your goals!"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2">
            <Card className="glass-effect shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="pb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-slate-500 font-medium">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index <= currentStep 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg' 
                            : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-slate-800">
                      {currentStepData.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  {currentStepData.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <div className="min-h-[300px] flex items-center">
                  {currentStepData.component}
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="h-14 px-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {currentStep === 0 ? 'Back to Accounts' : 'Previous'}
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    className="h-14 px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Meet Your Future Self!
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}