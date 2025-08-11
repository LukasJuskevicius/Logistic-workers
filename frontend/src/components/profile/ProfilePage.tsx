import { useState } from 'react';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileOverview } from './sections/ProfileOverview';
import { ProfileSettings } from './sections/ProfileSettings';
import { ProfileMessages } from './sections/ProfileMessages';
import { ProfileDocuments } from './sections/ProfileDocuments';

interface ProfilePageProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function ProfilePage({ user, onNavigate }: ProfilePageProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ProfileOverview user={user} />;
      case 'settings':
        return <ProfileSettings user={user} />;
      case 'messages':
        return <ProfileMessages user={user} />;
      case 'documents':
        return <ProfileDocuments user={user} />;
      default:
        return <ProfileOverview user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <ProfileSidebar 
              user={user} 
              activeSection={activeSection} 
              onSectionChange={setActiveSection}
              onNavigate={onNavigate}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
