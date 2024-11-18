import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import MailInput from '../../components/MailResponder/MailInput';
import ResponseDisplay from '../../components/MailResponder/ResponseDisplay';

export default function MailResponder() {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/mail-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }
      
      setResponse(data.response);
    } catch (err) {
      console.error('Generation failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      alert('Kopierat till urklipp!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Kunde inte kopiera till urklipp');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Mail Responder</h1>
        <div className="space-y-8">
          <MailInput
            content={content}
            setContent={setContent}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {response && !error && (
            <ResponseDisplay 
              response={response} 
              onCopy={handleCopy}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 