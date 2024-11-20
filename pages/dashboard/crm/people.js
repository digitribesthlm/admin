import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Link from 'next/link';

export default function People() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await fetch('/api/crm-table');
        const data = await response.json();

        console.log('Full Fetch Response:', data);

        if (data.success) {
          // More flexible filtering for people
          const peopleRecords = data.tableData.filter(record => 
            record.contact_name || 
            record.type === 'people' || 
            record.type === 'People'
          );
          
          console.log('Filtered People Records:', peopleRecords);
          
          setPeople(peopleRecords);
          setIsLoading(false);
        } else {
          setError(data.error || 'Failed to fetch people');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching people:', err);
        setError('Network error');
        setIsLoading(false);
      }
    }

    fetchPeople();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="alert alert-error">
          <div className="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <label>{error}</label>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                        {person.contact_name || person.name || 'Unnamed'}
                      </Link>
                      <div className="text-sm text-gray-500">{person.email}</div>
                    </td>
                    <td>{person.company || 'N/A'}</td>
                    <td>{person.position || 'N/A'}</td>
                    <td>
                      <div className="text-sm">{person.phone || 'N/A'}</div>
                    </td>
                    <td>
                      <span className="badge badge-ghost">{person.type || 'N/A'}</span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/dashboard/crm/people/${person.id}`}
                          className="btn btn-sm btn-ghost"
                        >
                          View
                        </Link>
                        <Link 
                          href={`/dashboard/crm/people/edit/${person.id}`}
                          className="btn btn-sm btn-ghost"
                        >
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-ghost text-error">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {people.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No people found. Check Airtable configuration or add people.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
