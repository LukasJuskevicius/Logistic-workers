import { useTranslation } from 'react-i18next';

export function AdminMessages() {
  const { t } = useTranslation();

  const messages = [
    { id: 1, from: 'John Smith', to: 'Admin', subject: 'Account Issue', status: 'unread', date: '2024-01-15' },
    { id: 2, from: 'Emma Davis', to: 'Support', subject: 'Payment Question', status: 'replied', date: '2024-01-14' },
    { id: 3, from: 'Mike Johnson', to: 'Admin', subject: 'Verification Request', status: 'pending', date: '2024-01-13' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('admin.allMessages')}</h2>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{msg.from}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-600">{msg.to}</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{msg.subject}</h4>
                <p className="text-xs text-gray-500">{msg.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  msg.status === 'unread' ? 'bg-red-100 text-red-700' :
                  msg.status === 'replied' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {msg.status}
                </span>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  {t('admin.view')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
