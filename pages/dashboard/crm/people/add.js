import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPerson() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Basic Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobile: '',
    position: '',
    department: '',
    
    // Company Information
    company: '',
    company_id: '',
    office_location: '',
    
    // Contact Details
    work_email: '',
    personal_email: '',
    linkedin_profile: '',
    twitter_handle: '',
    
    // Address Information
    address: '',
    city: '',
    postal_code: '',
    country: '',
    country_code: '',
    
    // Additional Information
    language: '',
    timezone: '',
    preferred_contact_method: 'email',
    
    // Status and Classification
    status: 'active',
    contact_type: 'business',
    lead_source: '',
    account_owner: '',
    
    // Communication Preferences
    subscribe_newsletter: false,
    subscribe_product_updates: false,
    subscribe_events: false,
    
    // Notes
    notes: '',
    
    // Tags
    tags: '',
    
    // Custom Fields
    custom_fields: {
      industry_focus: '',
      decision_maker: false,
      budget_authority: false,
      last_meeting: '',
      next_follow_up: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Redirect back to people list
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
          <h1 className="text-3xl font-bold">Add New Contact</h1>
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

          {/* Communication Preferences */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl">Communication Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Newsletter</span>
                    <input
                      type="checkbox"
                      name="subscribe_newsletter"
                      checked={formData.subscribe_newsletter}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Product Updates</span>
                    <input
                      type="checkbox"
                      name="subscribe_product_updates"
                      checked={formData.subscribe_product_updates}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Events</span>
                    <input
                      type="checkbox"
                      name="subscribe_events"
                      checked={formData.subscribe_events}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
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
              Create Contact
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
