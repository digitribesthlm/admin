import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function TestPage() {
  const [records, setRecords] = useState([]);
  const [baseInfo, setBaseInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAirtableRecords() {
      try {
        const response = await fetch('/api/airtable-test');
        const data = await response.json();

        console.log('Fetched data:', data);

        if (data.success) {
          setRecords(data.records || []);
          setBaseInfo({
            baseId: data.baseId,
            tableId: data.tableId
          });
          setIsLoading(false);
        } else {
          setError(data.error || 'Failed to fetch records');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Network error');
        setIsLoading(false);
      }
    }

    fetchAirtableRecords();
  }, []);

  if (isLoading) return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </DashboardLayout>
  );

  if (error) return (
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

  // Safely get headers
  const headers = records.length > 0 
    ? Object.keys(records[0]).filter(key => key !== 'id')
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl">Airtable Records</h1>
            
            {baseInfo && (
              <div className="mb-4 text-sm text-gray-600">
                <p>Base ID: {baseInfo.baseId}</p>
                <p>Table ID: {baseInfo.tableId}</p>
              </div>
            )}

            <div className="overflow-x-auto">
              {records.length > 0 ? (
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      {headers.map(key => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={index}>
                        {headers.map(key => (
                          <td key={key}>
                            {typeof record[key] === 'object' 
                              ? JSON.stringify(record[key]) 
                              : record[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500">No records found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
