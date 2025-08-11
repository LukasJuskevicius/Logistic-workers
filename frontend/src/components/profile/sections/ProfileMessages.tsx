import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProfileMessagesProps {
  user: any;
}

export function ProfileMessages({ user }: ProfileMessagesProps) {
  const { t } = useTranslation();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: 'John Smith',
      subject: 'Delivery Schedule Update',
      content: 'Your delivery has been scheduled for tomorrow at 10 AM.',
      date: '2024-01-15',
      read: true
    },
    {
      id: 2,
      sender: 'Admin',
      subject: 'Account Verification Complete',
      content: 'Your account has been successfully verified.',
      date: '2024-01-14',
      read: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('profile.messages')}</h2>
          <p className="text-gray-600">{t('profile.messagesDescription')}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          {t('profile.newMessage')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-2">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedMessage?.id === message.id
                  ? 'bg-indigo-50 border-indigo-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm text-gray-900">{message.sender}</p>
                {!message.read && (
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                )}
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">{message.subject}</p>
              <p className="text-xs text-gray-500">{message.date}</p>
            </button>
          ))}
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {t('profile.from')}: {selectedMessage.sender} • {selectedMessage.date}
                </p>
              </div>
              <p className="text-gray-700">{selectedMessage.content}</p>
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  {t('profile.reply')}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  {t('profile.delete')}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-gray-500">{t('profile.selectMessage')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
