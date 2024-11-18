import DashboardLayout from '../../components/DashboardLayout';
import PersonasGenerator from '../../components/PersonasGenerator/Generator';

export default function PersonasGeneratorPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Marketing Personas Generator</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Generate Marketing Personas</h2>
            <p className="text-gray-600">
              Create detailed marketing personas with demographics, needs, communication angles, and ad copy suggestions.
            </p>
          </div>
          <PersonasGenerator />
        </div>
      </div>
    </DashboardLayout>
  );
} 