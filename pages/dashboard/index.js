import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-24 bg-gray-200 rounded-xl"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
  </div>
);

// Dynamically import AI tools section
const AIToolsSection = dynamic(
  () => import('../../components/Dashboard/AIToolsSection'),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
    ),
    ssr: false
  }
);

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-2">Welcome to Your Digital Marketing AI Suite</h1>
            <p className="text-gray-600">Access powerful AI tools designed to enhance your digital marketing strategies.</p>
          </div>

          {/* AI Tools Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">AI Marketing Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Text Analyzer */}
              <Link href="/dashboard/text-analyzer" 
                    className="group block p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-900">Text Analyzer</h3>
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Analyze content for AI detection and authenticity scoring.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">AI Detection</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Content Analysis</span>
                </div>
              </Link>

              {/* Mail Responder */}
              <Link href="/dashboard/mail-responder" 
                    className="group block p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-900">Mail Responder</h3>
                  <span className="text-green-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Generate professional email responses in your personal style.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Email</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Communication</span>
                </div>
              </Link>

              {/* Facebook Ad Generator */}
              <Link href="/dashboard/facebook-ad-generator" 
                    className="group block p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-900">Facebook Ad Generator</h3>
                  <span className="text-purple-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Generate engaging Facebook ad copy with hooks and variations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Social Ads</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Copywriting</span>
                </div>
              </Link>

              {/* Google Ads Generator */}
              <Link href="/dashboard/adwords-generator" 
                    className="group block p-6 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-red-900">Google Ads Generator</h3>
                  <span className="text-red-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Generate complete Google Ads campaigns with extensions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Search Ads</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Copywriting</span>
                </div>
              </Link>

              {/* Personas Generator */}
              <Link href="/dashboard/personas-generator" 
                    className="group block p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-yellow-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-yellow-900">Personas Generator</h3>
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Create detailed marketing personas with communication angles.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Marketing</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Strategy</span>
                </div>
              </Link>

              {/* Future Tool: SEO Optimizer */}
              <div className="group block p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 opacity-75">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-orange-900">SEO Optimizer</h3>
                  <span className="text-orange-500">Coming Soon</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Optimize content for search engines and improve rankings.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">SEO</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Optimization</span>
                </div>
              </div>

              {/* Future Tool: Analytics Interpreter */}
              <div className="group block p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 opacity-75">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-indigo-900">Analytics Interpreter</h3>
                  <span className="text-indigo-500">Coming Soon</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Get AI-powered insights from your marketing analytics data.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Analytics</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </DashboardLayout>
  );
} 