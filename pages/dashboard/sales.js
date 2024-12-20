import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import Link from 'next/link'

const SalesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Prospecting Box */}
          <Link href="/dashboard/sales/prospecting" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Prospecting</h2>
              <p className="text-gray-600">Manage and track potential customers in your sales pipeline.</p>
              <div className="mt-4 text-sm text-blue-500">View prospecting →</div>
            </div>
          </Link>

          {/* Leads Box */}
          <Link href="/dashboard/sales/leads" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Leads</h2>
              <p className="text-gray-600">Track and manage qualified leads and opportunities.</p>
              <div className="mt-4 text-sm text-blue-500">View leads →</div>
            </div>
          </Link>

          {/* Sales Box */}
          <Link href="/dashboard/sales/closed" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Closed Sales</h2>
              <p className="text-gray-600">Monitor and analyze your closed deals and revenue.</p>
              <div className="mt-4 text-sm text-blue-500">View sales →</div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SalesPage 