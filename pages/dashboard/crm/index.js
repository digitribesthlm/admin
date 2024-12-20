import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

const CRMStats = dynamic(
  () => import('../../../components/Dashboard/CRMStats'),
  {
    loading: () => (
      <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
    ),
    ssr: false
  }
);

export default function CRMDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Sales Pipeline</h1>
          <Link 
            href="/dashboard/crm/add-opportunity"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Opportunity
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Pipeline Overview</h2>
          <CRMStats />
        </div>
      </div>
    </DashboardLayout>
  );
}
