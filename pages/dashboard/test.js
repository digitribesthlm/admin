import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function TestPage() {
  const [records, setRecords] = useState([]);
  const [baseInfo, setBaseInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    async function fetchAirtableRecords() {
      try {
        const response = await fetch('/api/airtable-test');
        const data = await response.json();

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

  // Calculate summary statistics
  const calculateStats = () => {
    const filteredRecords = records.filter(record => 
      (selectedCompany === 'all' || record.Customer === selectedCompany) &&
      (selectedStatus === 'all' || record.Status === selectedStatus)
    );

    const totalTests = filteredRecords.length;
    const completedTests = filteredRecords.filter(r => r.Status === 'Done').length;
    const successfulTests = filteredRecords.filter(r => {
      const effect = parseFloat(r['Relative Effect']?.replace('%', '') || '0');
      return effect > 0;
    }).length;
    
    const avgImpact = filteredRecords.reduce((sum, r) => {
      const effect = parseFloat(r['Relative Effect']?.replace('%', '') || '0');
      return sum + effect;
    }, 0) / totalTests;

    return {
      totalTests,
      completedTests,
      successfulTests,
      avgImpact: avgImpact.toFixed(2)
    };
  };

  // Get unique companies and statuses for filters
  const companies = ['all', ...new Set(records.map(r => r.Customer).filter(Boolean))];
  const statuses = ['all', ...new Set(records.map(r => r.Status).filter(Boolean))];

  const stats = calculateStats();

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

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <Breadcrumbs />
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select 
            className="select select-bordered w-full max-w-xs"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map(company => (
              <option key={company} value={company}>
                {company === 'all' ? 'All Companies' : company}
              </option>
            ))}
          </select>

          <select 
            className="select select-bordered w-full max-w-xs"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Tests</div>
            <div className="stat-value">{stats.totalTests}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Completed Tests</div>
            <div className="stat-value">{stats.completedTests}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Successful Tests</div>
            <div className="stat-value text-success">{stats.successfulTests}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Average Impact</div>
            <div className="stat-value">{stats.avgImpact}%</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tests */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Recent Tests</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Company</th>
                      <th>Type</th>
                      <th>Impact</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records
                      .filter(record => 
                        (selectedCompany === 'all' || record.Customer === selectedCompany) &&
                        (selectedStatus === 'all' || record.Status === selectedStatus)
                      )
                      .sort((a, b) => new Date(b['Date of Change']) - new Date(a['Date of Change']))
                      .slice(0, 5)
                      .map((record, index) => (
                        <tr key={index}>
                          <td>{record['Date of Change']}</td>
                          <td>{record.Customer}</td>
                          <td>{record['Type of Change']}</td>
                          <td className={parseFloat(record['Relative Effect']) > 0 ? 'text-success' : 'text-error'}>
                            {record['Relative Effect']}
                          </td>
                          <td>{record.Status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tests by Type */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Tests by Type</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Total Tests</th>
                      <th>Success Rate</th>
                      <th>Avg Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(new Set(records.map(r => r['Type of Change'])))
                      .filter(Boolean)
                      .map(type => {
                        const typeTests = records.filter(r => 
                          r['Type of Change'] === type &&
                          (selectedCompany === 'all' || r.Customer === selectedCompany) &&
                          (selectedStatus === 'all' || r.Status === selectedStatus)
                        );
                        const successfulTests = typeTests.filter(r => parseFloat(r['Relative Effect']) > 0);
                        const avgImpact = typeTests.reduce((sum, r) => sum + parseFloat(r['Relative Effect'] || '0'), 0) / typeTests.length;

                        return (
                          <tr key={type}>
                            <td>{type}</td>
                            <td>{typeTests.length}</td>
                            <td>{((successfulTests.length / typeTests.length) * 100).toFixed(1)}%</td>
                            <td className={avgImpact > 0 ? 'text-success' : 'text-error'}>
                              {avgImpact.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* All Tests Table */}
          <div className="card bg-base-100 shadow-xl col-span-1 lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title">All Tests</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Company</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Impact</th>
                      <th>Status</th>
                      <th>Review Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records
                      .filter(record => 
                        (selectedCompany === 'all' || record.Customer === selectedCompany) &&
                        (selectedStatus === 'all' || record.Status === selectedStatus)
                      )
                      .sort((a, b) => new Date(b['Date of Change']) - new Date(a['Date of Change']))
                      .map((record, index) => (
                        <tr key={index}>
                          <td>{record['Date of Change']}</td>
                          <td>{record.Customer}</td>
                          <td>{record['Type of Change']}</td>
                          <td>{record['Description of Change']}</td>
                          <td className={parseFloat(record['Relative Effect']) > 0 ? 'text-success' : 'text-error'}>
                            {record['Relative Effect']}
                          </td>
                          <td>{record.Status}</td>
                          <td>{record['Post-Change Review Date']}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
