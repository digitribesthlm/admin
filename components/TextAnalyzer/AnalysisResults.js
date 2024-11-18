export default function AnalysisResults({ results }) {
  const characteristics = results.textual_characteristics;
  const summary = results.analysis_summary;

  const metrics = [
    {
      name: 'Natural Language Flow',
      data: characteristics.natural_language_flow,
      weight: 0.20
    },
    {
      name: 'Context Coherence',
      data: characteristics.context_coherence,
      weight: 0.25
    },
    {
      name: 'Stylistic Authenticity',
      data: characteristics.stylistic_authenticity,
      weight: 0.20
    },
    {
      name: 'Structural Patterns',
      data: characteristics.structural_patterns,
      weight: 0.25
    },
    {
      name: 'Purpose Alignment',
      data: characteristics.purpose_alignment,
      weight: 0.10
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Overall Scores Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Human Content Score</h3>
          <div className="text-3xl font-bold text-green-600">
            {Math.round(summary.weighted_score)}%
          </div>
          <p className="text-sm text-green-700 mt-1">
            Higher score indicates more human-like content
          </p>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-900 mb-2">AI Detection Score</h3>
          <div className="text-3xl font-bold text-red-600">
            {Math.round(results.ai_probability)}%
          </div>
          <p className="text-sm text-red-700 mt-1">
            Higher score suggests AI-generated content
          </p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="border-b pb-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">{metric.name}</h3>
                <p className="text-sm text-gray-500">Weight: {metric.weight * 100}%</p>
              </div>
              <div className="text-xl font-semibold">{Math.round(metric.data)}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${metric.data}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Analysis */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Final Analysis</h3>
        <p className="text-gray-700">{results.final_analysis}</p>
        <div className="mt-2 text-sm text-gray-500">
          Confidence Level: {Math.round(results.confidence_level)}%
        </div>
      </div>
    </div>
  );
} 