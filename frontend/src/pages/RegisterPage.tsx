import { Form, useActionData, useNavigation, useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const actionData = useActionData() as any;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  // Handle successful registration
  if (actionData?.success) {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        
        {actionData?.error && (
          <div className="text-red-500 mb-4">{actionData.error}</div>
        )}

        {actionData?.success && (
          <div className="text-green-500 mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        <Form method="post" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                name="firstName"
                type="text"
                required
                className="w-full p-2 border rounded"
                disabled={isSubmitting}
              />
              {actionData?.fieldErrors?.firstName && (
                <p className="text-red-500 text-sm mt-1">{actionData.fieldErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                name="lastName"
                type="text"
                required
                className="w-full p-2 border rounded"
                disabled={isSubmitting}
              />
              {actionData?.fieldErrors?.lastName && (
                <p className="text-red-500 text-sm mt-1">{actionData.fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
            {actionData?.fieldErrors?.email && (
              <p className="text-red-500 text-sm mt-1">{actionData.fieldErrors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
            {actionData?.fieldErrors?.password && (
              <p className="text-red-500 text-sm mt-1">{actionData.fieldErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Account Type</label>
            <select
              name="type"
              defaultValue="driver"
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            >
              <option value="driver">Driver</option>
              <option value="client">Employer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || actionData?.success}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </Form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
              disabled={isSubmitting}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}