// api/vacancies.ts
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getVacancies() {
  const response = await fetch(`${BASE_URL}/vacancies`);
  return response.json();
}

export async function getVacancy(id: string) {
  const response = await fetch(`${BASE_URL}/vacancies/${id}`);
  return response.json();
}