import { useTranslation } from 'react-i18next';

interface ProfileOverviewProps {
  user: any;
}

export function ProfileOverview({ user }: ProfileOverviewProps) {
  const { t } = useTranslation();

  const stats = [
    { label: t('profile.memberSince'), value: new Date(user?.created_at || Date.now()).toLocaleDateString() },
    { label: t('profile.status'), value: user?.is_verified ? t('profile.verified') : t('profile.unverified') },
    { label: t('profile.location'), value: user?.location || t('profile.notSet') },
    { label: t('profile.role'), value: user?.role || 'User' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('profile.overview')}</h2>
        <p className="text-gray-600">{t('profile.overviewDescription')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bio Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.aboutMe')}</h3>
        <p className="text-gray-600">
          {user?.bio || t('profile.noBioYet')}
        </p>
      </div>

      {/* Skills Section (for drivers) */}
      {user?.role === 'driver' && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.skills')}</h3>
          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                {skill}
              </span>
            )) || <p className="text-gray-500">{t('profile.noSkillsAdded')}</p>}
          </div>
        </div>
      )}

      {/* Company Info (for clients) */}
      {user?.role === 'client' && user?.company_name && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.companyInfo')}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">{t('profile.company')}:</span> {user.company_name}
            </p>
            {user?.fleet_size && (
              <p className="text-gray-600">
                <span className="font-medium">{t('profile.fleetSize')}:</span> {user.fleet_size}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
