import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    type: 'service', // service or package
    category: '', // SEO, PPC, Social, etc.
    description: '',
    status: 'active',
    
    // Pricing Information
    price: '',
    billing_cycle: 'monthly',
    setup_fee: '',
    minimum_term: '3',
    
    // Service Details
    service_level: 'standard', // basic, standard, premium
    delivery_time: '',
    included_hours: '',
    
    // Features and Deliverables
    features: '',
    deliverables: '',
    reporting_frequency: 'monthly',
    
    // Platform Specific (if applicable)
    platforms: {
      google_ads: false,
      facebook_ads: false,
      linkedin_ads: false,
      twitter_ads: false,
      seo: false,
      analytics: false
    },
    
    // Requirements
    technical_requirements: '',
    access_requirements: '',
    
    // Additional Information
    target_audience: '',
    ideal_customer_profile: '',
    usp: '', // Unique Selling Proposition
    
    // Internal Information
    internal_cost: '',
    profit_margin: '',
    team_resources: '',
    
    // Custom Fields
    custom_fields: {
      kpi_targets: '',
      success_metrics: '',
      integration_requirements: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    router.push('/dashboard/crm/products');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('platforms.')) {
      const platform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        platforms: {
          ...prev.platforms,
          [platform]: checked
        }
      }));
    } else if (name.startsWith('custom_fields.')) {
      const fieldName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        custom_fields: {
          ...prev.custom_fields,
          [fieldName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Add New Product/Service</h1>
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product/Service Name*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="service">Service</option>
                    <option value="package">Package</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="seo">SEO</option>
                    <option value="ppc">PPC</option>
                    <option value="social">Social Media</option>
                    <option value="analytics">Analytics & Tracking</option>
                    <option value="integrated">Integrated Campaign</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Level</span>
                  </label>
                  <select
                    name="service_level"
                    value={formData.service_level}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Description*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Pricing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Billing Cycle</span>
                  </label>
                  <select
                    name="billing_cycle"
                    value={formData.billing_cycle}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                    <option value="project">Project-based</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Setup Fee</span>
                  </label>
                  <input
                    type="number"
                    name="setup_fee"
                    value={formData.setup_fee}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Minimum Term (months)</span>
                  </label>
                  <input
                    type="number"
                    name="minimum_term"
                    value={formData.minimum_term}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Platforms</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Google Ads</span>
                    <input
                      type="checkbox"
                      name="platforms.google_ads"
                      checked={formData.platforms.google_ads}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Facebook Ads</span>
                    <input
                      type="checkbox"
                      name="platforms.facebook_ads"
                      checked={formData.platforms.facebook_ads}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">LinkedIn Ads</span>
                    <input
                      type="checkbox"
                      name="platforms.linkedin_ads"
                      checked={formData.platforms.linkedin_ads}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Twitter Ads</span>
                    <input
                      type="checkbox"
                      name="platforms.twitter_ads"
                      checked={formData.platforms.twitter_ads}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">SEO</span>
                    <input
                      type="checkbox"
                      name="platforms.seo"
                      checked={formData.platforms.seo}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Analytics</span>
                    <input
                      type="checkbox"
                      name="platforms.analytics"
                      checked={formData.platforms.analytics}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Service Details</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Features & Inclusions*</span>
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24"
                    placeholder="List the key features and what's included..."
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Deliverables*</span>
                  </label>
                  <textarea
                    name="deliverables"
                    value={formData.deliverables}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24"
                    placeholder="Specify the deliverables..."
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">KPI Targets</span>
                  </label>
                  <textarea
                    name="custom_fields.kpi_targets"
                    value={formData.custom_fields.kpi_targets}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24"
                    placeholder="Define the KPI targets..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.back()} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
