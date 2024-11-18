export default function RecentTopics() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Topics</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Topic Name {item}</h3>
              <p className="text-sm text-gray-600">Last updated 2 days ago</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
} 