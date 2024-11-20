import DashboardLayout from '../../../../components/DashboardLayout';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddCompany() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    gmail: '',
    phone: '',
    address: '',
    country: '',
    country_code: '',
    homepage: '',
    type: 'b2c',
    status: 'active',
    invoice_mail: '',
    
    // Tracking IDs
    gtm_id: '',
    ga4_id: '',
    google_analytics_id: '',
    adwords_id: '',
    
    // Social Media
    fb_ads_account_id: '',
    fb_account_id: '',
    fb_page_id: '',
    fb_pixel: '',
    linkedin_ads_account_id: '',
    linkedin_insight_id: '',
    
    // Integration Status
    cron_work: 'active',
    cron_work_facebook: 'active',
    cron_work_adwords: 'active',
    cron_work_seo: 'active',
    cron_work_twitter: 'active',
    cron_work_linkedin: 'active',
    cron_work_bing: 'active',
    
    OKR: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a copy of formData to modify
    const submissionData = { ...formData };
    
    // Convert google_analytics_id to a number or empty string
    submissionData.google_analytics_id = 
      submissionData.google_analytics_id 
        ? parseInt(submissionData.google_analytics_id, 10) || '' 
        : '';

    try {
      const response = await fetch('/api/crm-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: submissionData
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Company created successfully!');
        router.push('/dashboard/crm/companies');
      } else {
        alert(data.error || 'Failed to create company');
        console.error('Submission error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating company');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Rest of the component remains the same as in the previous version
  // ... (previous render method)
}
