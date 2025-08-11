import { useTranslation } from 'react-i18next';

interface ProfileDocumentsProps {
  user: any;
}

export function ProfileDocuments({ user }: ProfileDocumentsProps) {
  const { t } = useTranslation();

  const documents = [
    { id: 1, name: 'Driver License.pdf', type: 'License', size: '2.3 MB', date: '2024-01-10' },
    { id: 2, name: 'Insurance.pdf', type: 'Insurance', size: '1.8 MB', date: '2024-01-08' },
    { id: 3, name: 'Contract.pdf', type: 'Contract', size: '3.1 MB', date: '2024-01-05' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('profile.documents')}</h2>
          <p className="text-gray-600">{t('profile.documentsDescription')}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          {t('profile.uploadDocument')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('profile.fileName')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('profile.type')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('profile.size')}</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">{t('profile.uploadDate')}</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">{t('profile.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📄</span>
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.type}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.size}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.date}</td>
                <td className="py-3 px-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mr-3">
                    {t('profile.view')}
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    {t('profile.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-gray-600 mb-2">{t('profile.dragDropFiles')}</p>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">
          {t('profile.browseFiles')}
        </button>
      </div>
    </div>
  );
}
