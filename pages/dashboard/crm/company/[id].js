import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useRouter } from 'next/router';

export default function CompanyDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Dummy data for company details
  const company = {
    customer_id: "12345",
    name: "SkyTech Solutions AB",
    company: "SkyTech Solutions AB",
    email: "contact@skytech.se",
    gmail: "skytech.marketing@gmail.com",
    phone: "+46 70 123 4567",
    address: "Innovation Street 42",
    country: "Sweden",
    country_code: "SE",
    homepage: "https://www.skytech.se",
    type: "b2b",
    status: "active",
    invoice_mail: "invoices.123456@arkivplats.se",

    // Tracking IDs
    gtm_id: "GTM-NKTR789",
    ga4_id: "G-ABC123DEF4",
    google_analytics_id: "UA-12345678-9",
    adwords_id: "AW-987654321",

    // Social Media IDs
    fb_ads_account_id: "251234567890",
    fb_account_id: "987654321",
    fb_page_id: "123456789",
    fb_pixel: "987654321098765",
    linkedin_ads_account_id: "12345678",
    linkedin_insight_id: "987654",

    // Cron Settings
    cron_work: "active",
    cron_work_facebook: "active",
    cron_work_adwords: "pause",
    cron_work_seo: "active",
    cron_work_twitter: "pause",
    cron_work_linkedin: "active",
    cron_work_bing: "pause",

    okr: "Q1 2024: Increase market presence by 25%"
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-500">ID: {company.customer_id}</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">Edit Company</button>
            <button className="btn btn-outline">Back to List</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Company Name</span>
                  </label>
                  <input type="text" value={company.company} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input type="text" value={company.email} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone</span>
                  </label>
                  <input type="text" value={company.phone} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Type</span>
                  </label>
                  <input type="text" value={company.type} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <div className="badge badge-primary">{company.status}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Address Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Address</span>
                  </label>
                  <input type="text" value={company.address} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Country</span>
                  </label>
                  <input type="text" value={company.country} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Country Code</span>
                  </label>
                  <input type="text" value={company.country_code} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Homepage</span>
                  </label>
                  <input type="text" value={company.homepage} className="input input-bordered" readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Tracking IDs Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Tracking Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">GTM ID</span>
                  </label>
                  <input type="text" value={company.gtm_id} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">GA4 ID</span>
                  </label>
                  <input type="text" value={company.ga4_id} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Google Analytics ID</span>
                  </label>
                  <input type="text" value={company.google_analytics_id} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">AdWords ID</span>
                  </label>
                  <input type="text" value={company.adwords_id || 'Not set'} className="input input-bordered" readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Social Media Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">FB Ads Account ID</span>
                  </label>
                  <input type="text" value={company.fb_ads_account_id} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">FB Pixel</span>
                  </label>
                  <input type="text" value={company.fb_pixel} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">LinkedIn Ads Account</span>
                  </label>
                  <input type="text" value={company.linkedin_ads_account_id} className="input input-bordered" readOnly />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">LinkedIn Insight</span>
                  </label>
                  <input type="text" value={company.linkedin_insight_id} className="input input-bordered" readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Cron Settings Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Integration Status</h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries({
                  'General': company.cron_work,
                  'Facebook': company.cron_work_facebook,
                  'AdWords': company.cron_work_adwords,
                  'SEO': company.cron_work_seo,
                  'Twitter': company.cron_work_twitter,
                  'LinkedIn': company.cron_work_linkedin,
                  'Bing': company.cron_work_bing
                }).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center p-4 bg-base-200 rounded-lg">
                    <span className="font-semibold mb-2">{key}</span>
                    <span className={`badge ${value === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {value || 'Not set'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* OKR Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">OKR</h2>
              <textarea 
                className="textarea textarea-bordered w-full" 
                value={company.okr || 'No OKR set'}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
