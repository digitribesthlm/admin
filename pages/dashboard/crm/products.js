import DashboardLayout from '../../../components/DashboardLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Link from 'next/link';

export default function Products() {
  const products = [
    { 
      id: 1, 
      name: 'SEO Premium Package', 
      category: 'SEO',
      price: '2999',
      billing_cycle: 'Monthly',
      service_level: 'Premium',
      status: 'Active',
      platforms: ['Technical SEO', 'Content SEO', 'Local SEO']
    },
    { 
      id: 2, 
      name: 'Google Ads Management', 
      category: 'PPC',
      price: '1999',
      billing_cycle: 'Monthly',
      service_level: 'Standard',
      status: 'Active',
      platforms: ['Search', 'Display', 'Shopping']
    },
    { 
      id: 3, 
      name: 'Social Media Complete', 
      category: 'Social',
      price: '3999',
      billing_cycle: 'Monthly',
      service_level: 'Premium',
      status: 'Active',
      platforms: ['Facebook', 'LinkedIn', 'Twitter']
    },
    { 
      id: 4, 
      name: 'Analytics & Tracking Setup', 
      category: 'Analytics',
      price: '999',
      billing_cycle: 'One-time',
      service_level: 'Standard',
      status: 'Active',
      platforms: ['Google Analytics', 'Tag Manager', 'Pixel Setup']
    },
    { 
      id: 5, 
      name: 'Digital Marketing Bundle', 
      category: 'Integrated',
      price: '5999',
      billing_cycle: 'Monthly',
      service_level: 'Premium',
      status: 'Active',
      platforms: ['SEO', 'PPC', 'Social', 'Analytics']
    }
  ];

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'SEO': 'badge-primary',
      'PPC': 'badge-secondary',
      'Social': 'badge-accent',
      'Analytics': 'badge-info',
      'Integrated': 'badge-success'
    };
    return colors[category] || 'badge-ghost';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Products & Services</h1>
          <Link href="/dashboard/crm/products/add" className="btn btn-primary">
            Add Product
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Product/Service</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Service Level</th>
                  <th>Billing</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover">
                    <td>
                      <Link 
                        href={`/dashboard/crm/products/${product.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {product.name}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {product.platforms.join(' • ')}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getCategoryBadgeColor(product.category)}`}>
                        {product.category}
                      </span>
                    </td>
                    <td>
                      ${product.price}
                      <div className="text-sm text-gray-500">{product.billing_cycle}</div>
                    </td>
                    <td>
                      <span className="badge badge-ghost">{product.service_level}</span>
                    </td>
                    <td>{product.billing_cycle}</td>
                    <td>
                      <span className={`badge ${
                        product.status === 'Active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/dashboard/crm/products/${product.id}`}
                          className="btn btn-sm btn-ghost"
                        >
                          View
                        </Link>
                        <button className="btn btn-sm btn-ghost">Edit</button>
                        <button className="btn btn-sm btn-ghost text-error">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
