import { useState } from 'react';

export default function MeetingNotes() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Meeting Title:', title);
    console.log('Meeting Date:', date);
    console.log('Meeting Notes:', notes);
  };

  const [company, setCompany] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleMakeSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company,
      meeting_notes: meetingNotes,
      homepage: meetingNotes, // Set homepage to meeting_notes value
    };

    const queryParams = new URLSearchParams(payload).toString();
    const url = `${process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL}?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        setSuccessMessage('Meeting notes submitted successfully!');
        setCompany('');
        setMeetingNotes('');
      } else {
        setSuccessMessage('Failed to submit meeting notes.');
      }
    } catch (error) {
      console.error('Error submitting meeting notes:', error);
      setSuccessMessage('An error occurred while submitting meeting notes.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Meeting Notes</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Meeting Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Meeting Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="5"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Notes
        </button>
      </form>
      <h1 className="text-2xl font-bold mb-4 mt-8">Submit Meeting Notes to Make.com</h1>
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
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Send to Make.com
        </button>
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}