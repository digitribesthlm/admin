import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Link from 'next/link';

export default function Companies() {
  const [tableData, setTableData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    customer_id: '',
    name: '',
    company: '',
    email: '',
    type: '',
    status: ''
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch('/api/crm-table');
      const data = await response.json();
      
      if (data.success) {
        setTableData(data.tableData);
      } else {
        alert('Failed to fetch records');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching records');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this company?')) {
      try {
        const response = await fetch('/api/crm-table', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        
        if (data.success) {
          setTableData(data.tableData);
          alert('Company deleted successfully!');
        } else {
          alert('Failed to delete company');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting company');
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'badge-success';
      case 'pause':
        return 'badge-warning';
      default:
        return 'badge-ghost';
    }
  };

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
                  <th>Customer ID</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((company) => (
                  <tr key={company.id} className="hover">
                    <td>
                      <Link 
                        href={`/dashboard/crm/company/${company.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {company.company || company.name || '-'}
                      </Link>
                      <div className="text-sm text-gray-500">{company.homepage || '-'}</div>
                    </td>
                    <td>{company.customer_id || '-'}</td>
                    <td>
                      <span className="badge badge-ghost">
                        {(company.type || '-').toUpperCase()}
                      </span>
                    </td>
                    <td>{company.email || '-'}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(company.status)}`}>
                        {company.status || 'Unknown'}
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
                        <Link 
                          href={`/dashboard/crm/company/edit/${company.id}`}
                          className="btn btn-sm btn-ghost"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(company.id)}
                          className="btn btn-sm btn-ghost text-error"
                        >
                          Delete
                        </button>
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
