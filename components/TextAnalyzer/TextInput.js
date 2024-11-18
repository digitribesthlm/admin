export default function TextInput({ text, setText, url, setUrl, onAnalyze, isLoading }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Enter URL (optional)
        </label>
        <input
          type="url"
          className="w-full p-2 border rounded-lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Or enter text directly
        </label>
        <textarea
          className="w-full h-64 p-4 border rounded-lg resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          disabled={!!url}
        />
      </div>
      
      <button
        onClick={onAnalyze}
        disabled={isLoading || (!text && !url)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Content'}
      </button>
    </div>
  );
} 