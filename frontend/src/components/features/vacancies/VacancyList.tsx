import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { MapPin, Clock, DollarSign, Truck, Users } from 'lucide-react';
import { apiClient } from '../../../services/apiClient';

interface VacancyListProps {
  user?: any;
  onNavigate: (page: string) => void;
}

export function VacancyList({ user, onNavigate }: VacancyListProps) {
  const [vacancies, setVacancies] = useState([
    {
      id: 1,
      title: 'Long Distance Truck Driver',
      company: 'Transport Solutions BV',
      location: 'Amsterdam, Netherlands',
      salary: '€3,200 - €3,800/month',
      type: 'Full-time',
      requirements: ['CE License', '2+ years experience', 'English proficiency'],
      description: 'We are looking for experienced truck drivers for long-distance routes across Europe.',
      postedDate: '2024-01-15',
      deadline: '2024-02-15'
    },
    {
      id: 2,
      title: 'Local Delivery Driver',
      company: 'Quick Logistics Ltd',
      location: 'Rotterdam, Netherlands',
      salary: '€2,500 - €2,900/month',
      type: 'Full-time',
      requirements: ['C License', 'Local area knowledge', 'Flexible schedule'],
      description: 'Join our team for local deliveries in the Rotterdam metropolitan area.',
      postedDate: '2024-01-18',
      deadline: '2024-02-18'
    },
    {
      id: 3,
      title: 'Warehouse Operator',
      company: 'Euro Storage Solutions',
      location: 'Utrecht, Netherlands',
      salary: '€2,200 - €2,600/month',
      type: 'Full-time',
      requirements: ['Forklift license', 'Physical fitness', 'Team player'],
      description: 'Warehouse operations including loading, unloading, and inventory management.',
      postedDate: '2024-01-20',
      deadline: '2024-02-20'
    }
  ]);

  const [loading, setLoading] = useState(false);

  const loadVacancies = async () => {
    setLoading(true);
    try {
      const response = await apiClient.public.getVacancies();
      if (response.success && response.data) {
        setVacancies(response.data);
      }
    } catch (error) {
      console.error('Error loading vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVacancies();
  }, []);

  const handleApply = (vacancyId: number) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    
    if (user.type !== 'driver') {
      alert('Only drivers can apply for positions.');
      return;
    }

    // Handle application logic
    alert('Application feature coming soon!');
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading vacancies...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {vacancies.map((vacancy) => (
        <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{vacancy.title}</CardTitle>
                <CardDescription className="text-lg font-medium text-blue-600">
                  {vacancy.company}
                </CardDescription>
              </div>
              <Badge variant="secondary">{vacancy.type}</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {/* Job details */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {vacancy.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {vacancy.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted {vacancy.postedDate}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700">{vacancy.description}</p>

              {/* Requirements */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {vacancy.requirements.map((req, index) => (
                    <Badge key={index} variant="outline">{req}</Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Apply before {vacancy.deadline}
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleApply(vacancy.id)}
                    disabled={!user || user.type !== 'driver'}
                  >
                    {!user ? 'Login to Apply' : user.type !== 'driver' ? 'Drivers Only' : 'Apply Now'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {vacancies.length === 0 && (
        <div className="text-center py-12">
          <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vacancies available</h3>
          <p className="text-gray-600">Check back later for new opportunities.</p>
        </div>
      )}
    </div>
  );
}