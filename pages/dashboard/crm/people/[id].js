import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PersonDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Simulated person data - in a real app, this would come from an API
  const person = {
    id: id,
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
    tags: ['VIP', 'Enterprise', 'Decision Maker'],
    
    // Custom Fields
    custom_fields: {
      industry_focus: 'Technology',
      decision_maker: true,
      budget_authority: true,
      last_meeting: '2024-01-15',
      next_follow_up: '2024-02-01'
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{`${person.first_name} ${person.last_name}`}</h1>
            <p className="text-gray-500">{person.position} at {person.company}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/crm/people/edit/${id}`} className="btn btn-primary">
              Edit Contact
            </Link>
            <button onClick={() => router.push('/dashboard/crm/people')} className="btn btn-outline">
              Back to List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <p className="text-gray-700">{`${person.first_name} ${person.last_name}`}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Position</span>
                  </label>
                  <p className="text-gray-700">{person.position}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Department</span>
                  </label>
                  <p className="text-gray-700">{person.department}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <span className={`badge ${person.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {person.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Work Email</span>
                  </label>
                  <p className="text-gray-700">{person.work_email}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Personal Email</span>
                  </label>
                  <p className="text-gray-700">{person.personal_email}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Phone</span>
                  </label>
                  <p className="text-gray-700">{person.phone}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Mobile</span>
                  </label>
                  <p className="text-gray-700">{person.mobile}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Company Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Company</span>
                  </label>
                  <p className="text-gray-700">{person.company}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Office Location</span>
                  </label>
                  <p className="text-gray-700">{person.office_location}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Contact Type</span>
                  </label>
                  <span className="badge badge-ghost">{person.contact_type}</span>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Lead Source</span>
                  </label>
                  <span className="badge badge-ghost">{person.lead_source}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Social Profiles</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">LinkedIn</span>
                  </label>
                  <a href={person.linkedin_profile} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800">
                    View Profile
                  </a>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Twitter</span>
                  </label>
                  <p className="text-gray-700">{person.twitter_handle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Preferences Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Communication Preferences</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={person.subscribe_newsletter}
                    className="checkbox"
                    disabled
                  />
                  <span>Newsletter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={person.subscribe_product_updates}
                    className="checkbox"
                    disabled
                  />
                  <span>Product Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={person.subscribe_events}
                    className="checkbox"
                    disabled
                  />
                  <span>Events</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {person.tags.map((tag, index) => (
                  <span key={index} className="badge badge-primary">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Notes</h2>
              <p className="text-gray-700">{person.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
