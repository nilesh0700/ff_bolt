"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, DollarSign, Target, Calendar, Trophy, Sparkles, CheckCircle, AlertCircle, TrendingDown, Star, Award } from 'lucide-react';
import { mockApi } from '@/lib/mockApi';
import Navbar from '@/components/Navbar';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        {/* Page Header and Period Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Progress Tracker</h1>
            <p className="text-xl text-gray-600">Monitor your financial journey and celebrate milestones</p>
          </div>
          
          <div className="flex items-center bg-white rounded-2xl border border-gray-200 p-1 shadow-sm">
            <Button
              onClick={() => setSelectedPeriod('month')}
              variant={selectedPeriod === 'month' ? 'default' : 'ghost'}
              className={`rounded-xl text-sm font-semibold ${
                selectedPeriod === 'month' 
                  ? 'bg-[#725BF4] hover:bg-[#5d47d9] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setSelectedPeriod('quarter')}
              variant={selectedPeriod === 'quarter' ? 'default' : 'ghost'}
              className={`rounded-xl text-sm font-semibold ${
                selectedPeriod === 'quarter' 
                  ? 'bg-[#725BF4] hover:bg-[#5d47d9] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quarterly
            </Button>
            <Button
              onClick={() => setSelectedPeriod('year')}
              variant={selectedPeriod === 'year' ? 'default' : 'ghost'}
              className={`rounded-xl text-sm font-semibold ${
                selectedPeriod === 'year' 
                  ? 'bg-[#725BF4] hover:bg-[#5d47d9] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
            </Button>
          </div>
        </div>
        {/* Financial Health Meter */}
        <Card className="card-modern mb-16">
          <CardHeader className="text-center pb-8">
            <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-3 mb-8 border border-gray-200">
              <Star className="w-5 h-5 text-[#00A175] mr-2" />
              <span className="text-sm font-medium text-gray-700">Overall Health Score</span>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
              Financial Health Score
            </CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Your overall financial wellness based on multiple factors
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-12">
              <div className="text-7xl font-bold bg-gradient-to-r from-[#00A175] to-[#008a64] bg-clip-text text-transparent mb-6">
                {progressData.healthScore}/100
              </div>
              <div className="text-2xl text-gray-600 font-medium">
                {progressData.healthScore >= 80 ? 'Excellent' : 
                 progressData.healthScore >= 60 ? 'Good' : 
                 progressData.healthScore >= 40 ? 'Fair' : 'Needs Improvement'}
              </div>
            </div>
            
            <div className="relative mb-12">
              <Progress value={progressData.healthScore} className="h-8 bg-gray-200 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-16 text-sm font-medium text-gray-600">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: 'Savings Rate', value: 85, color: 'from-[#00A175] to-[#008a64]' },
                { label: 'Debt Management', value: 72, color: 'from-[#725BF4] to-[#5d47d9]' },
                { label: 'Investment Growth', value: 68, color: 'from-gray-600 to-gray-700' },
                { label: 'Emergency Fund', value: 90, color: 'from-yellow-500 to-orange-600' }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}%</div>
                  <div className="text-sm text-gray-600 mb-4">{metric.label}</div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-700`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Key Metrics */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-[#725BF4]" />
                Key Metrics - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#00A175]/10 to-[#008a64]/10 p-8 rounded-2xl border border-[#00A175]/20">
                  <div className="text-4xl font-bold text-[#00A175] mb-2">
                    +₹{currentData.netWorthGrowth.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[#00A175] font-semibold text-lg">Net Worth Growth</div>
                  <div className="text-sm text-[#008a64] mt-1">+{currentData.netWorthGrowthPercent}%</div>
                </div>
                
                <div className="bg-gradient-to-br from-[#725BF4]/10 to-[#5d47d9]/10 p-8 rounded-2xl border border-[#725BF4]/20">
                  <div className="text-4xl font-bold text-[#725BF4] mb-2">
                    ₹{currentData.totalSaved.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[#725BF4] font-semibold text-lg">Total Saved</div>
                  <div className="text-sm text-[#5d47d9] mt-1">{currentData.savingsRate}% of income</div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl border border-gray-300">
                  <div className="text-4xl font-bold text-gray-700 mb-2">
                    +₹{currentData.investmentReturns.toLocaleString('en-IN')}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg">Investment Returns</div>
                  <div className="text-sm text-gray-600 mt-1">+{currentData.investmentReturnsPercent}% return</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200">
                  <div className="text-4xl font-bold text-orange-700 mb-2">
                    -₹{currentData.debtReduction.toLocaleString('en-IN')}
                  </div>
                  <div className="text-orange-700 font-semibold text-lg">Debt Reduced</div>
                  <div className="text-sm text-orange-600 mt-1">-{currentData.debtReductionPercent}% total debt</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-[#00A175]" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressData.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-4 p-6 bg-gradient-to-r from-[#00A175]/10 to-[#008a64]/10 rounded-2xl border border-[#00A175]/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00A175] to-[#008a64] rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{achievement.title}</h4>
                      <p className="text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                    <div className="text-3xl">{achievement.emoji}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Progress */}
        <Card className="card-modern mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Target className="w-6 h-6 mr-3 text-[#725BF4]" />
              Goals Progress
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Track your progress towards major life goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {progressData.goalsProgress.map((goal, index) => (
                <div key={index} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-lg">{goal.title}</h4>
                    <span className="text-sm text-gray-600 font-semibold">{goal.progress}% complete</span>
                  </div>
                  
                  <div className="relative">
                    <Progress value={goal.progress} className="h-4 bg-gray-200 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-700">
                        ₹{goal.currentAmount.toLocaleString('en-IN')} / ₹{goal.targetAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Target: {goal.targetDate}</span>
                    <span className={goal.onTrack ? 'text-[#00A175]' : 'text-orange-600'}>
                      {goal.onTrack ? '✓ On track' : '⚠ Behind schedule'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Check-in */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-[#725BF4]" />
              Monthly Check-in with Future Self
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Schedule regular conversations to stay on track
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-[#725BF4]/10 to-[#5d47d9]/10 p-12 rounded-3xl border border-[#725BF4]/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#725BF4] to-[#5d47d9] rounded-full flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Next Check-in: March 15, 2024
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
                  Your future self is excited to review your progress and help you adjust your financial strategy. 
                  You've been doing great so far!
                </p>
                <div className="flex justify-center space-x-6">
                  <Button 
                    onClick={() => onNavigate('chat')}
                    className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Check-in Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200"
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