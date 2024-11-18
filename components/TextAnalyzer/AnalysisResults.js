export default function AnalysisResults({ results }) {
  const metrics = [
    {
      name: 'Natural Language Flow',
      score: results.natural_language_flow,
      notes: results.natural_language_flow_notes,
      weight: 0.30
    },
    {
      name: 'Context Coherence',
      score: results.context_coherence,
      notes: results.context_coherence_notes,
      weight: 0.25
    },
    {
      name: 'Stylistic Authenticity',
      score: results.stylistic_authenticity,
      notes: results.stylistic_authenticity_notes,
      weight: 0.20
    },
    {
      name: 'Structural Patterns',
      score: results.structural_patterns,
      notes: results.structural_patterns_notes,
      weight: 0.15
    },
    {
      name: 'Purpose Alignment',
      score: results.purpose_alignment,
      notes: results.purpose_alignment_notes,
      weight: 0.10
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Overall Scores Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Weighted Score</h3>
          <div className="text-3xl font-bold text-blue-600">
            {Math.round(results.weighted_score)}%
          </div>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-900 mb-2">AI Content Score</h3>
          <div className="text-3xl font-bold text-red-600">
            {Math.round(results.total_ai_score)}%
          </div>
          <p className="text-sm text-red-700 mt-1">
            Higher score indicates more AI-like content
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
              <div className="text-xl font-semibold">{Math.round(metric.score)}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${metric.score}%` }}
              ></div>
            </div>
            {metric.notes && (
              <p className="mt-2 text-sm text-gray-600">{metric.notes}</p>
            )}
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