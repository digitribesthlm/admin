import Link from 'next/link';

export default function AIToolsSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Text Analyzer Card */}
        <Link href="/dashboard/text-analyzer" 
              className="group block p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Text Analyzer</h3>
            <span className="text-blue-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Analyze text for AI vs human characteristics with detailed metrics and scoring.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">AI Detection</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Content Analysis</span>
          </div>
        </Link>

        {/* Mail Responder Card */}
        <Link href="/dashboard/mail-responder" 
              className="group block p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-900">Mail Responder</h3>
            <span className="text-green-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Generera mailsvar med din personliga ton och stil.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">AI Writing</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Email</span>
          </div>
        </Link>

        {/* Placeholder for future tools */}
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-400 mb-4">More Tools Coming Soon</h3>
          <p className="text-gray-500 text-sm">Stay tuned for additional AI-powered tools and features.</p>
        </div>
      </div>
    </div>
  );
} 