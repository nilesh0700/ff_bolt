"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Target, Award, Calendar, Sparkles, Trophy, Star, CheckCircle } from 'lucide-react';
import { mockApi } from '@/lib/mockApi';

interface ProgressTrackerProps {
  userProfile: any;
  onNavigate: (screen: string) => void;
}

export default function ProgressTracker({ userProfile, onNavigate }: ProgressTrackerProps) {
  const [progressData] = useState(mockApi.getProgressData());
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const getPeriodData = () => {
    switch (selectedPeriod) {
      case 'month': return progressData.monthly;
      case 'quarter': return progressData.quarterly;
      case 'year': return progressData.yearly;
      default: return progressData.monthly;
    }
  };

  const currentData = getPeriodData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => onNavigate('chat')}
                variant="ghost"
                className="rounded-2xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Chat
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Progress Tracker</h1>
                <p className="text-sm text-slate-600">Monitor your financial journey and celebrate milestones</p>
              </div>
            </div>
            
            <div className="flex items-center bg-white rounded-2xl border border-slate-200 p-1">
              <Button
                onClick={() => setSelectedPeriod('month')}
                variant={selectedPeriod === 'month' ? 'default' : 'ghost'}
                className="rounded-xl text-sm"
              >
                Monthly
              </Button>
              <Button
                onClick={() => setSelectedPeriod('quarter')}
                variant={selectedPeriod === 'quarter' ? 'default' : 'ghost'}
                className="rounded-xl text-sm"
              >
                Quarterly
              </Button>
              <Button
                onClick={() => setSelectedPeriod('year')}
                variant={selectedPeriod === 'year' ? 'default' : 'ghost'}
                className="rounded-xl text-sm"
              >
                Yearly
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Financial Health Meter */}
        <Card className="glass-effect border-0 rounded-3xl mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
              Financial Health Score
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Your overall financial wellness based on multiple factors
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4">
                  {progressData.healthScore}/100
                </div>
                <div className="text-xl text-slate-600 font-medium">
                  {progressData.healthScore >= 80 ? 'Excellent' : 
                   progressData.healthScore >= 60 ? 'Good' : 
                   progressData.healthScore >= 40 ? 'Fair' : 'Needs Improvement'}
                </div>
              </div>
              
              <div className="relative mb-8">
                <Progress value={progressData.healthScore} className="h-6 bg-slate-200 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-8 text-sm font-medium text-slate-600">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Savings Rate', value: 85, color: 'from-green-500 to-emerald-600' },
                  { label: 'Debt Management', value: 72, color: 'from-blue-500 to-indigo-600' },
                  { label: 'Investment Growth', value: 68, color: 'from-purple-500 to-pink-600' },
                  { label: 'Emergency Fund', value: 90, color: 'from-yellow-500 to-orange-600' }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-slate-800 mb-1">{metric.value}%</div>
                    <div className="text-sm text-slate-600 mb-2">{metric.label}</div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-700`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Key Metrics */}
          <Card className="glass-effect border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-indigo-600" />
                Key Metrics - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    +₹{currentData.netWorthGrowth.toLocaleString('en-IN')}
                  </div>
                  <div className="text-green-600 font-medium">Net Worth Growth</div>
                  <div className="text-sm text-green-500 mt-1">+{currentData.netWorthGrowthPercent}%</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    ₹{currentData.totalSaved.toLocaleString('en-IN')}
                  </div>
                  <div className="text-blue-600 font-medium">Total Saved</div>
                  <div className="text-sm text-blue-500 mt-1">{currentData.savingsRate}% of income</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    +₹{currentData.investmentReturns.toLocaleString('en-IN')}
                  </div>
                  <div className="text-purple-600 font-medium">Investment Returns</div>
                  <div className="text-sm text-purple-500 mt-1">+{currentData.investmentReturnsPercent}% return</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                  <div className="text-3xl font-bold text-orange-700 mb-2">
                    -₹{currentData.debtReduction.toLocaleString('en-IN')}
                  </div>
                  <div className="text-orange-600 font-medium">Debt Reduced</div>
                  <div className="text-sm text-orange-500 mt-1">-{currentData.debtReductionPercent}% total debt</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="glass-effect border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{achievement.title}</h4>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{achievement.date}</p>
                    </div>
                    <div className="text-2xl">{achievement.emoji}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Progress */}
        <Card className="glass-effect border-0 rounded-3xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
              <Target className="w-6 h-6 mr-3 text-indigo-600" />
              Goals Progress
            </CardTitle>
            <CardDescription>
              Track your progress towards major life goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {progressData.goalsProgress.map((goal, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">{goal.title}</h4>
                    <span className="text-sm text-slate-600">{goal.progress}% complete</span>
                  </div>
                  
                  <div className="relative">
                    <Progress value={goal.progress} className="h-3 bg-slate-200 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-700">
                        ₹{goal.currentAmount.toLocaleString('en-IN')} / ₹{goal.targetAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Target: {goal.targetDate}</span>
                    <span className={goal.onTrack ? 'text-green-600' : 'text-orange-600'}>
                      {goal.onTrack ? '✓ On track' : '⚠ Behind schedule'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Check-in */}
        <Card className="glass-effect border-0 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-purple-600" />
              Monthly Check-in with Future Self
            </CardTitle>
            <CardDescription>
              Schedule regular conversations to stay on track
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Next Check-in: March 15, 2024
                </h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Your future self is excited to review your progress and help you adjust your financial strategy. 
                  You've been doing great so far!
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={() => onNavigate('chat')}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Check-in Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}