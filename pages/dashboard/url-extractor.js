import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function URLExtractor() {
  const [htmlInput, setHtmlInput] = useState('');
  const [extractedUrls, setExtractedUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractUrls = () => {
    setLoading(true);
    try {
      // Create a temporary DOM element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      
      // Get all elements with href or src attributes
      const links = [...doc.querySelectorAll('[href], [src]')];
      
      // Extract and clean URLs
      const urls = links
        .map(link => link.href || link.src)
        .filter(url => url && !url.startsWith('about:blank'))
        .filter(url => url.startsWith('http') || url.startsWith('https'))
        .filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates
      
      setExtractedUrls(urls);
    } catch (error) {
      console.error('Error extracting URLs:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllUrls = () => {
    const urlsText = extractedUrls.join('\n');
    navigator.clipboard.writeText(urlsText);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">URL Extractor</h1>
          <p className="text-gray-600">
            Paste your HTML content below to extract all URLs.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HTML Content
            </label>
            <textarea
              className="w-full h-48 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste your HTML content here..."
            />
          </div>
          <button
            onClick={extractUrls}
            disabled={loading || !htmlInput}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium
              ${loading || !htmlInput 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Extracting...' : 'Extract URLs'}
          </button>
        </div>

        {/* Results Section */}
        {extractedUrls.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Extracted URLs ({extractedUrls.length})
              </h2>
              <button
                onClick={copyAllUrls}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg"
              >
                Copy All
              </button>
            </div>
            <div className="space-y-2">
              {extractedUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 truncate"
                  >
                    {url}
                  </a>
                  <button
                    onClick={() => copyToClipboard(url)}
                    className="ml-2 p-2 text-gray-600 hover:text-gray-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}