import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../../components/DashboardLayout'
import { useRouter } from 'next/router';

function AddOpportunity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    status: 'prospecting',
    notes: '',
    nextFollowUp: '',
    products: [],
    probability: 50,
    contractDuration: 12 // Default to 12 months
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Calculate total value from selected products and contract duration
  const calculateTotalValue = () => {
    const monthlyValue = products
      .filter(product => formData.products.includes(product.id))
      .reduce((sum, product) => sum + (product.fields.Price || 0), 0);
    
    return monthlyValue * formData.contractDuration;
  };

  // Calculate monthly revenue
  const calculateMonthlyValue = () => {
    return products
      .filter(product => formData.products.includes(product.id))
      .reduce((sum, product) => sum + (product.fields.Price || 0), 0);
  };

  // Get product names as comma-separated string
  const getSelectedProductNames = () => {
    return products
      .filter(product => formData.products.includes(product.id))
      .map(product => product.fields.Name)
      .join(', ');
  };

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.records || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      }
    }
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            companyName: formData.companyName,
            contactPerson: formData.contactPerson,
            email: formData.email,
            potentialValue: calculateTotalValue(),
            status: formData.status,
            notes: formData.notes,
            nextFollowUp: formData.nextFollowUp,
            products: getSelectedProductNames(),
            probability: parseInt(formData.probability),
            contractDuration: formData.contractDuration
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add opportunity');
      }

      setSuccess(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        status: 'prospecting',
        notes: '',
        nextFollowUp: '',
        products: [],
        probability: 50,
        contractDuration: 12
      });
      setMessage({ type: 'success', text: 'Opportunity added successfully!' });
      setTimeout(() => {
        router.push('/dashboard/crm');
      }, 2000);
    } catch (error) {
      console.error('Error adding opportunity:', error);
      setError('Failed to add opportunity');
      setMessage({ type: 'error', text: 'Failed to add opportunity. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleProductChange = (productId) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Opportunity</h1>
        
        {message.text && (
          <div className={`mb-4 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="prospecting">Prospecting</option>
                <option value="qualification">Qualification</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed_won">Closed Won</option>
                <option value="closed_lost">Closed Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up</label>
              <input
                type="date"
                name="nextFollowUp"
                value={formData.nextFollowUp}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Probability
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-gray-700 font-medium w-16">
                  {formData.probability}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contract Duration (Months)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.contractDuration}
                  onChange={(e) => handleInputChange('contractDuration', Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border rounded-md"
                />
                <span className="text-gray-700 whitespace-nowrap">months</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
              <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-3">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.products.includes(product.id)}
                      onChange={() => handleProductChange(product.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">
                      {product.fields.Name} - {product.fields.Price ? `${product.fields.Price.toLocaleString('sv-SE')} kr/month` : 'No price'}
                    </span>
                  </label>
                ))}
                {products.length === 0 && (
                  <p className="text-gray-500 text-sm">Loading products...</p>
                )}
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-right text-gray-600">
                  Monthly Revenue: {calculateMonthlyValue().toLocaleString('sv-SE')} kr/month
                </div>
                <div className="text-right font-medium text-gray-700">
                  Total Contract Value: {calculateTotalValue().toLocaleString('sv-SE')} kr
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || formData.products.length === 0}
              className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                (loading || formData.products.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Save Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default AddOpportunity