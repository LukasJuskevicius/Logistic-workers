// api/vacancies.ts — fetches live job data from the backend jobs API
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function getVacancies() {
  try {
    const response = await fetch(`${BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    throw error;
  }
}

export async function getVacancy(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    throw error;
  }
}
