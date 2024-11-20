import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment);

  return (
    <nav className="mb-4">
      <ol className="flex space-x-2 text-sm">
        <li>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            Dashboard
          </Link>
        </li>
        {pathSegments.slice(1).map((segment, index) => (
          <li key={segment} className="flex items-center space-x-2">
            <span className="text-gray-500">/</span>
            <Link 
              href={`/dashboard/${pathSegments.slice(1, index + 2).join('/')}`}
              className={index === pathSegments.length - 2 ? 'text-gray-600' : 'text-blue-600 hover:text-blue-800'}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
