import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './sections/AdminOverview';
import { AdminUsers } from './sections/AdminUsers';
import { AdminMessages } from './sections/AdminMessages';
import { AdminReports } from './sections/AdminReports';
import AdminJobsManager from './AdminJobsManager';

interface AdminDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const { t } = useTranslation();

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview />;
      case 'users':
        return <AdminUsers />;
      case 'messages':
        return <AdminMessages />;
      case 'jobs':
        return <AdminJobsManager />;
      case 'reports':
        return <AdminReports />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
          <p className="text-gray-600 mt-1">{t('admin.dashboardDescription')}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/5">
            <AdminSidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection}
              onNavigate={onNavigate}
            />
          </div>

          <div className="lg:w-4/5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
