import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

export function VacancySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching with:', { searchTerm, location, jobType, salary });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search term */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Job title, company, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div>
          <Button onClick={handleSearch} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Advanced filters */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select value={salary} onValueChange={setSalary}>
              <SelectTrigger>
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Salary</SelectItem>
                <SelectItem value="0-2000">Up to €2,000</SelectItem>
                <SelectItem value="2000-3000">€2,000 - €3,000</SelectItem>
                <SelectItem value="3000-4000">€3,000 - €4,000</SelectItem>
                <SelectItem value="4000+">€4,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Experience</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                <SelectItem value="senior">Senior (5+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="License Required" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any License</SelectItem>
                <SelectItem value="b">B License</SelectItem>
                <SelectItem value="c">C License</SelectItem>
                <SelectItem value="ce">CE License</SelectItem>
                <SelectItem value="d">D License</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}