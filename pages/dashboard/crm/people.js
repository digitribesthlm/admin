import DashboardLayout from '../../../components/DashboardLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Link from 'next/link';

export default function People() {
  const people = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@acmecorp.com',
      company: 'Acme Corp',
      position: 'CEO',
      phone: '+46 70 123 4567',
      status: 'Active',
      type: 'Business'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@techsolutions.com',
      company: 'Tech Solutions',
      position: 'Marketing Director',
      phone: '+46 70 234 5678',
      status: 'Active',
      type: 'Customer'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      email: 'm.wilson@global.com',
      company: 'Global Industries',
      position: 'Sales Manager',
      phone: '+46 70 345 6789',
      status: 'Inactive',
      type: 'Partner'
    },
    { 
      id: 4, 
      name: 'Lisa Chen', 
      email: 'l.chen@greenenergy.com',
      company: 'Green Energy Co',
      position: 'CTO',
      phone: '+46 70 456 7890',
      status: 'Active',
      type: 'Business'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">People</h1>
          <Link href="/dashboard/crm/people/add" className="btn btn-primary">
            Add Person
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id} className="hover">
                    <td>
                      <Link 
                        href={`/dashboard/crm/people/${person.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {person.name}
                      </Link>
                      <div className="text-sm text-gray-500">{person.email}</div>
                    </td>
                    <td>{person.company}</td>
                    <td>{person.position}</td>
                    <td>
                      <div className="text-sm">{person.phone}</div>
                    </td>
                    <td>
                      <span className="badge badge-ghost">{person.type}</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        person.status === 'Active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {person.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/dashboard/crm/people/${person.id}`}
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
