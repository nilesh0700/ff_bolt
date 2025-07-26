// Mock API for simulating backend responses

export const mockApi = {
  // Simulate Fi Money connection
  connectFi: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      data: {
        balance: 125000,
        monthlyIncome: 85000,
        monthlyExpenses: 62000,
        transactions: [
          { id: 1, description: 'Salary Credit', amount: 85000, date: '2024-02-01', category: 'income' },
          { id: 2, description: 'Rent Payment', amount: -25000, date: '2024-02-02', category: 'housing' },
          { id: 3, description: 'Groceries', amount: -8500, date: '2024-02-03', category: 'food' },
          { id: 4, description: 'Uber', amount: -1200, date: '2024-02-04', category: 'transport' },
          { id: 5, description: 'Netflix', amount: -799, date: '2024-02-05', category: 'entertainment' }
        ]
      }
    };
  },

  // Simulate Zerodha connection
  connectZerodha: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      data: {
        totalValue: 450000,
        totalInvestment: 380000,
        totalReturns: 70000,
        returnsPercent: 18.42,
        holdings: [
          { symbol: 'RELIANCE', quantity: 50, avgPrice: 2450, currentPrice: 2680, value: 134000 },
          { symbol: 'TCS', quantity: 30, avgPrice: 3200, currentPrice: 3580, value: 107400 },
          { symbol: 'INFY', quantity: 40, avgPrice: 1450, currentPrice: 1620, value: 64800 },
          { symbol: 'HDFC', quantity: 25, avgPrice: 2800, currentPrice: 3100, value: 77500 },
          { symbol: 'ICICI', quantity: 35, avgPrice: 850, currentPrice: 920, value: 32200 }
        ]
      }
    };
  },

  // Simulate chat message responses
  sendChatMessage: async (message: string, userProfile: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      {
        message: `Hey! Looking at your Fi Money data, I can see you're saving about ₹23,000 per month. That's fantastic! At this rate, by the time I'm ${userProfile.futureAge}, we'll have built a solid emergency fund of ₹8 lakhs. But here's what I'm thinking - what if we could optimize your spending on dining out? I noticed you spend about ₹12,000 monthly on restaurants. If we cut that by just 30%, we could invest an extra ₹3,600 monthly in mutual funds. Over 20 years, that's an additional ₹28 lakhs! 🚀`,
        sender: 'future_self' as const,
        futureAge: userProfile.futureAge
      },
      {
        message: `I've been analyzing your investment portfolio on Zerodha. You're doing well with a 18.4% return! However, I notice you're heavily invested in large-cap stocks. While that's safe, diversifying into some mid-cap and small-cap funds could potentially boost our returns. Based on your ${userProfile.personality} risk profile, I'd suggest allocating 20% to mid-cap funds. This could increase our portfolio value by an estimated ₹15 lakhs by retirement! Want me to show you some specific fund recommendations?`,
        sender: 'future_self' as const,
        futureAge: userProfile.futureAge
      },
      {
        message: `Based on your current financial data and goals, I've run some projections. Here's what I found: Your current savings rate of 27% is excellent! If you maintain this, plus the investment optimizations we discussed, you'll be able to achieve your dream home goal by 2029 - that's 2 years earlier than your original target! The key is consistency and making small adjustments. Should I create a detailed action plan for you?`,
        sender: 'ai_assistant' as const
      }
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  },

  // Get financial scenarios
  getScenarios: () => {
    return [
      {
        title: "Conservative Growth",
        description: "Steady, low-risk investments with guaranteed returns",
        type: "conservative",
        finalNetWorth: 2500000,
        confidenceScore: 85,
        timeline: [
          {
            year: 2024,
            netWorth: 575000,
            debt: 0,
            monthlyIncome: 85000,
            monthlyExpenses: 62000,
            milestones: []
          },
          {
            year: 2030,
            netWorth: 1200000,
            debt: 0,
            monthlyIncome: 120000,
            monthlyExpenses: 75000,
            milestones: [
              { type: 'emergency', title: 'Emergency Fund Complete', description: '6 months expenses saved', value: 450000 }
            ]
          },
          {
            year: 2040,
            netWorth: 2500000,
            debt: 0,
            monthlyIncome: 180000,
            monthlyExpenses: 95000,
            milestones: [
              { type: 'house', title: 'Dream Home Purchased', description: '3BHK in prime location', value: 8000000 },
              { type: 'education', title: 'Education Fund Ready', description: 'Children\'s education secured', value: 2500000 }
            ]
          }
        ]
      },
      {
        title: "Balanced Portfolio",
        description: "Mix of growth and stability with moderate risk",
        type: "balanced",
        finalNetWorth: 3800000,
        confidenceScore: 78,
        timeline: [
          {
            year: 2024,
            netWorth: 575000,
            debt: 0,
            monthlyIncome: 85000,
            monthlyExpenses: 62000,
            milestones: []
          },
          {
            year: 2030,
            netWorth: 1800000,
            debt: 0,
            monthlyIncome: 125000,
            monthlyExpenses: 78000,
            milestones: [
              { type: 'emergency', title: 'Emergency Fund Complete', description: '6 months expenses saved', value: 468000 },
              { type: 'car', title: 'New Car Purchased', description: 'Upgraded to premium sedan', value: 1500000 }
            ]
          },
          {
            year: 2040,
            netWorth: 3800000,
            debt: 0,
            monthlyIncome: 200000,
            monthlyExpenses: 110000,
            milestones: [
              { type: 'house', title: 'Dream Home Purchased', description: '4BHK with garden', value: 12000000 },
              { type: 'education', title: 'Education Fund Ready', description: 'Premium education secured', value: 4000000 }
            ]
          }
        ]
      },
      {
        title: "Aggressive Growth",
        description: "High-growth investments with higher risk tolerance",
        type: "aggressive",
        finalNetWorth: 5200000,
        confidenceScore: 65,
        timeline: [
          {
            year: 2024,
            netWorth: 575000,
            debt: 0,
            monthlyIncome: 85000,
            monthlyExpenses: 62000,
            milestones: []
          },
          {
            year: 2030,
            netWorth: 2200000,
            debt: 0,
            monthlyIncome: 140000,
            monthlyExpenses: 85000,
            milestones: [
              { type: 'emergency', title: 'Emergency Fund Complete', description: '6 months expenses saved', value: 510000 },
              { type: 'car', title: 'Luxury Car Purchased', description: 'Premium luxury vehicle', value: 2500000 }
            ]
          },
          {
            year: 2040,
            netWorth: 5200000,
            debt: 0,
            monthlyIncome: 250000,
            monthlyExpenses: 130000,
            milestones: [
              { type: 'house', title: 'Luxury Home Purchased', description: 'Premium villa with amenities', value: 15000000 },
              { type: 'education', title: 'International Education Fund', description: 'Global education opportunities', value: 6000000 }
            ]
          }
        ]
      }
    ];
  },

  // Generate new scenarios
  generateNewScenarios: () => {
    // Return slightly different scenarios
    const baseScenarios = mockApi.getScenarios();
    return baseScenarios.map(scenario => ({
      ...scenario,
      finalNetWorth: scenario.finalNetWorth + Math.floor(Math.random() * 500000),
      confidenceScore: Math.max(60, Math.min(90, scenario.confidenceScore + Math.floor(Math.random() * 20) - 10))
    }));
  },

  // Get recommendations
  getRecommendations: () => {
    return [
      {
        id: '1',
        title: 'Increase SIP Amount',
        description: 'Boost your monthly SIP from ₹15,000 to ₹20,000 to accelerate wealth building',
        category: 'investment',
        impact: 'high',
        effort: 'low',
        potentialSavings: 1200000,
        steps: [
          'Log into your mutual fund platform',
          'Navigate to existing SIP section',
          'Increase amount by ₹5,000',
          'Set up auto-debit for the new amount'
        ]
      },
      {
        id: '2',
        title: 'Optimize Dining Expenses',
        description: 'Reduce dining out expenses by 30% and redirect savings to investments',
        category: 'spending',
        impact: 'medium',
        effort: 'medium',
        potentialSavings: 432000,
        steps: [
          'Track current dining expenses for one week',
          'Set a monthly dining budget of ₹8,000',
          'Plan home-cooked meals for weekdays',
          'Limit restaurant visits to weekends only',
          'Invest the saved amount in index funds'
        ]
      },
      {
        id: '3',
        title: 'Build Emergency Fund',
        description: 'Complete your emergency fund to cover 6 months of expenses',
        category: 'savings',
        impact: 'high',
        effort: 'low',
        potentialSavings: 0,
        steps: [
          'Calculate 6 months of total expenses (₹3.72L)',
          'Open a high-yield savings account',
          'Set up automatic transfer of ₹15,000 monthly',
          'Keep funds easily accessible but separate'
        ]
      },
      {
        id: '4',
        title: 'Diversify Investment Portfolio',
        description: 'Add mid-cap and international funds to your portfolio for better diversification',
        category: 'investment',
        impact: 'medium',
        effort: 'medium',
        potentialSavings: 800000,
        steps: [
          'Research top-performing mid-cap funds',
          'Allocate 20% of new investments to mid-cap',
          'Consider 10% allocation to international funds',
          'Rebalance portfolio quarterly'
        ]
      },
      {
        id: '5',
        title: 'Optimize Credit Card Usage',
        description: 'Use credit cards strategically for rewards while avoiding interest charges',
        category: 'debt',
        impact: 'low',
        effort: 'low',
        potentialSavings: 24000,
        steps: [
          'Set up auto-pay for full credit card balance',
          'Use cards only for planned purchases',
          'Maximize cashback on categories you spend most',
          'Review and redeem rewards monthly'
        ]
      },
      {
        id: '6',
        title: 'Start Tax-Saving Investments',
        description: 'Maximize tax savings through ELSS and other 80C investments',
        category: 'investment',
        impact: 'medium',
        effort: 'low',
        potentialSavings: 46800,
        steps: [
          'Calculate remaining 80C limit for this year',
          'Invest in top-rated ELSS funds',
          'Consider PPF for long-term tax-free growth',
          'Plan investments early in the financial year'
        ]
      }
    ];
  },

  // Get progress data
  getProgressData: () => {
    return {
      healthScore: 78,
      monthly: {
        netWorthGrowth: 45000,
        netWorthGrowthPercent: 8.2,
        totalSaved: 23000,
        savingsRate: 27,
        investmentReturns: 12500,
        investmentReturnsPercent: 2.8,
        debtReduction: 0,
        debtReductionPercent: 0
      },
      quarterly: {
        netWorthGrowth: 125000,
        netWorthGrowthPercent: 24.1,
        totalSaved: 69000,
        savingsRate: 27,
        investmentReturns: 38500,
        investmentReturnsPercent: 8.9,
        debtReduction: 0,
        debtReductionPercent: 0
      },
      yearly: {
        netWorthGrowth: 485000,
        netWorthGrowthPercent: 84.3,
        totalSaved: 276000,
        savingsRate: 27,
        investmentReturns: 142000,
        investmentReturnsPercent: 31.6,
        debtReduction: 0,
        debtReductionPercent: 0
      },
      recentAchievements: [
        {
          title: 'Savings Milestone',
          description: 'Saved ₹5 lakhs in total investments!',
          date: 'February 15, 2024',
          emoji: '🎉'
        },
        {
          title: 'Consistency Champion',
          description: 'Maintained SIP for 12 consecutive months',
          date: 'February 1, 2024',
          emoji: '🏆'
        },
        {
          title: 'Smart Spender',
          description: 'Reduced dining expenses by 25% last month',
          date: 'January 28, 2024',
          emoji: '💡'
        }
      ],
      goalsProgress: [
        {
          title: 'Emergency Fund',
          progress: 75,
          currentAmount: 280000,
          targetAmount: 372000,
          targetDate: 'June 2024',
          onTrack: true
        },
        {
          title: 'Dream Home Down Payment',
          progress: 35,
          currentAmount: 700000,
          targetAmount: 2000000,
          targetDate: 'December 2027',
          onTrack: true
        },
        {
          title: 'Retirement Fund',
          progress: 12,
          currentAmount: 575000,
          targetAmount: 5000000,
          targetDate: 'December 2045',
          onTrack: true
        },
        {
          title: 'Children\'s Education',
          progress: 8,
          currentAmount: 150000,
          targetAmount: 2000000,
          targetDate: 'June 2035',
          onTrack: false
        }
      ]
    };
  }
};