import DashboardLayout from '../../../components/DashboardLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default function People() {
  const people = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@acmecorp.com',
      company: 'Acme Corp',
      role: 'CEO',
      lastContact: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@techsolutions.com',
      company: 'Tech Solutions',
      role: 'Marketing Director',
      lastContact: '2024-01-12'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      email: 'm.wilson@global.com',
      company: 'Global Industries',
      role: 'Sales Manager',
      lastContact: '2024-01-10'
    },
    { 
      id: 4, 
      name: 'Lisa Chen', 
      email: 'l.chen@greenenergy.com',
      company: 'Green Energy Co',
      role: 'CTO',
      lastContact: '2024-01-08'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">People</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Person
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.lastContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
