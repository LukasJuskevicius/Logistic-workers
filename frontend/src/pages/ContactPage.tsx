
import { ContactForm } from '../components/features/contact/ContactForm';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Get in touch with our team for any questions or support
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">For Drivers</h3>
                  <p className="mt-1 text-gray-600">
                    Questions about applications, job opportunities, or verification process
                  </p>
                  <p className="mt-2 text-blue-600">drivers@logistic-workers.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">For Employers</h3>
                  <p className="mt-1 text-gray-600">
                    Information about posting jobs, accessing our driver database, or partnerships
                  </p>
                  <p className="mt-2 text-blue-600">employers@logistic-workers.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">General Support</h3>
                  <p className="mt-1 text-gray-600">
                    Technical issues, account problems, or general inquiries
                  </p>
                  <p className="mt-2 text-blue-600">support@logistic-workers.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">Available Monday - Friday, 9 AM - 6 PM CET</p>
                  <p className="mt-2 text-blue-600">+31 20 123 4567</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}