import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment);

  // Custom mapping for plural forms and display names
  const getProperPath = (segment, index, segments) => {
    // Special case for company/[id] to map back to companies
    if (segment === 'company' && segments[index + 1]) {
      return 'companies';
    }
    return segment;
  };

  // Custom mapping for display names
  const getDisplayName = (segment, index, segments) => {
    // Handle numeric segments (IDs) by showing "Details" instead
    if (!isNaN(segment)) {
      return 'Details';
    }
    
    // Skip showing "edit" in breadcrumbs
    if (segment === 'edit') {
      return null;
    }

    // Skip showing duplicate "dashboard"
    if (segment === 'dashboard' && index > 0) {
      return null;
    }
    
    // Map segments to proper display names
    const displayNames = {
      'dashboard': 'Dashboard',
      'companies': 'Companies',
      'company': 'Companies',
      'crm': 'CRM',
      'products': 'Products',
      'people': 'People',
      'tasks': 'Tasks',
      'add': 'Add New'
    };
    
    return displayNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const getBreadcrumbPath = (index) => {
    return '/' + pathSegments
      .slice(0, index + 1)
      .map((segment, i) => getProperPath(segment, i, pathSegments))
      .join('/');
  };

  return (
    <nav className="mb-4">
      <ol className="flex space-x-2 text-sm">
        {pathSegments.map((segment, index) => {
          const displayName = getDisplayName(segment, index, pathSegments);
          if (!displayName) return null;

          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-500">/</span>}
              <Link 
                href={getBreadcrumbPath(index)}
                className={index === pathSegments.length - 1 ? 'text-gray-600' : 'text-blue-600 hover:text-blue-800'}
              >
                {displayName}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
