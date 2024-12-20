import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, UserGroupIcon, ChartBarIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function CRMStats() {
  const [stats, setStats] = useState({
    monthlyRecurringRevenue: 0,
    totalPipelineValue: 0,
    weightedValue: 0,
    totalOpportunities: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/opportunities');
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        const data = await response.json();
        const opportunities = data.records || [];

        const stats = opportunities.reduce((acc, opp) => {
          // potentialValue is now per month
          const monthlyValue = parseFloat(opp.fields.potentialValue) || 0;
          const probability = parseFloat(opp.fields.probability) || 0;
          const duration = parseFloat(opp.fields.contractDuration) || 1;

          // Total value is monthly × duration
          const totalValue = monthlyValue * duration;
          
          // Expected value is monthly × duration × probability
          const expectedValue = monthlyValue * duration * (probability / 100);

          return {
            monthlyRecurringRevenue: acc.monthlyRecurringRevenue + monthlyValue,
            totalPipelineValue: acc.totalPipelineValue + totalValue,
            weightedValue: acc.weightedValue + expectedValue
          };
        }, {
          monthlyRecurringRevenue: 0,
          totalPipelineValue: 0,
          weightedValue: 0
        });
        
        setStats({
          ...stats,
          totalOpportunities: opportunities.length
        });
      } catch (error) {
        console.error('Error fetching CRM stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Monthly Recurring Revenue',
      value: `${Math.round(stats.monthlyRecurringRevenue).toLocaleString('sv-SE')} kr`,
      icon: CurrencyDollarIcon,
      color: 'blue',
      subtitle: 'Monthly value across deals'
    },
    {
      title: 'Total Pipeline Value',
      value: `${Math.round(stats.totalPipelineValue).toLocaleString('sv-SE')} kr`,
      icon: ChartBarIcon,
      color: 'green',
      subtitle: 'Monthly × Contract Duration'
    },
    {
      title: 'Expected Pipeline Value',
      value: `${Math.round(stats.weightedValue).toLocaleString('sv-SE')} kr`,
      icon: ScaleIcon,
      color: 'yellow',
      subtitle: 'Monthly × Months × Probability'
    },
    {
      title: 'Opportunities',
      value: stats.totalOpportunities,
      icon: UserGroupIcon,
      color: 'purple',
      subtitle: 'Number of deals'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-br from-${stat.color}-50 to-white p-6 rounded-xl border border-${stat.color}-100 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
          </div>
          {stat.subtitle && (
            <p className="text-sm text-gray-500">{stat.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
