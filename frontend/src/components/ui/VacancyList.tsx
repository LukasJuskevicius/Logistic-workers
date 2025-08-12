// components/VacanciesList.tsx
import { useState, useEffect } from 'react';
import { getVacancies } from '../../api/vacancies';

function VacanciesList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        setLoading(true);
        const data = await getVacancies();
        setVacancies(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadVacancies();
  }, []);

  if (loading) return <div>Loading vacancies...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{vacancies.map((vacancy: any) => (
    <div key={vacancy.id}>{vacancy.title}</div>
  ))}</div>;
}