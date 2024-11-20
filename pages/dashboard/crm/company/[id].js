import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CompanyDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Simulated company data - in a real app, this would come from an API
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
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-500">ID: {company.customer_id}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/crm/company/edit/${id}`} className="btn btn-primary">
              Edit Company
            </Link>
            <button onClick={() => router.push('/dashboard/crm/companies')} className="btn btn-outline">
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
                    <span className="label-text font-semibold">Company Name</span>
                  </label>
                  <p className="text-gray-700">{company.company}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <p className="text-gray-700">{company.email}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Phone</span>
                  </label>
                  <p className="text-gray-700">{company.phone}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Type</span>
                  </label>
                  <p className="text-gray-700 uppercase">{company.type}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <span className={`badge ${company.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {company.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Address Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Address</span>
                  </label>
                  <p className="text-gray-700">{company.address}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Country</span>
                  </label>
                  <p className="text-gray-700">{company.country}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Country Code</span>
                  </label>
                  <p className="text-gray-700">{company.country_code}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Homepage</span>
                  </label>
                  <a href={company.homepage} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800">
                    {company.homepage}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Tracking Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">GTM ID</span>
                  </label>
                  <p className="text-gray-700">{company.gtm_id}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">GA4 ID</span>
                  </label>
                  <p className="text-gray-700">{company.ga4_id}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Google Analytics ID</span>
                  </label>
                  <p className="text-gray-700">{company.google_analytics_id}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">AdWords ID</span>
                  </label>
                  <p className="text-gray-700">{company.adwords_id || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Social Media Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">FB Ads Account ID</span>
                  </label>
                  <p className="text-gray-700">{company.fb_ads_account_id}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">FB Pixel</span>
                  </label>
                  <p className="text-gray-700">{company.fb_pixel}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">LinkedIn Ads Account</span>
                  </label>
                  <p className="text-gray-700">{company.linkedin_ads_account_id}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">LinkedIn Insight</span>
                  </label>
                  <p className="text-gray-700">{company.linkedin_insight_id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Status Card */}
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
              <p className="text-gray-700">{company.okr || 'No OKR set'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
