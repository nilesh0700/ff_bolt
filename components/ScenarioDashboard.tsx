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
      case 'conservative': return 'from-[#00A175] to-[#008a64]';
      case 'balanced': return 'from-[#725BF4] to-[#5d47d9]';
      case 'aggressive': return 'from-gray-600 to-gray-700';
      default: return 'from-[#725BF4] to-[#5d47d9]';
    }
  };

  const selectedScenarioData = scenarios[selectedScenario];
  const yearData = selectedScenarioData.timeline.find(t => t.year === selectedYear) || selectedScenarioData.timeline[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-6 py-6">
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#725BF4] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Financial Scenarios</h1>
                  <p className="text-sm text-gray-600">Compare different life paths and outcomes</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateNewScenarios}
              disabled={isGenerating}
              className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200"
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

      <div className="container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-3 mb-8 border border-gray-200">
            <TrendingUp className="w-5 h-5 text-[#00A175] mr-2" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Projections</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-gray-900">
            Your Financial
            <span className="block text-[#725BF4] mt-2">
              Future Scenarios
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore different life paths and see how your financial decisions today impact your future wealth
          </p>
        </div>

        {/* Scenario Selection */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {scenarios.map((scenario, index) => {
            const IconComponent = getScenarioIcon(scenario.type);
            const isSelected = selectedScenario === index;
            
            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 rounded-3xl ${
                  isSelected 
                    ? `border-[#725BF4] bg-gradient-to-br ${getScenarioColor(scenario.type)}/10 shadow-xl` 
                    : 'border-gray-200 bg-white hover:border-gray-300 card-hover'
                }`}
                onClick={() => setSelectedScenario(index)}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getScenarioColor(scenario.type)} flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-[#725BF4] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {scenario.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    {scenario.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Net Worth by {maxYear}</span>
                      <span className="font-bold text-xl text-gray-900">
                        ₹{scenario.finalNetWorth.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Confidence Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
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
        <Card className="card-modern mb-16">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">
              Timeline: {selectedYear}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Slide to explore your financial journey over time
            </CardDescription>
          </CardHeader>
          <CardContent className="px-12 pb-12">
            <div className="space-y-8">
              <Slider
                value={[selectedYear]}
                onValueChange={(value) => setSelectedYear(value[0])}
                max={maxYear}
                min={currentYear}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{currentYear}</span>
                <span>{maxYear}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed View */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Financial Metrics */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Financial Snapshot - {selectedYear}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {selectedScenarioData.title} scenario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#00A175]/10 to-[#008a64]/10 p-8 rounded-2xl border border-[#00A175]/20">
                  <div className="text-4xl font-bold text-[#00A175] mb-2">
                    ₹{yearData.netWorth.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[#00A175] font-semibold text-lg">Net Worth</div>
                </div>
                
                <div className="bg-gradient-to-br from-[#725BF4]/10 to-[#5d47d9]/10 p-8 rounded-2xl border border-[#725BF4]/20">
                  <div className="text-4xl font-bold text-[#725BF4] mb-2">
                    ₹{yearData.debt.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[#725BF4] font-semibold text-lg">Total Debt</div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl border border-gray-300">
                  <div className="text-4xl font-bold text-gray-700 mb-2">
                    ₹{yearData.monthlyIncome.toLocaleString('en-IN')}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg">Monthly Income</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200">
                  <div className="text-4xl font-bold text-orange-700 mb-2">
                    ₹{yearData.monthlyExpenses.toLocaleString('en-IN')}
                  </div>
                  <div className="text-orange-700 font-semibold text-lg">Monthly Expenses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Milestones Achieved
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Goals completed by {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                    <div key={index} className="flex items-center space-x-4 p-6 bg-gradient-to-r from-[#00A175]/10 to-[#008a64]/10 rounded-2xl border border-[#00A175]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00A175] to-[#008a64] rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                      <div className="text-sm text-[#00A175] font-semibold">
                        ₹{milestone.value.toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
                
                {yearData.milestones.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-50" />
                    <p className="text-lg">No milestones achieved by this year yet.</p>
                    <p className="text-sm">Keep working towards your goals!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8">
          <Button
            onClick={handleLockPlan}
            className="bg-[#00A175] hover:bg-[#008a64] text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Lock className="w-5 h-5 mr-3" />
            Lock This Plan
          </Button>
          
          <Button
            onClick={() => onNavigate('actions')}
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-200"
          >
            <TrendingUp className="w-5 h-5 mr-3" />
            View Action Items
          </Button>
        </div>
      </div>
    </div>
  );
}