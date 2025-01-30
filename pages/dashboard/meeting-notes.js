import { useState } from 'react';

export default function MeetingNotes() {
  const [company, setCompany] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleMakeSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Starting submission process...');

    if (!process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL) {
      setStatusMessage('Error: Make.com webhook URL is not configured');
      setSuccessMessage('Configuration error - please contact support');
      return;
    }

    const payload = {
      company,
      meeting_notes: meetingNotes,
      homepage: meetingNotes,
    };

    const url = `${process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL}`;
    setStatusMessage('Preparing to send data to Make.com...');

    try {
      setStatusMessage('Connecting to Make.com...');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      setStatusMessage(`Server responded with status: ${response.status}`);

      if (response.ok) {
        const responseData = await response.text();
        setStatusMessage('Successfully received response from Make.com');
        setSuccessMessage('Meeting notes submitted successfully!');
        setCompany('');
        setMeetingNotes('');
      } else {
        const errorText = await response.text();
        setStatusMessage(`Error response from server: ${errorText}`);
        setSuccessMessage('Failed to submit meeting notes. Please check the status message below.');
      }
    } catch (error) {
      console.error('Error submitting meeting notes:', error);
      setStatusMessage(`Connection error: ${error.message}`);
      setSuccessMessage('An error occurred while submitting meeting notes.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Meeting Notes</h1>
      <form onSubmit={handleMakeSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Meeting Notes</label>
          <textarea
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="5"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Submit to Make.com
        </button>
        {successMessage && (
          <div className="mt-4 p-4 rounded-md bg-blue-50 text-blue-700">
            {successMessage}
          </div>
        )}
        {statusMessage && (
          <div className="mt-4 p-4 rounded-md bg-gray-50 text-gray-700">
            <h3 className="font-medium">Status:</h3>
            <p>{statusMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}