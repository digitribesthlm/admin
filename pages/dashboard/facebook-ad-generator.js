import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdGenerator from '../../components/FacebookAdGenerator/AdGenerator';

export default function FacebookAdGeneratorPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Facebook Ad Generator</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Generate Facebook Ads</h2>
            <p className="text-gray-600">
              Create engaging Facebook ad copy with hooks and variations. Enter your content or URL below to generate multiple ad options.
            </p>
          </div>
          <AdGenerator />
        </div>
      </div>
    </DashboardLayout>
  );
} 