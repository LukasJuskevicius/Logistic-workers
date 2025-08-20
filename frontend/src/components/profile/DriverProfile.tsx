import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { updateDriverProfile, uploadDriverDocument, getDriverDocuments, deleteDriverDocument } from '../../api/driver';
import { DocumentUpload } from './DocumentUpload';

interface Document {
  id: string;
  file_name: string;
  url: string;
  upload_date: string;
  file_size?: number;
  mime_type?: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  date_of_birth: string;
  nationality: string;
  license_type: string;
  license_number: string;
  license_expiry_date: string;
  experience_years: number;
  preferred_job_types: string[];
  has_own_vehicle: boolean;
  vehicle_type: string;
  vehicle_registration: string;
  max_weight: string | null;
  max_volume: string | null;
  is_available: boolean;
}

interface DriverProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

// Toast notification functions
const toast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.error('Error:', message),
  info: (message: string) => console.info('Info:', message),
};

const DriverProfile: React.FC<DriverProfileProps> = ({ user, onUpdate }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);

  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    country: user.country || '',
    postal_code: user.postal_code || '',
    date_of_birth: user.date_of_birth || '',
    nationality: user.nationality || '',
    license_type: user.license_type || '',
    license_number: user.license_number || '',
    license_expiry_date: user.license_expiry_date || '',
    experience_years: user.experience_years || 0,
    preferred_job_types: user.preferred_job_types || [],
    has_own_vehicle: user.has_own_vehicle || false,
    vehicle_type: user.vehicle_type || '',
    vehicle_registration: user.vehicle_registration || '',
    max_weight: user.max_weight || '',
    max_volume: user.max_volume || '',
    is_available: user.is_available !== undefined ? user.is_available : true,
  });

  // Initialize original data for change detection
  useEffect(() => {
    const initialData = {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      postal_code: user.postal_code || '',
      date_of_birth: user.date_of_birth || '',
      nationality: user.nationality || '',
      license_type: user.license_type || '',
      license_number: user.license_number || '',
      license_expiry_date: user.license_expiry_date || '',
      experience_years: user.experience_years || 0,
      preferred_job_types: user.preferred_job_types || [],
      has_own_vehicle: user.has_own_vehicle || false,
      vehicle_type: user.vehicle_type || '',
      vehicle_registration: user.vehicle_registration || '',
      max_weight: user.max_weight || '',
      max_volume: user.max_volume || '',
      is_available: user.is_available !== undefined ? user.is_available : true,
    };
    setOriginalData(initialData);
  }, [user]);

  // Check for changes whenever formData changes
  useEffect(() => {
    if (!originalData) return;
    
    const hasFormChanges = Object.keys(formData).some(key => {
      const currentValue = formData[key as keyof typeof formData];
      const originalValue = originalData[key as keyof typeof originalData];
      
      // Handle array comparison for preferred_job_types
      if (Array.isArray(currentValue) && Array.isArray(originalValue)) {
        return JSON.stringify(currentValue) !== JSON.stringify(originalValue);
      }
      
      return currentValue !== originalValue;
    });
    
    setHasChanges(hasFormChanges);
  }, [formData, originalData]);

  useEffect(() => {
    const fetchDocuments = async (): Promise<void> => {
      try {
        if (!user?.id) {
          throw new Error('User ID is missing');
        }
        const docs = await getDriverDocuments(user.id);
        setDocuments(docs);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
        toast.error('Failed to load documents');
      }
    };

    fetchDocuments();
  }, [user.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => {
      // Handle checkboxes
      if (type === 'checkbox') {
        const target = e.target as HTMLInputElement;
        return {
          ...prev,
          [name]: target.checked
        };
      }

      // Handle number inputs
      if (type === 'number') {
        return {
          ...prev,
          [name]: value === '' ? '' : parseInt(value) || 0
        };
      }

      // Handle multi-select
      if (name === 'preferred_job_types') {
        const target = e.target as HTMLSelectElement;
        const selectedOptions = Array.from(target.selectedOptions, option => option.value);
        return {
          ...prev,
          preferred_job_types: selectedOptions
        };
      }

      // Default case for text inputs
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data to send
      const dataToSend = {
        ...formData,
        // Ensure experience_years is a number
        experience_years: Number(formData.experience_years) || 0,
        // Convert empty strings to null for optional fields
        max_weight: formData.max_weight || null,
        max_volume: formData.max_volume || null,
      };

      // Update profile
      const updatedProfile = await updateDriverProfile(user.id, dataToSend);
      onUpdate(updatedProfile);
      
      toast.success('Profile updated successfully');
      
      // Update original data to reflect the saved changes
      setOriginalData({ ...formData });
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!originalData) return;
    setFormData({ ...originalData });
    setHasChanges(false);
  };

  const handleDocumentUpload = async (file: File) => {
    if (!user?.id) return;
    
    if (documents.length >= 10) {
      toast.error('Maximum number of documents reached');
      return;
    }
    
    try {
      await uploadDriverDocument(user.id, file);
      toast.success('Document uploaded successfully');
      // Refresh documents
      const docs = await getDriverDocuments(user.id);
      setDocuments(docs);
    } catch (error) {
      console.error('Document upload error:', error);
      toast.error('Failed to upload document');
    }
  };

  const handleDocumentDelete = async (documentId: string) => {
    if (!user?.id) return;
    
    try {
      await deleteDriverDocument(user.id, documentId);
      toast.success('Document deleted successfully');
      // Refresh documents
      const docs = await getDriverDocuments(user.id);
      setDocuments(docs);
    } catch (error) {
      console.error('Document delete error:', error);
      toast.error('Failed to delete document');
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusMap: Record<string, { text: string; color: string }> = {
      pending: { text: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800' },
      approved: { text: 'Approved', color: 'bg-green-100 text-green-800' },
      rejected: { text: 'Rejected', color: 'bg-red-100 text-red-800' },
    };

    const statusInfo = statusMap[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  Professional Driver
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Driver Information</h2>
        </div>
        
        <form id="driver-profile-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Personal Information</h3>
                
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    required
                  />
                </div>
              </div>

              {/* License Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">License Information</h3>
                
                <div>
                  <label htmlFor="license_type" className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
                  <select
                    id="license_type"
                    name="license_type"
                    value={formData.license_type}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                  >
                    <option value="B">B - Car</option>
                    <option value="C">C - Truck</option>
                    <option value="CE">CE - Truck with Trailer</option>
                    <option value="D">D - Bus</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="license_number" className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input
                    id="license_number"
                    name="license_number"
                    type="text"
                    value={formData.license_number}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    id="experience_years"
                    name="experience_years"
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={handleInputChange}

                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>



            {hasChanges && (
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* Documents Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          <span className="text-sm text-gray-500">
            {documents.length}/10 documents uploaded
          </span>
        </div>
        
        {/* Upload New Document */}
        {documents.length < 10 && (
          <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="file"
              id="document-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleDocumentUpload(file);
                  e.target.value = ''; // Reset input
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="document-upload"
              className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
            >
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Upload Document</span>
              <span className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX, JPG, PNG (Max 5MB)
              </span>
            </label>
          </div>
        )}

        {/* Existing Documents List */}
        {documents.length > 0 && (
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div key={doc.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.file_name || `Document ${index + 1}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uploaded {doc.upload_date ? new Date(doc.upload_date).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </a>
                  )}
                  <button
                    onClick={() => handleDocumentDelete(doc.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {documents.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">No documents uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">Upload your documents like CV, license, certificates, etc.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/vacancies"
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-sm font-medium text-gray-900">Browse Vacancies</div>
              <div className="text-xs text-gray-500">Find new opportunities</div>
            </div>
          </Link>
          <Link
            to="/applications"
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-sm font-medium text-gray-900">My Applications</div>
              <div className="text-xs text-gray-500">Track your applications</div>
            </div>
          </Link>
          <Link
            to="/messages"
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium text-gray-900">Messages</div>
              <div className="text-xs text-gray-500">Communicate with employers</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
