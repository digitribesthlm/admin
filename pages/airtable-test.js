import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AirtableTestRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/test');
  }, []);

  return null;
}
