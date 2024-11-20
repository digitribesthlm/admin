import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Simulated product data - in a real app, this would come from an API
  const product = {
    id: id,
    name: 'Enterprise SEO Package',
    type: 'service',
    category: 'SEO',
    description: 'Comprehensive SEO service package for enterprise clients including technical SEO, content optimization, and link building strategies.',
    status: 'active',
    
    // Pricing Information
    price: '2999',
    billing_cycle: 'monthly',
    setup_fee: '999',
    minimum_term: '6',
    
    // Service Details
    service_level: 'premium',
    delivery_time: '30 days initial setup',
    included_hours: '40',
    
    // Features and Deliverables
    features: [
      'Technical SEO Audit',
      'Keyword Research',
      'Content Strategy',
      'Link Building',
      'Monthly Reporting',
      'Dedicated SEO Manager'
    ],
    deliverables: [
      'Monthly Performance Report',
      'Technical Optimization Plan',
      'Content Calendar',
      'Backlink Analysis',
      'Competitor Analysis'
    ],
    reporting_frequency: 'monthly',
    
    // Platforms
    platforms: {
      google_ads: false,
      facebook_ads: false,
      linkedin_ads: false,
      twitter_ads: false,
      seo: true,
      analytics: true
    },
    
    // Requirements
    technical_requirements: [
      'Website access',
      'Google Search Console access',
      'Google Analytics access',
      'Content management system access'
    ],
    access_requirements: [
      'Admin access to CMS',
      'Google Search Console ownership',
      'Analytics admin access'
    ],
    
    // Target Information
    target_audience: 'Enterprise businesses looking to improve their organic search presence',
    ideal_customer_profile: 'B2B companies with established online presence',
    usp: 'Data-driven SEO strategy with focus on ROI',
    
    // Internal Information
    internal_cost: '1500',
    profit_margin: '50%',
    team_resources: 'SEO Specialist, Content Writer, Technical SEO Expert',
    
    // KPIs
    kpi_targets: [
      'Increase organic traffic by 25%',
      'Improve keyword rankings for target terms',
      'Increase domain authority',
      'Reduce bounce rate'
    ],
    success_metrics: [
      'Organic traffic growth',
      'Keyword position improvements',
      'Conversion rate from organic traffic',
      'Page load speed improvements'
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500">{product.category} - {product.service_level.toUpperCase()}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/crm/products/edit/${id}`} className="btn btn-primary">
              Edit Product
            </Link>
            <button onClick={() => router.push('/dashboard/crm/products')} className="btn btn-outline">
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
                    <span className="label-text font-semibold">Type</span>
                  </label>
                  <p className="text-gray-700 capitalize">{product.type}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <p className="text-gray-700">{product.category}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Service Level</span>
                  </label>
                  <p className="text-gray-700 capitalize">{product.service_level}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Pricing Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Pricing Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Price</span>
                  </label>
                  <p className="text-gray-700">${product.price}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Billing Cycle</span>
                  </label>
                  <p className="text-gray-700 capitalize">{product.billing_cycle}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Setup Fee</span>
                  </label>
                  <p className="text-gray-700">${product.setup_fee}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Minimum Term</span>
                  </label>
                  <p className="text-gray-700">{product.minimum_term} months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deliverables Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Deliverables</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.deliverables.map((deliverable, index) => (
                  <li key={index} className="text-gray-700">{deliverable}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Platforms Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Platforms</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.platforms).map(([platform, enabled]) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={enabled}
                      className="checkbox"
                      disabled
                    />
                    <span className="capitalize">{platform.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Requirements</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Technical Requirements</span>
                  </label>
                  <ul className="list-disc list-inside space-y-1">
                    {product.technical_requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Access Requirements</span>
                  </label>
                  <ul className="list-disc list-inside space-y-1">
                    {product.access_requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* KPIs and Success Metrics Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">KPIs & Success Metrics</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">KPI Targets</span>
                  </label>
                  <ul className="list-disc list-inside space-y-1">
                    {product.kpi_targets.map((kpi, index) => (
                      <li key={index} className="text-gray-700">{kpi}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Success Metrics</span>
                  </label>
                  <ul className="list-disc list-inside space-y-1">
                    {product.success_metrics.map((metric, index) => (
                      <li key={index} className="text-gray-700">{metric}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Information Card */}
          <div className="card bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Internal Information</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Internal Cost</span>
                  </label>
                  <p className="text-gray-700">${product.internal_cost}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Profit Margin</span>
                  </label>
                  <p className="text-gray-700">{product.profit_margin}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Team Resources</span>
                  </label>
                  <p className="text-gray-700">{product.team_resources}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
