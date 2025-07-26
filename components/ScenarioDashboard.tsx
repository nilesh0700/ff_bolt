"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, TrendingUp, TrendingDown, Home, Car, GraduationCap, Lock, RotateCcw, Sparkles } from 'lucide-react';
import { mockApi } from '@/lib/mockApi';

interface ScenarioDashboardProps {
  userProfile: any;
  onNavigate: (screen: string) => void;
}

export default function ScenarioDashboard({ userProfile, onNavigate }: ScenarioDashboardProps) {
  const [selectedYear, setSelectedYear] = useState(2030);
  const [scenarios, setScenarios] = useState(mockApi.getScenarios());
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 30;

  const handleGenerateNewScenarios = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScenarios(mockApi.generateNewScenarios());
    setIsGenerating(false);
  };

  const handleLockPlan = () => {
    // Simulate locking the plan
    alert(`Locked "${scenarios[selectedScenario].title}" as your financial plan!`);
  };

  const getScenarioIcon = (type: string) => {
    switch (type) {
      case 'conservative': return TrendingUp;
      case 'balanced': return Home;
      case 'aggressive': return TrendingDown;
      default: return Sparkles;
    }
  };

  const getScenarioColor = (type: string) => {
    switch (type) {
      case 'conservative': return 'from-green-500 to-emerald-600';
      case 'balanced': return 'from-blue-500 to-indigo-600';
      case 'aggressive': return 'from-red-500 to-pink-600';
      default: return 'from-purple-500 to-indigo-600';
    }
  };

  const selectedScenarioData = scenarios[selectedScenario];
  const yearData = selectedScenarioData.timeline.find(t => t.year === selectedYear) || selectedScenarioData.timeline[0];

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
                <h1 className="text-2xl font-bold text-slate-800">Financial Scenarios</h1>
                <p className="text-sm text-slate-600">Compare different life paths and outcomes</p>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateNewScenarios}
              disabled={isGenerating}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <RotateCcw className="w-4 h-4 mr-2" />
              )}
              Re-run Scenarios
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Scenario Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {scenarios.map((scenario, index) => {
            const IconComponent = getScenarioIcon(scenario.type);
            const isSelected = selectedScenario === index;
            
            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 rounded-3xl ${
                  isSelected 
                    ? `border-indigo-300 bg-gradient-to-br ${getScenarioColor(scenario.type)}/10 shadow-lg` 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                onClick={() => setSelectedScenario(index)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getScenarioColor(scenario.type)} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    {scenario.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {scenario.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Net Worth by {maxYear}</span>
                      <span className="font-bold text-lg text-slate-800">
                        ₹{scenario.finalNetWorth.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Confidence Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getScenarioColor(scenario.type)} transition-all duration-500`}
                            style={{ width: `${scenario.confidenceScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{scenario.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline Slider */}
        <Card className="glass-effect border-0 rounded-3xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800 text-center">
              Timeline: {selectedYear}
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              Slide to explore your financial journey over time
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <Slider
                value={[selectedYear]}
                onValueChange={(value) => setSelectedYear(value[0])}
                max={maxYear}
                min={currentYear}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-500">
                <span>{currentYear}</span>
                <span>{maxYear}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed View */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Financial Metrics */}
          <Card className="glass-effect border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Financial Snapshot - {selectedYear}
              </CardTitle>
              <CardDescription>
                {selectedScenarioData.title} scenario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    ₹{yearData.netWorth.toLocaleString('en-IN')}
                  </div>
                  <div className="text-green-600 font-medium">Net Worth</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    ₹{yearData.debt.toLocaleString('en-IN')}
                  </div>
                  <div className="text-blue-600 font-medium">Total Debt</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    ₹{yearData.monthlyIncome.toLocaleString('en-IN')}
                  </div>
                  <div className="text-purple-600 font-medium">Monthly Income</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                  <div className="text-3xl font-bold text-orange-700 mb-2">
                    ₹{yearData.monthlyExpenses.toLocaleString('en-IN')}
                  </div>
                  <div className="text-orange-600 font-medium">Monthly Expenses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="glass-effect border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Milestones Achieved
              </CardTitle>
              <CardDescription>
                Goals completed by {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yearData.milestones.map((milestone, index) => {
                  const getIcon = (type: string) => {
                    switch (type) {
                      case 'house': return Home;
                      case 'car': return Car;
                      case 'education': return GraduationCap;
                      default: return Sparkles;
                    }
                  };
                  
                  const IconComponent = getIcon(milestone.type);
                  
                  return (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{milestone.title}</h4>
                        <p className="text-sm text-slate-600">{milestone.description}</p>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        ₹{milestone.value.toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
                
                {yearData.milestones.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No milestones achieved by this year yet.</p>
                    <p className="text-sm">Keep working towards your goals!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <Button
            onClick={handleLockPlan}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-3xl font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            <Lock className="w-5 h-5 mr-3" />
            Lock This Plan
          </Button>
          
          <Button
            onClick={() => onNavigate('actions')}
            variant="outline"
            className="border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-3xl font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            <TrendingUp className="w-5 h-5 mr-3" />
            View Action Items
          </Button>
        </div>
      </div>
    </div>
  );
}