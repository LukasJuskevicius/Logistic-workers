import React, { useState, useEffect } from 'react';
import { Search, Users, FileText, Briefcase, MessageSquare, Award, Settings, Home, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, User, Mail, Phone, Calendar, Download, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  user: any;
}

// Mock data for demonstration
const mockDriverApplications = [
  {
    id: 1,
    name: 'Jonas Petraitis',
    email: 'jonas.p@email.com',
    phone: '+37060123456',
    dateSubmitted: '2024-01-15',
    status: 'new',
    experience: '5 years',
    license: 'CE',
    documents: ['CV.pdf', 'License.pdf', 'Medical_Certificate.pdf'],
    notes: ''
  },
  {
    id: 2,
    name: 'Mykola Kovalenko',
    email: 'mykola.k@email.com',
    phone: '+38050123456',
    dateSubmitted: '2024-01-14',
    status: 'under_review',
    experience: '8 years',
    license: 'C+E',
    documents: ['CV.pdf', 'License.pdf'],
    notes: 'Experienced driver, good references'
  },
  {
    id: 3,
    name: 'Andrius Kazlauskas',
    email: 'andrius.k@email.com',
    phone: '+37061234567',
    dateSubmitted: '2024-01-12',
    status: 'approved',
    experience: '3 years',
    license: 'C',
    documents: ['CV.pdf', 'License.pdf', 'Medical_Certificate.pdf'],
    notes: 'Approved for local routes'
  }
];

const mockJobRequests = [
  {
    id: 1,
    clientName: 'Transport Solutions BV',
    clientEmail: 'hr@transportsolutions.nl',
    jobTitle: 'Long Distance Truck Driver',
    location: 'Amsterdam - Berlin',
    dateSubmitted: '2024-01-16',
    status: 'new',
    urgency: 'high',
    requirements: 'CE license, 5+ years experience',
    salary: '€3500-4000/month',
    notes: ''
  },
  {
    id: 2,
    clientName: 'Euro Logistics',
    clientEmail: 'jobs@eurologistics.com',
    jobTitle: 'Regional Delivery Driver',
    location: 'Rotterdam area',
    dateSubmitted: '2024-01-15',
    status: 'active',
    urgency: 'medium',
    requirements: 'C license, clean record',
    salary: '€2800-3200/month',
    notes: 'Looking for 2 drivers'
  }
];

const mockUsers = [
  {
    id: 1,
    name: 'Jonas Petraitis',
    email: 'jonas.p@email.com',
    type: 'driver',
    status: 'active',
    registrationDate: '2024-01-10',
    lastLogin: '2024-01-20'
  },
  {
    id: 2,
    name: 'Transport Solutions BV',
    email: 'hr@transportsolutions.nl',
    type: 'client',
    status: 'pending',
    registrationDate: '2024-01-18',
    lastLogin: 'Never'
  }
];

const mockVacancies = [
  {
    id: 1,
    title: 'International Truck Driver - Amsterdam',
    location: 'Amsterdam, Netherlands',
    type: 'Full-time',
    status: 'active',
    datePosted: '2024-01-15',
    applications: 12
  },
  {
    id: 2,
    title: 'Local Delivery Driver - Rotterdam',
    location: 'Rotterdam, Netherlands',
    type: 'Part-time',
    status: 'inactive',
    datePosted: '2024-01-10',
    applications: 8
  }
];

const mockTestimonials = [
  {
    id: 1,
    driverName: 'Jonas Petraitis',
    content: 'Working with Logistic Workers has been an amazing experience. They found me a great position in the Netherlands and helped with all the paperwork.',
    dateSubmitted: '2024-01-16',
    status: 'pending'
  },
  {
    id: 2,
    driverName: 'Andrius Kazlauskas',
    content: 'Professional service and great support throughout the process. Highly recommended!',
    dateSubmitted: '2024-01-14',
    status: 'approved'
  }
];

