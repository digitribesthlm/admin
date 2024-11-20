import DashboardLayout from '../../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditPerson() {
  const router = useRouter();
  const { id } = router.query;

  // Simulated person data - in a real app, this would come from an API
  const [formData, setFormData] = useState({
    // Basic Information
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@acmecorp.com',
    phone: '+46 70 123 4567',
    mobile: '+46 70 987 6543',
    position: 'CEO',
    department: 'Executive',
    
    // Company Information
    company: 'Acme Corp',
    company_id: '12345',
    office_location: 'Stockholm',
    
    // Contact Details
    work_email: 'john.smith@acmecorp.com',
    personal_email: 'john.smith@gmail.com',
    linkedin_profile: 'https://linkedin.com/in/johnsmith',
    twitter_handle: '@johnsmith',
    
    // Address Information
    address: 'Business Street 123',
    city: 'Stockholm',
    postal_code: '12345',
    country: 'Sweden',
    country_code: 'SE',
    
    // Additional Information
    language: 'English',
    timezone: 'Europe/Stockholm',
    preferred_contact_method: 'email',
    
    // Status and Classification
    status: 'active',
    contact_type: 'business',
    lead_source: 'referral',
    account_owner: 'Sarah Johnson',
    
    // Communication Preferences
    subscribe_newsletter: true,
    subscribe_product_updates: true,
    subscribe_events: false,
    
    // Notes
    notes: 'Key decision maker for enterprise deals',
    
    // Tags
    tags: 'VIP, Enterprise, Decision Maker',
    
    // Custom Fields
    custom_fields: {
      industry_focus: 'Technology',
      decision_maker: true,
      budget_authority: true,
      last_meeting: '2024-01-15',
      next_follow_up: '2024-02-01'
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated person data:', formData);
    // In a real app, you would save the changes here
    router.push('/dashboard/crm/people');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('custom_fields.')) {
      const fieldName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        custom_fields: {
          ...prev.custom_fields,
          [fieldName]: type === 'checkbox' ? checked : value
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
          <h1 className="text-3xl font-bold">Edit Contact</h1>
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
                    <span className="label-text">First Name*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Position</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Department</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Work Email*</span>
                  </label>
                  <input
                    type="email"
                    name="work_email"
                    value={formData.work_email}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Personal Email</span>
                  </label>
                  <input
                    type="email"
                    name="personal_email"
                    value={formData.personal_email}
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
                    <span className="label-text">Mobile</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company*</span>
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
                    <span className="label-text">Office Location</span>
                  </label>
                  <input
                    type="text"
                    name="office_location"
                    value={formData.office_location}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Social Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">LinkedIn Profile</span>
                  </label>
                  <input
                    type="url"
                    name="linkedin_profile"
                    value={formData.linkedin_profile}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Twitter Handle</span>
                  </label>
                  <input
                    type="text"
                    name="twitter_handle"
                    value={formData.twitter_handle}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Classification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contact Type</span>
                  </label>
                  <select
                    name="contact_type"
                    value={formData.contact_type}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="business">Business</option>
                    <option value="customer">Customer</option>
                    <option value="partner">Partner</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Lead Source</span>
                  </label>
                  <select
                    name="lead_source"
                    value={formData.lead_source}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="">Select Source</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Notes</h2>
              <div className="form-control">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                  placeholder="Enter any additional notes..."
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
