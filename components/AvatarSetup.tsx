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
        <div className="space-y-8">
          <Label htmlFor="age" className="text-xl font-bold text-gray-900">Current age</Label>
          <div className="relative">
            <Input
              id="age"
              type="number"
              value={userProfile.age}
              onChange={(e) => onProfileUpdate({ age: parseInt(e.target.value) || 25 })}
              className="h-16 text-3xl text-center rounded-2xl border-2 border-gray-200 focus:border-[#725BF4] bg-white transition-colors"
              min="18"
              max="80"
              placeholder="25"
            />
          </div>
          <div className="text-center text-gray-600">
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
          <Label className="text-xl font-bold text-gray-900">Annual income (₹)</Label>
          <div className="px-6">
            <Slider
              value={[userProfile.income]}
              onValueChange={(value) => onProfileUpdate({ income: value[0] })}
              max={2000000}
              min={100000}
              step={50000}
              className="w-full h-3"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹1L</span>
              <span>₹20L</span>
            </div>
          </div>
          <div className="text-center bg-gradient-to-r from-[#725BF4]/10 to-[#00A175]/10 p-8 rounded-2xl border border-gray-200">
            <span className="text-5xl font-bold bg-gradient-to-r from-[#725BF4] to-[#00A175] bg-clip-text text-transparent">
              ₹{userProfile.income.toLocaleString('en-IN')}
            </span>
            <p className="text-gray-600 mt-2 text-lg">per year</p>
          </div>
        </div>
      )
    },
    {
      title: "What's your investment style?",
      description: "This determines your risk tolerance and investment strategy",
      icon: Shield,
      component: (
        <div className="space-y-6">
          <div className="grid gap-6">
            {[
              { 
                value: 'low', 
                label: 'Conservative', 
                desc: 'Prefer stable, low-risk investments with steady returns',
                color: 'from-[#00A175] to-[#008a64]',
                bgColor: 'from-[#00A175]/10 to-[#008a64]/10'
              },
              { 
                value: 'medium', 
                label: 'Balanced', 
                desc: 'Mix of growth and stability with moderate risk',
                color: 'from-[#725BF4] to-[#5d47d9]',
                bgColor: 'from-[#725BF4]/10 to-[#5d47d9]/10'
              },
              { 
                value: 'high', 
                label: 'Aggressive', 
                desc: 'High-growth investments with higher risk tolerance',
                color: 'from-gray-700 to-gray-800',
                bgColor: 'from-gray-100 to-gray-200'
              }
            ].map((option) => (
              <Button
                key={option.value}
                variant={userProfile.riskTolerance === option.value ? "default" : "outline"}
                onClick={() => onProfileUpdate({ riskTolerance: option.value })}
                className={`h-auto p-8 text-left justify-start rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  userProfile.riskTolerance === option.value 
                    ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg` 
                    : `bg-gradient-to-r ${option.bgColor} hover:shadow-lg border-gray-200 hover:border-gray-300`
                }`}
              >
                <div className="w-full">
                  <div className="font-bold text-xl mb-3">{option.label}</div>
                  <div className={`text-base opacity-90 leading-relaxed ${
                    userProfile.riskTolerance === option.value ? 'text-white' : 'text-gray-600'
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
        <div className="space-y-8">
          <Select value={userProfile.lifeGoal} onValueChange={(value) => onProfileUpdate({ lifeGoal: value })}>
            <SelectTrigger className="h-16 rounded-2xl border-2 border-gray-200 focus:border-[#725BF4] bg-white text-lg">
              <SelectValue placeholder="Select your primary financial goal" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="retirement" className="p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#725BF4] to-[#5d47d9] rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Comfortable Retirement</span>
                </div>
              </SelectItem>
              <SelectItem value="house" className="p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00A175] to-[#008a64] rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Buy a Dream Home</span>
                </div>
              </SelectItem>
              <SelectItem value="education" className="p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Children's Education</span>
                </div>
              </SelectItem>
              <SelectItem value="business" className="p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Start a Business</span>
                </div>
              </SelectItem>
              <SelectItem value="travel" className="p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Travel the World</span>
                </div>
              </SelectItem>
              <SelectItem value="emergency" className="p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Build Emergency Fund</span>
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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#725BF4] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">Future Self</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <Avatar
                age={userProfile.age + 35}
                income={userProfile.income}
                riskTolerance={userProfile.riskTolerance}
                size="large"
              />
            </div>
            
            <div className="mb-8">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#725BF4]" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
              Meet Your
              <span className="block text-[#725BF4] mt-2">
                Future Self! 🎉
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Based on your profile, here's a glimpse of your financial future at age {userProfile.age + 35}. 
              These projections are tailored to your risk tolerance and life goals.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <Card className="card-modern">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-[#00A175] mb-2">₹24L</div>
                  <div className="text-[#00A175] text-lg font-semibold">Emergency Fund</div>
                  <div className="text-gray-600 text-sm mt-2">6 months expenses covered</div>
                </CardContent>
              </Card>
              
              <Card className="card-modern">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-[#725BF4] mb-2">₹2.5Cr</div>
                  <div className="text-[#725BF4] text-lg font-semibold">Investment Portfolio</div>
                  <div className="text-gray-600 text-sm mt-2">Diversified across assets</div>
                </CardContent>
              </Card>
              
              <Card className="card-modern">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-gray-700 mb-2">₹45K</div>
                  <div className="text-gray-700 text-lg font-semibold">Monthly Passive Income</div>
                  <div className="text-gray-600 text-sm mt-2">From investments & dividends</div>
                </CardContent>
              </Card>
            </div>
            
            <Button className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              <Sparkles className="w-6 h-6 mr-3" />
              Start Your Financial Journey
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#725BF4] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Future Self</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Avatar Section */}
            <div className="order-2 lg:order-1">
              <Card className="card-modern bg-gradient-to-br from-[#725BF4] to-[#5d47d9] text-white border-0">
                <CardContent className="p-10 text-center">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                      Your Future Self Preview
                    </h2>
                    <p className="text-purple-200">
                      Watch your avatar evolve as you progress!
                    </p>
                  </div>
                  <div className="mb-8">
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
              <Card className="card-modern">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-sm text-gray-500 font-medium">
                      Step {currentStep + 1} of {steps.length}
                    </div>
                    <div className="flex space-x-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            index <= currentStep 
                              ? 'bg-gradient-to-r from-[#725BF4] to-[#5d47d9] shadow-lg' 
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#725BF4] to-[#5d47d9] rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900">
                        {currentStepData.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    {currentStepData.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 space-y-8">
                  <div className="min-h-[300px] flex items-center">
                    {currentStepData.component}
                  </div>

                  <div className="flex justify-between pt-8">
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      className="h-14 px-8 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      {currentStep === 0 ? 'Back to Accounts' : 'Previous'}
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      className="h-14 px-8 bg-[#00A175] hover:bg-[#008a64] text-white border-0 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
    </div>
  );
}