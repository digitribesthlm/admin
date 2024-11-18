import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function PersonasGenerator() {
  const [companyDescription, setCompanyDescription] = useState('');
  const [audienceData, setAudienceData] = useState('');
  const [numPersonas, setNumPersonas] = useState(3);
  const [language, setLanguage] = useState('sv');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);

  const handleGenerate = async () => {
    if (!companyDescription) {
      setError('Company description is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/personas-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyDescription,
          audienceData,
          numPersonas,
          language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate personas');
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
          {/* Language Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="sv">Swedish</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Number of Personas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Personas
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-white"
              value={numPersonas}
              onChange={(e) => setNumPersonas(Number(e.target.value))}
            >
              {[2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} personas
                </option>
              ))}
            </select>
          </div>

          {/* Company Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              className="w-full h-32 p-3 border rounded-lg resize-none"
              placeholder="Describe your company and target market..."
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
            />
          </div>

          {/* Audience Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audience Data (Optional)
            </label>
            <textarea
              className="w-full h-32 p-3 border rounded-lg resize-none"
              placeholder="Add Facebook Audience Insights and Google Review data..."
              value={audienceData}
              onChange={(e) => setAudienceData(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !companyDescription}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate Personas'}
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
              {results.personas.map((persona, index) => (
                <div key={index} className="p-6 border rounded-lg bg-white">
                  <h3 className="text-xl font-semibold mb-4">{persona.name}</h3>
                  
                  {/* Demographics */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Demographics</h4>
                    <dl className="grid grid-cols-2 gap-3">
                      <div>
                        <dt className="text-sm text-gray-500">Age & Gender</dt>
                        <dd>{persona.demographics.ageAndGender}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Location</dt>
                        <dd>{persona.demographics.location}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Interests</dt>
                        <dd>{persona.demographics.interests.join(', ')}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Car</dt>
                        <dd>{persona.demographics.car}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Housing</dt>
                        <dd>{persona.demographics.housing}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Needs */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Needs</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm text-gray-500 mb-1">Wants</h5>
                        <ul className="list-disc list-inside">
                          {persona.needs.wants.map((want, i) => (
                            <li key={i}>{want}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm text-gray-500 mb-1">Wants to Avoid</h5>
                        <ul className="list-disc list-inside">
                          {persona.needs.avoids.map((avoid, i) => (
                            <li key={i}>{avoid}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Communication Angles */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Communication Angles</h4>
                    {persona.communicationAngles.map((angle, i) => (
                      <div key={i} className="mb-4">
                        <h5 className="font-medium mb-2">{angle.angle}</h5>
                        <div className="pl-4 border-l-2 border-gray-200">
                          {angle.customerResponses.map((response, j) => (
                            <p key={j} className="text-sm text-gray-600 mb-2">"{response}"</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(JSON.stringify(persona, null, 2), `persona-${index}`)}
                    className="mt-3 px-4 py-2 text-sm text-blue-500 hover:text-blue-600 flex items-center gap-2"
                  >
                    {copiedSection === `persona-${index}` ? (
                      <>
                        <CheckIcon className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="h-4 w-4" />
                        Copy Persona
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