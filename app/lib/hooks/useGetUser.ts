import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
export function useGetUser() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data: User = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, error, loading };
}
