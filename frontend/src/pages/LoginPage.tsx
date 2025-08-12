// src/pages/LoginPage.tsx
import { Form, useActionData, useNavigation } from 'react-router-dom';

export function LoginPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Log In</h1>
        
        {actionData?.error && (
          <div className="text-red-500 mb-4">{actionData.error}</div>
        )}

        <Form method="post" className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </Form>
      </div>
    </div>
  );
}