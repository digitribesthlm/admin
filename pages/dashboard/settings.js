import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Cog6ToothIcon, UserIcon, BellIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using your example data structure
  const [userData, setUserData] = useState({
    email: "patrik@makeablesthlm.se",
    role: "client",
    domain: "climberbi.co.uk",
    created_at: new Date("2024-03-01").toLocaleDateString(), // Example date
    notifications: {
      emailNotifications: true,
      weeklyDigest: true,
      marketingUpdates: true,
    },
    apiKeys: {
      openai: 'sk-...XXXX',
      google: 'AIza...XXXX',
      facebook: 'EAAd...XXXX'
    }
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Here you would typically save to your database
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'api', name: 'API Keys', icon: KeyIcon },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Cog6ToothIcon className="h-8 w-8" />
              Settings
            </h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm">
          {activeTab === 'profile' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={userData.email}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domain
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={userData.domain}
                    onChange={(e) => setUserData({
                      ...userData,
                      domain: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={userData.role}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={userData.created_at}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {Object.entries(userData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value}
                        onChange={(e) => setUserData({
                          ...userData,
                          notifications: {
                            ...userData.notifications,
                            [key]: e.target.checked
                          }
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {Object.entries(userData.apiKeys).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {key.toUpperCase()} API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        className="flex-1 p-3 border rounded-lg bg-gray-50"
                        value={value}
                        readOnly
                      />
                      <button
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg"
                        onClick={() => {/* Add update key logic */}}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="p-6 border-t">
            <div className="flex items-center justify-end gap-4">
              {saved && (
                <span className="text-green-600 text-sm">Settings saved successfully!</span>
              )}
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 