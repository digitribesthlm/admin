import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function CRMStats() {
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    totalValue: 0,
    averageValue: 0
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

        const totalValue = opportunities.reduce((sum, opp) => {
          const value = opp.fields?.potentialValue;
          return sum + (parseFloat(value) || 0);
        }, 0);
        
        setStats({
          totalOpportunities: opportunities.length,
          totalValue: totalValue,
          averageValue: opportunities.length ? totalValue / opportunities.length : 0
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Opportunities',
      value: stats.totalOpportunities,
      icon: UserGroupIcon,
      color: 'blue'
    },
    {
      title: 'Pipeline Value',
      value: `${stats.totalValue.toLocaleString('sv-SE')} kr`,
      icon: CurrencyDollarIcon,
      color: 'green'
    },
    {
      title: 'Average Deal Size',
      value: `${Math.round(stats.averageValue).toLocaleString('sv-SE')} kr`,
      icon: ChartBarIcon,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-br from-${stat.color}-50 to-white p-6 rounded-xl border border-${stat.color}-100 shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
