export default function MailInput({ content, setContent, onGenerate, isLoading }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Skriv ditt meddelande
        </label>
        <textarea
          className="w-full h-48 p-4 border rounded-lg resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Skriv eller klistra in innehållet som ska omformuleras..."
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !content}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? 'Genererar...' : 'Generera svar'}
      </button>
    </div>
  );
} 