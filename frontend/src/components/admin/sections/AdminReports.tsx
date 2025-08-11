import { useTranslation } from 'react-i18next';

export function AdminReports() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('admin.reports')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 border border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.userGrowth')}</h3>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mb-2">+23%</p>
          <p className="text-sm text-gray-600">{t('admin.thisMonth')}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.activeUsers')}</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">189</p>
          <p className="text-sm text-gray-600">{t('admin.last7Days')}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.messagesProcessed')}</h3>
            <span className="text-2xl">✉️</span>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">342</p>
          <p className="text-sm text-gray-600">{t('admin.thisWeek')}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.documentsUploaded')}</h3>
            <span className="text-2xl">📁</span>
          </div>
          <p className="text-3xl font-bold text-orange-600 mb-2">56</p>
          <p className="text-sm text-gray-600">{t('admin.today')}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.exportReports')}</h3>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {t('admin.exportUsers')}
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            {t('admin.exportMessages')}
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            {t('admin.exportAnalytics')}
          </button>
        </div>
      </div>
    </div>
  );
}
