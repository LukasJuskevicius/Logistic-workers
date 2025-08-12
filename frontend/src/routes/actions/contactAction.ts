import { submitContact } from '../../api/contact';

export async function contactAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const contactData = Object.fromEntries(formData);
  
  try {
    const result = await submitContact(contactData);
    if (result.success) {
      return { success: true, message: 'Message sent successfully!' };
    }
    return { error: result.error || 'Failed to send message' };
  } catch {
    return { error: 'Network error. Please try again.' };
  }
}