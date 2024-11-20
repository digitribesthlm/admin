import DashboardLayout from '../../../components/DashboardLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Link from 'next/link';

export default function Companies() {
  const companies = [
    { 
      id: 1, 
      name: 'Acme Corp', 
      industry: 'Technology', 
      employees: 150, 
      status: 'Active',
      email: 'contact@acmecorp.com',
      type: 'b2b'
    },
    { 
      id: 2, 
      name: 'Global Industries', 
      industry: 'Manufacturing', 
      employees: 500, 
      status: 'Active',
      email: 'info@globalind.com',
      type: 'b2b'
    },
    { 
      id: 3, 
      name: 'Tech Solutions', 
      industry: 'Software', 
      employees: 75, 
      status: 'Pending',
      email: 'hello@techsolutions.com',
      type: 'b2c'
    },
    { 
      id: 4, 
      name: 'Green Energy Co', 
      industry: 'Energy', 
      employees: 200, 
      status: 'Active',
      email: 'contact@greenenergy.com',
      type: 'b2b'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
          <Link href="/dashboard/crm/company/add" className="btn btn-primary">
            Add Company
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Industry</th>
                  <th>Type</th>
                  <th>Employees</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="hover">
                    <td>
                      <Link 
                        href={`/dashboard/crm/company/${company.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {company.name}
                      </Link>
                      <div className="text-sm text-gray-500">{company.email}</div>
                    </td>
                    <td>{company.industry}</td>
                    <td>
                      <span className="badge badge-ghost">{company.type.toUpperCase()}</span>
                    </td>
                    <td>{company.employees}</td>
                    <td>
                      <span className={`badge ${
                        company.status === 'Active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/dashboard/crm/company/${company.id}`}
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