const recentActivities = [
  { id: 1, type: 'new_driver', message: 'New driver registered: Jonas Petraitis', time: '2 hours ago' },
  { id: 2, type: 'job_request', message: 'New job request from: Transport Solutions BV', time: '4 hours ago' },
  { id: 3, type: 'application_review', message: 'Driver Mykola Kovalenko application updated', time: '1 day ago' },
  { id: 4, type: 'testimonial', message: 'New testimonial submitted by Jonas Petraitis', time: '2 days ago' }
];

export function AdminDashboard({ onNavigate, user }: AdminDashboardProps): React.ReactElement {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dashboard metrics
  const driverStats = {
    new: mockDriverApplications.filter(app => app.status === 'new').length,
    underReview: mockDriverApplications.filter(app => app.status === 'under_review').length,
    approved: mockDriverApplications.filter(app => app.status === 'approved').length,
    rejected: mockDriverApplications.filter(app => app.status === 'rejected').length
  };

  const jobStats = {
    new: mockJobRequests.filter(req => req.status === 'new').length,
    active: mockJobRequests.filter(req => req.status === 'active').length,
    fulfilled: mockJobRequests.filter(req => req.status === 'fulfilled').length,
    archived: mockJobRequests.filter(req => req.status === 'archived').length
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', label: 'New' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      under_review: { color: 'bg-orange-100 text-orange-800', label: 'Under Review' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      fulfilled: { color: 'bg-purple-100 text-purple-800', label: 'Fulfilled' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' }
    };
    
    const config = statusConfig[status] || statusConfig.new;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mb-8">
          Welcome to the Logistic Workers admin dashboard. Here you can manage driver applications, client job requests, and website content.
        </p>
      </div>

      {/* Enhanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Driver Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">New</span>
                <span className="text-sm font-semibold text-blue-600">{driverStats.new}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Under Review</span>
                <span className="text-sm font-semibold text-orange-600">{driverStats.underReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Approved</span>
                <span className="text-sm font-semibold text-green-600">{driverStats.approved}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Job Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">New</span>
                <span className="text-sm font-semibold text-blue-600">{jobStats.new}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Active</span>
                <span className="text-sm font-semibold text-green-600">{jobStats.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Fulfilled</span>
                <span className="text-sm font-semibold text-purple-600">{jobStats.fulfilled}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Vacancies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {mockVacancies.filter(v => v.status === 'active').length}
            </div>
            <p className="text-xs text-gray-500">Job postings live</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {mockTestimonials.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-500">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                onClick={() => setActiveSection('applications')}
                className="w-full justify-start"
                variant="outline"
              >
                <FileText className="w-4 h-4 mr-2" />
                Review Applications ({driverStats.new} new)
              </Button>
              <Button
                onClick={() => setActiveSection('job-requests')}
                className="w-full justify-start"
                variant="outline"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Manage Job Requests ({jobStats.new} new)
              </Button>
              <Button
                onClick={() => setActiveSection('vacancies')}
                className="w-full justify-start"
                variant="outline"
              >
                <Award className="w-4 h-4 mr-2" />
                Post New Vacancy
              </Button>
              <Button
                onClick={() => setActiveSection('users')}
                className="w-full justify-start"
                variant="outline"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage all registered users and pending registrations</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="pending">Pending ({mockUsers.filter(u => u.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {mockUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            Type: {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            Registered: {user.registrationDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(user.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {user.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="space-y-4">
            {mockUsers.filter(u => u.status === 'pending').map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Awaiting approval since {user.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers">
          <p className="text-gray-600">Driver-specific management interface would be here...</p>
        </TabsContent>

        <TabsContent value="clients">
          <p className="text-gray-600">Client-specific management interface would be here...</p>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderApplicationReview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Driver Application Review</h2>
          <p className="text-gray-600">Review and manage driver applications</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockDriverApplications.map((application) => (
          <Card key={application.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{application.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {application.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {application.phone}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {application.dateSubmitted}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(application.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Experience:</span>
                  <p className="text-sm text-gray-600">{application.experience}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">License:</span>
                  <p className="text-sm text-gray-600">{application.license}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Documents:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {application.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {application.notes && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Admin Notes:</span>
                  <p className="text-sm text-gray-600 mt-1">{application.notes}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download Docs
                </Button>
                {application.status === 'new' && (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderJobRequests = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Job Request Management</h2>
          <p className="text-gray-600">Manage client job requests and match with drivers</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockJobRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{request.jobTitle}</h3>
                  <p className="text-gray-600">{request.clientName}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <span>{request.location}</span>
                    <span>{request.salary}</span>
                    <span>Posted: {request.dateSubmitted}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(request.status)}
                  <Badge className={request.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                    {request.urgency} priority
                  </Badge>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Requirements:</span>
                <p className="text-sm text-gray-600 mt-1">{request.requirements}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View Full Request
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="w-4 h-4 mr-1" />
                  Find Matching Drivers
                </Button>
                <Button size="sm" variant="outline">
                  <Award className="w-4 h-4 mr-1" />
                  Post as Vacancy
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contact Client
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderVacancyManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Vacancy Management</h2>
          <p className="text-gray-600">Create and manage job vacancy postings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Award className="w-4 h-4 mr-2" />
          Create New Vacancy
        </Button>
      </div>

      <div className="grid gap-4">
        {mockVacancies.map((vacancy) => (
          <Card key={vacancy.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{vacancy.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <span>{vacancy.location}</span>
                    <span>{vacancy.type}</span>
                    <span>Posted: {vacancy.datePosted}</span>
                    <span>{vacancy.applications} applications</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(vacancy.status)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View Vacancy
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="w-4 h-4 mr-1" />
                  Applications ({vacancy.applications})
                </Button>
                {vacancy.status === 'active' ? (
                  <Button size="sm" variant="outline">
                    Deactivate
                  </Button>
                ) : (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Activate
                  </Button>
                )}
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTestimonialManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Testimonial Management</h2>
          <p className="text-gray-600">Review and manage driver testimonials</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockTestimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{testimonial.driverName}</h3>
                    {getStatusBadge(testimonial.status)}
                  </div>
                  <p className="text-gray-600 mb-2">{testimonial.content}</p>
                  <p className="text-sm text-gray-500">Submitted: {testimonial.dateSubmitted}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {testimonial.status === 'pending' && (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                {testimonial.status === 'approved' && (
                  <Button size="sm" variant="outline">
                    Unpublish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'users':
        return renderUserManagement();
      case 'applications':
        return renderApplicationReview();
      case 'job-requests':
        return renderJobRequests();
      case 'vacancies':
        return renderVacancyManagement();
      case 'testimonials':
        return renderTestimonialManagement();
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Logistic Workers</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === 'dashboard' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('users')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === 'users' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4 mr-3" />
                User Management
                {mockUsers.filter(u => u.status === 'pending').length > 0 && (
                  <Badge className="ml-auto bg-red-100 text-red-800">
                    {mockUsers.filter(u => u.status === 'pending').length}
                  </Badge>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('applications')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === 'applications' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4 mr-3" />
                Applications
                {driverStats.new > 0 && (
                  <Badge className="ml-auto bg-blue-100 text-blue-800">
                    {driverStats.new}
                  </Badge>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('job-requests')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === 'job-requests' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-4 h-4 mr-3" />
                Job Requests
                {jobStats.new > 0 && (
                  <Badge className="ml-auto bg-blue-100 text-blue-800">
                    {jobStats.new}
                  </Badge>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('vacancies')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === 'vacancies' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Award className="w-4 h-4 mr-3" />
                Vacancies
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('testimonials')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === 'testimonials' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                Testimonials
                {mockTestimonials.filter(t => t.status === 'pending').length > 0 && (
                  <Badge className="ml-auto bg-yellow-100 text-yellow-800">
                    {mockTestimonials.filter(t => t.status === 'pending').length}
                  </Badge>
                )}
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button 
            onClick={() => onNavigate('home')} 
            className="w-full justify-start"
            variant="outline"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Website
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}