import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

// Ad type configurations
const AD_TYPES = {
  'search': {
    name: 'Search Ads',
    limits: {
      headlines: { max: 30, count: 3 },
      descriptions: { max: 90, count: 2 }
    }
  },
  'performance-max': {
    name: 'Performance Max',
    limits: {
      headlines: { max: 30, count: 5 },
      descriptions: { max: 90, count: 5 }
    }
  },
  'display': {
    name: 'Display Ads',
    limits: {
      headlines: { max: 25, count: 5 },
      descriptions: { max: 90, count: 1 }
    }
  },
  'responsive-search': {
    name: 'Responsive Search Ads',
    limits: {
      headlines: { max: 30, count: 15 },
      descriptions: { max: 90, count: 4 }
    }
  }
};

export default function AdwordsGenerator() {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [numAds, setNumAds] = useState(3);
  const [adType, setAdType] = useState('search');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);

  const handleGenerate = async () => {
    if (!content && !url) {
      setError('Please provide either content or a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/adwords-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content, 
          url, 
          numAds,
          adType,
          limits: AD_TYPES[adType].limits
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate ads');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Ad Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ad Type
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-white"
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
            >
              {Object.entries(AD_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {`Headlines: ${AD_TYPES[adType].limits.headlines.count} (max ${AD_TYPES[adType].limits.headlines.max} chars) | 
                Descriptions: ${AD_TYPES[adType].limits.descriptions.count} (max ${AD_TYPES[adType].limits.descriptions.max} chars)`}
            </p>
          </div>

          {/* Number of Ads Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Ad Variations
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-white"
              value={numAds}
              onChange={(e) => setNumAds(Number(e.target.value))}
            >
              {[3, 5, 7, 10, 15].map((num) => (
                <option key={num} value={num}>
                  {num} variations
                </option>
              ))}
            </select>
          </div>

          {/* Existing URL input */}
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

          {/* Existing content textarea */}
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
          
          {results && (
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
              {/* Regular Ads */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Ads</h3>
                {results.ads.map((ad, index) => (
                  <div key={`ad-${index}`} className="p-4 border rounded-lg bg-white">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Headlines</span>
                        {ad.headlines.map((headline, i) => (
                          <p key={i} className="font-medium">{headline}</p>
                        ))}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Descriptions</span>
                        {ad.descriptions.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(
                        `Headlines:\n${ad.headlines.join('\n')}\n\nDescriptions:\n${ad.descriptions.join('\n')}`,
                        `ad-${index}`
                      )}
                      className="mt-3 px-4 py-2 text-sm text-blue-500 hover:text-blue-600 flex items-center gap-2"
                    >
                      {copiedSection === `ad-${index}` ? (
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

              {/* Sitelinks */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sitelinks</h3>
                {results.sitelinks.map((sitelink, index) => (
                  <div key={`sitelink-${index}`} className="p-4 border rounded-lg bg-white">
                    <div className="space-y-2">
                      <p className="font-medium">
                        {sitelink.headline} ({sitelink.characterCounts.headline})
                      </p>
                      {sitelink.descriptions.map((desc, i) => (
                        <p key={i}>
                          {desc} ({sitelink.characterCounts[`desc${i+1}`]})
                        </p>
                      ))}
                    </div>
                    <button
                      onClick={() => handleCopy(
                        `Headline: ${sitelink.headline}\nDescriptions:\n${sitelink.descriptions.join('\n')}`,
                        `sitelink-${index}`
                      )}
                      className="mt-3 px-4 py-2 text-sm text-blue-500 hover:text-blue-600 flex items-center gap-2"
                    >
                      {copiedSection === `sitelink-${index}` ? (
                        <>
                          <CheckIcon className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardIcon className="h-4 w-4" />
                          Copy Sitelink
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Callouts */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Callout Extensions</h3>
                <div className="p-4 border rounded-lg bg-white">
                  <div className="space-y-2">
                    {results.callouts.map((callout, index) => (
                      <p key={index}>{callout}</p>
                    ))}
                  </div>
                  <button
                    onClick={() => handleCopy(
                      results.callouts.join('\n'),
                      'callouts'
                    )}
                    className="mt-3 px-4 py-2 text-sm text-blue-500 hover:text-blue-600 flex items-center gap-2"
                  >
                    {copiedSection === 'callouts' ? (
                      <>
                        <CheckIcon className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="h-4 w-4" />
                        Copy Callouts
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 