"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Target, Users, Zap, Heart, Home, GraduationCap, Briefcase, Plane, Shield } from 'lucide-react';
import Avatar from '@/components/Avatar';

interface OnboardingPageProps {
  userProfile: any;
  onProfileUpdate: (updates: any) => void;
  onComplete: (profile: any) => void;
  onBack: () => void;
}

export default function OnboardingPage({ userProfile, onProfileUpdate, onComplete, onBack }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Choose Your Future Age",
      description: "Select the age you'd like to have conversations with",
      icon: Target,
      component: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              {userProfile.futureAge}
            </div>
            <p className="text-slate-600">Your future self's age</p>
          </div>
          <div className="px-6">
            <Slider
              value={[userProfile.futureAge]}
              onValueChange={(value) => onProfileUpdate({ futureAge: value[0] })}
              max={80}
              min={userProfile.age + 5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>{userProfile.age + 5}</span>
              <span>80</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What's Your Personality?",
      description: "This helps us tailor advice to your risk tolerance",
      icon: Users,
      component: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              { 
                value: 'conservative', 
                label: 'Conservative', 
                desc: 'I prefer safe, steady growth over high returns',
                color: 'from-green-500 to-emerald-600'
              },
              { 
                value: 'balanced', 
                label: 'Balanced', 
                desc: 'I want a mix of safety and growth opportunities',
                color: 'from-blue-500 to-indigo-600'
              },
              { 
                value: 'aggressive', 
                label: 'Aggressive', 
                desc: 'I am comfortable with higher risk for better returns',
                color: 'from-red-500 to-pink-600'
              }
            ].map((option) => (
              <Button
                key={option.value}
                variant={userProfile.personality === option.value ? "default" : "outline"}
                onClick={() => onProfileUpdate({ personality: option.value })}
                className={`h-auto p-6 text-left justify-start rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  userProfile.personality === option.value 
                    ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg` 
                    : 'bg-white hover:shadow-lg border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-full">
                  <div className="font-bold text-lg mb-2">{option.label}</div>
                  <div className={`text-sm opacity-90 leading-relaxed ${
                    userProfile.personality === option.value ? 'text-white' : 'text-slate-600'
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
      title: "Select Your Life Goals",
      description: "Choose what matters most to you (select multiple)",
      icon: Heart,
      component: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { id: 'retirement', label: 'Comfortable Retirement', icon: Heart, color: 'from-purple-500 to-indigo-600' },
              { id: 'house', label: 'Buy Dream Home', icon: Home, color: 'from-green-500 to-teal-600' },
              { id: 'education', label: "Children's Education", icon: GraduationCap, color: 'from-blue-500 to-cyan-600' },
              { id: 'business', label: 'Start a Business', icon: Briefcase, color: 'from-orange-500 to-red-600' },
              { id: 'travel', label: 'Travel the World', icon: Plane, color: 'from-pink-500 to-rose-600' },
              { id: 'emergency', label: 'Emergency Fund', icon: Shield, color: 'from-emerald-500 to-green-600' }
            ].map((goal) => {
              const IconComponent = goal.icon;
              const isSelected = userProfile.goals.includes(goal.id);
              
              return (
                <Button
                  key={goal.id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => {
                    const newGoals = isSelected 
                      ? userProfile.goals.filter((g: string) => g !== goal.id)
                      : [...userProfile.goals, goal.id];
                    onProfileUpdate({ goals: newGoals });
                  }}
                  className={`h-auto p-6 text-left justify-start rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? `bg-gradient-to-r ${goal.color} text-white border-transparent shadow-lg` 
                      : 'bg-white hover:shadow-lg border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : `bg-gradient-to-r ${goal.color}`
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        isSelected ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold text-base">{goal.label}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(userProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

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
                  <h2 className="text-3xl font-bold mb-4 text-purple-100">
                    Your Future Self Preview
                  </h2>
                  <p className="text-purple-200">
                    See how your avatar evolves with your choices!
                  </p>
                </div>
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" />
                  <Avatar
                    age={userProfile.futureAge}
                    income={800000}
                    riskTolerance={userProfile.personality === 'conservative' ? 'low' : userProfile.personality === 'balanced' ? 'medium' : 'high'}
                    size="large"
                  />
                </div>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-white">
                    Age {userProfile.futureAge}
                  </div>
                  <div className="text-purple-200 capitalize">
                    {userProfile.personality} Investor
                  </div>
                  <div className="text-sm text-purple-300">
                    {userProfile.goals.length} life goals selected
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
                    disabled={currentStep === 2 && userProfile.goals.length === 0}
                    className="h-14 px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50"
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Start Chatting!
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