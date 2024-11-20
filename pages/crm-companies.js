import { useState, useEffect } from 'react';

export default function CRMCompanies() {
  const [tableData, setTableData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    customer_id: '',
    name: '',
    company: '',
    email: '',
    gmail: '',
    phone: '',
    address: '',
    country: '',
    country_code: '',
    homepage: '',
    type: '',
    status: '',
    invoice_mail: '',
    gtm_id: '',
    ga4_id: '',
    google_analytics_id: '',
    adwords_id: '',
    fb_ads_account_id: '',
    fb_account_id: '',
    fb_page_id: '',
    fb_pixel: '',
    linkedin_ads_account_id: '',
    linkedin_insight_id: '',
    cron_work: '',
    cron_work_facebook: '',
    cron_work_adwords: '',
    cron_work_seo: '',
    cron_work_twitter: '',
    cron_work_linkedin: '',
    cron_work_bing: '',
    OKR: ''
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch('/api/crm-table');
      const data = await response.json();
      
      if (data.success) {
        setTableData(data.tableData);
      } else {
        alert('Failed to fetch records');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching records');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/crm-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: newRecord
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        setTableData(data.tableData);
        setIsCreateModalOpen(false);
        setNewRecord({
          customer_id: '',
          name: '',
          company: '',
          email: '',
          gmail: '',
          phone: '',
          address: '',
          country: '',
          country_code: '',
          homepage: '',
          type: '',
          status: '',
          invoice_mail: '',
          gtm_id: '',
          ga4_id: '',
          google_analytics_id: '',
          adwords_id: '',
          fb_ads_account_id: '',
          fb_account_id: '',
          fb_page_id: '',
          fb_pixel: '',
          linkedin_ads_account_id: '',
          linkedin_insight_id: '',
          cron_work: '',
          cron_work_facebook: '',
          cron_work_adwords: '',
          cron_work_seo: '',
          cron_work_twitter: '',
          cron_work_linkedin: '',
          cron_work_bing: '',
          OKR: ''
        });
        alert('Company created successfully!');
      } else {
        alert('Failed to create company');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating company');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this company?')) {
      try {
        const response = await fetch('/api/crm-table', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        
        if (data.success) {
          setTableData(data.tableData);
          alert('Company deleted successfully!');
        } else {
          alert('Failed to delete company');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting company');
      }
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/crm-table', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingRecord.id,
          fields: editingRecord
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        setTableData(data.tableData);
        setIsEditModalOpen(false);
        setEditingRecord(null);
        alert('Company updated successfully!');
      } else {
        alert('Failed to update company');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating company');
    }
  };

  const FormFields = ({ data, setData, isEdit = false }) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 text-lg font-semibold mb-2">Basic Information</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Customer ID</label>
          <input
            type="text"
            value={data.customer_id || ''}
            onChange={(e) => setData({...data, customer_id: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => setData({...data, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            value={data.company || ''}
            onChange={(e) => setData({...data, company: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => setData({...data, email: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gmail</label>
          <input
            type="email"
            value={data.gmail || ''}
            onChange={(e) => setData({...data, gmail: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            value={data.phone || ''}
            onChange={(e) => setData({...data, phone: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => setData({...data, address: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={data.country || ''}
            onChange={(e) => setData({...data, country: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country Code</label>
          <input
            type="text"
            value={data.country_code || ''}
            onChange={(e) => setData({...data, country_code: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Homepage</label>
          <input
            type="url"
            value={data.homepage || ''}
            onChange={(e) => setData({...data, homepage: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2 text-lg font-semibold mb-2 mt-4">Analytics & Tracking</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">GTM ID</label>
          <input
            type="text"
            value={data.gtm_id || ''}
            onChange={(e) => setData({...data, gtm_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">GA4 ID</label>
          <input
            type="text"
            value={data.ga4_id || ''}
            onChange={(e) => setData({...data, ga4_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Google Analytics ID</label>
          <input
            type="text"
            value={data.google_analytics_id || ''}
            onChange={(e) => setData({...data, google_analytics_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">AdWords ID</label>
          <input
            type="text"
            value={data.adwords_id || ''}
            onChange={(e) => setData({...data, adwords_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2 text-lg font-semibold mb-2 mt-4">Social Media</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">FB Ads Account ID</label>
          <input
            type="text"
            value={data.fb_ads_account_id || ''}
            onChange={(e) => setData({...data, fb_ads_account_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">FB Account ID</label>
          <input
            type="text"
            value={data.fb_account_id || ''}
            onChange={(e) => setData({...data, fb_account_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">FB Page ID</label>
          <input
            type="text"
            value={data.fb_page_id || ''}
            onChange={(e) => setData({...data, fb_page_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">FB Pixel</label>
          <input
            type="text"
            value={data.fb_pixel || ''}
            onChange={(e) => setData({...data, fb_pixel: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">LinkedIn Ads Account ID</label>
          <input
            type="text"
            value={data.linkedin_ads_account_id || ''}
            onChange={(e) => setData({...data, linkedin_ads_account_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">LinkedIn Insight ID</label>
          <input
            type="text"
            value={data.linkedin_insight_id || ''}
            onChange={(e) => setData({...data, linkedin_insight_id: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2 text-lg font-semibold mb-2 mt-4">Status & Settings</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={data.type || ''}
            onChange={(e) => setData({...data, type: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="b2b">B2B</option>
            <option value="b2c">B2C</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={data.status || ''}
            onChange={(e) => setData({...data, status: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="pause">Pause</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Invoice Email</label>
          <input
            type="email"
            value={data.invoice_mail || ''}
            onChange={(e) => setData({...data, invoice_mail: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2 text-lg font-semibold mb-2 mt-4">Cron Settings</div>
        {['cron_work', 'cron_work_facebook', 'cron_work_adwords', 'cron_work_seo', 
          'cron_work_twitter', 'cron_work_linkedin', 'cron_work_bing'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <select
              value={data[field] || ''}
              onChange={(e) => setData({...data, [field]: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="pause">Pause</option>
            </select>
          </div>
        ))}

        <div className="col-span-2 mb-4">
          <label className="block text-sm font-medium mb-1">OKR</label>
          <textarea
            value={data.OKR || ''}
            onChange={(e) => setData({...data, OKR: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">CRM Companies</h1>
        
        <div className="space-x-4 mb-8">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            New Company
          </button>
          
          <button
            onClick={handleFetch}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh List
          </button>
        </div>

        {tableData.length > 0 && (
          <div className="mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">ID</th>
                    <th className="px-4 py-2 border-b">Company</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Country</th>
                    <th className="px-4 py-2 border-b">Type</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((record) => (
                    <tr key={record.id}>
                      <td className="px-4 py-2 border-b">{record.customer_id || '-'}</td>
                      <td className="px-4 py-2 border-b">{record.company || '-'}</td>
                      <td className="px-4 py-2 border-b">{record.email || '-'}</td>
                      <td className="px-4 py-2 border-b">{record.country || '-'}</td>
                      <td className="px-4 py-2 border-b">{record.type || '-'}</td>
                      <td className="px-4 py-2 border-b">{record.status || '-'}</td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={() => handleEdit(record)}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-full m-4">
              <h2 className="text-xl font-bold mb-4">Create New Company</h2>
              <form onSubmit={handleCreate}>
                <FormFields data={newRecord} setData={setNewRecord} />
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-full m-4">
              <h2 className="text-xl font-bold mb-4">Edit Company</h2>
              <form onSubmit={handleUpdate}>
                <FormFields data={editingRecord} setData={setEditingRecord} isEdit={true} />
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingRecord(null);
                    }}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
