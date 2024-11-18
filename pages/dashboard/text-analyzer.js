import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TextInput from '../../components/TextAnalyzer/TextInput';
import AnalysisResults from '../../components/TextAnalyzer/AnalysisResults';

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending analysis request...');
      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, url }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze content');
      }
      
      console.log('Analysis results:', data);
      setResults(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">AI Text Analyzer</h1>
        <div className="space-y-8">
          <TextInput
            text={text}
            setText={setText}
            url={url}
            setUrl={setUrl}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {isLoading && (
            <div className="text-center p-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">Analyzing content...</p>
            </div>
          )}
          
          {results && !error && <AnalysisResults results={results} />}
        </div>
      </div>
    </DashboardLayout>
  );
} 