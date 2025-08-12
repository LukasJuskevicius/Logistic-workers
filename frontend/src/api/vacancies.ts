// api/vacancies.ts
const BASE_URL = import.meta.env.VITE_API_URL;

// api/vacancies.ts
export async function getVacancies() {
  try {
    const response = await fetch(`${BASE_URL}/vacancies`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    throw error; // Let the component handle the error
  }
}

export async function getVacancy(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/vacancies/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    throw error; // Let the component handle the error
  }
}