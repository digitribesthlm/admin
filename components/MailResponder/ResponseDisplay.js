export default function ResponseDisplay({ response, onCopy }) {
  return response ? (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Genererat svar:</h3>
      <div className="p-4 bg-white border rounded-lg">
        <p className="whitespace-pre-wrap">{response}</p>
      </div>
      <button
        onClick={onCopy}
        className="px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Kopiera till urklipp
      </button>
    </div>
  ) : null;
} 