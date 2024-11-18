export default function AnalysisResults({ results }) {
  if (!results) return null;

  const metrics = [
    { name: 'Natural Language Flow', weight: 0.30, key: 'natural_language_flow' },
    { name: 'Context Coherence', weight: 0.25, key: 'context_coherence' },
    { name: 'Stylistic Authenticity', weight: 0.20, key: 'stylistic_authenticity' },
    { name: 'Structural Patterns', weight: 0.15, key: 'structural_patterns' },
    { name: 'Purpose Alignment', weight: 0.10, key: 'purpose_alignment' }
  ];

  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <div key={metric.name} className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{metric.name}</h3>
            <span className="text-lg font-semibold">
              {results[metric.key]}%
            </span>
          </div>
          <div className="mt-2">
            <div className="bg-gray-200 h-4 rounded-full">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${results[metric.key]}%` }}
              />
            </div>
            <p className="mt-2 text-gray-700">
              {results[`${metric.key}_notes`]}
            </p>
          </div>
        </div>
      ))}
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg">Final Analysis</h3>
        <div className="mt-4 space-y-2">
          <p className="font-semibold">
            Weighted Score: {results.weighted_score?.toFixed(2) || 'N/A'}%
          </p>
          <p className="font-semibold">
            Confidence Level: {results.confidence_level}%
          </p>
          <p className="mt-4">{results.final_analysis}</p>
        </div>
      </div>
    </div>
  );
} 