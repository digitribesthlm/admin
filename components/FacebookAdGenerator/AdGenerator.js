import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function AdGenerator() {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [numAds, setNumAds] = useState(5);
  const [ads, setAds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = async () => {
    if (!content && !url) {
      setError('Please provide either content or a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/facebook-ad-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, url, numAds }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate ads');
      }

      setAds(data.ads);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (ad, index) => {
    const textToCopy = `Headline: ${ad.headline}\n\nPrimary Text: ${ad.primary_text}\n\nDescription: ${ad.description}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Ads to Generate
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-white"
              value={numAds}
              onChange={(e) => setNumAds(Number(e.target.value))}
            >
              {[3, 5, 7, 10, 15].map((num) => (
                <option key={num} value={num}>
                  {num} ads
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL (optional)
            </label>
            <input
              type="url"
              className="w-full p-3 border rounded-lg"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter content directly
            </label>
            <textarea
              className="w-full h-40 p-3 border rounded-lg resize-none"
              placeholder="Enter the content you want to promote..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || (!content && !url)}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate Ads'}
          </button>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {ads && (
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {ads.map((ad, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Headline</span>
                      <p className="font-semibold">
                        {ad.emojis.headline} {ad.headline}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Primary Text</span>
                      <p>
                        {ad.emojis.primary} {ad.primary_text}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Description</span>
                      <p>
                        {ad.emojis.description} {ad.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(ad, index)}
                    className="mt-3 px-4 py-2 text-sm text-blue-500 hover:text-blue-600 flex items-center gap-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <CheckIcon className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="h-4 w-4" />
                        Copy Ad
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 