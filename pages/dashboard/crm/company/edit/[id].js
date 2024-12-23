import DashboardLayout from '../../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditCompany() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
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
    if (id) {
      fetchCompanyData();
    }
  }, [id]);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('/api/crm-table');
      const data = await response.json();
      
      if (data.success) {
        const company = data.tableData.find(record => record.id === id);
        if (company) {
          setFormData({
            customer_id: company.customer_id || '',
            name: company.name || '',
            company: company.company || '',
            email: company.email || '',
            gmail: company.gmail || '',
            phone: company.phone || '',
            address: company.address || '',
            country: company.country || '',
            country_code: company.country_code || '',
            homepage: company.homepage || '',
            type: company.type || '',
            status: company.status || '',
            invoice_mail: company.invoice_mail || '',
            gtm_id: company.gtm_id || '',
            ga4_id: company.ga4_id || '',
            google_analytics_id: company.google_analytics_id || '',
            adwords_id: company.adwords_id || '',
            fb_ads_account_id: company.fb_ads_account_id || '',
            fb_account_id: company.fb_account_id || '',
            fb_page_id: company.fb_page_id || '',
            fb_pixel: company.fb_pixel || '',
            linkedin_ads_account_id: company.linkedin_ads_account_id || '',
            linkedin_insight_id: company.linkedin_insight_id || '',
            cron_work: company.cron_work || '',
            cron_work_facebook: company.cron_work_facebook || '',
            cron_work_adwords: company.cron_work_adwords || '',
            cron_work_seo: company.cron_work_seo || '',
            cron_work_twitter: company.cron_work_twitter || '',
            cron_work_linkedin: company.cron_work_linkedin || '',
            cron_work_bing: company.cron_work_bing || '',
            OKR: company.OKR || ''
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading company data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a copy of formData without customer_id
      const { customer_id, ...updateData } = formData;
      
      const response = await fetch('/api/crm-table', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          fields: updateData
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Company updated successfully!');
        router.push('/dashboard/crm/companies');
      } else {
        alert('Failed to update company');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating company');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Edit Company</h1>
          <button onClick={() => router.back()} className="btn btn-outline">
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.customer_id && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Customer ID</span>
                    </label>
                    <input
                      type="text"
                      value={formData.customer_id}
                      className="input input-bordered"
                      disabled
                    />
                  </div>
                )}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Name*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gmail</span>
                  </label>
                  <input
                    type="email"
                    name="gmail"
                    value={formData.gmail}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="b2b">B2B</option>
                    <option value="b2c">B2C</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="active">Active</option>
                    <option value="pause">Pause</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Country Code</span>
                  </label>
                  <input
                    type="text"
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Homepage</span>
                  </label>
                  <input
                    type="url"
                    name="homepage"
                    value={formData.homepage}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Tracking Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">GTM ID</span>
                  </label>
                  <input
                    type="text"
                    name="gtm_id"
                    value={formData.gtm_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">GA4 ID</span>
                  </label>
                  <input
                    type="text"
                    name="ga4_id"
                    value={formData.ga4_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Google Analytics ID</span>
                  </label>
                  <input
                    type="text"
                    name="google_analytics_id"
                    value={formData.google_analytics_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">AdWords ID</span>
                  </label>
                  <input
                    type="text"
                    name="adwords_id"
                    value={formData.adwords_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Social Media Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Facebook Ads Account ID</span>
                  </label>
                  <input
                    type="text"
                    name="fb_ads_account_id"
                    value={formData.fb_ads_account_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Facebook Account ID</span>
                  </label>
                  <input
                    type="text"
                    name="fb_account_id"
                    value={formData.fb_account_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Facebook Page ID</span>
                  </label>
                  <input
                    type="text"
                    name="fb_page_id"
                    value={formData.fb_page_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Facebook Pixel</span>
                  </label>
                  <input
                    type="text"
                    name="fb_pixel"
                    value={formData.fb_pixel}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">LinkedIn Ads Account ID</span>
                  </label>
                  <input
                    type="text"
                    name="linkedin_ads_account_id"
                    value={formData.linkedin_ads_account_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">LinkedIn Insight ID</span>
                  </label>
                  <input
                    type="text"
                    name="linkedin_insight_id"
                    value={formData.linkedin_insight_id}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Integration Status */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Integration Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'General', name: 'cron_work' },
                  { label: 'Facebook', name: 'cron_work_facebook' },
                  { label: 'AdWords', name: 'cron_work_adwords' },
                  { label: 'SEO', name: 'cron_work_seo' },
                  { label: 'Twitter', name: 'cron_work_twitter' },
                  { label: 'LinkedIn', name: 'cron_work_linkedin' },
                  { label: 'Bing', name: 'cron_work_bing' }
                ].map(integration => (
                  <div key={integration.name} className="form-control">
                    <label className="label">
                      <span className="label-text">{integration.label}</span>
                    </label>
                    <select
                      name={integration.name}
                      value={formData[integration.name]}
                      onChange={handleChange}
                      className="select select-bordered"
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="pause">Pause</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* OKR */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">OKR</h2>
              <div className="form-control">
                <textarea
                  name="OKR"
                  value={formData.OKR}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                  placeholder="Enter company OKR..."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.back()} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
