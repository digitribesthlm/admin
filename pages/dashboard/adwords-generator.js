import DashboardLayout from '../../components/DashboardLayout';
import AdwordsGenerator from '../../components/AdwordsGenerator/AdGenerator';
import Link from 'next/link';

export default function AdwordsGeneratorPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Google Ads Generator</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Generate Google Ads</h2>
            <p className="text-gray-600">
              Create comprehensive Google Ads content including headlines, descriptions, sitelinks, and callout extensions.
            </p>
          </div>
          <AdwordsGenerator />
        </div>
      </div>
    </DashboardLayout>
  );
} 