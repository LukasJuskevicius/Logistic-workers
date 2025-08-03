import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Alert, AlertDescription } from '../../ui/alert';
import { apiClient } from '../../../services/apiClient';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await apiClient.public.submitContact(formData);
      
      if (response.success) {
        setMessage({
          type: 'success',
          text: 'Thank you for your message! We will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          userType: ''
        });
      } else {
        setMessage({
          type: 'error',
          text: response.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="userType">I am a</Label>
          <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driver">Driver looking for work</SelectItem>
              <SelectItem value="client">Employer looking for drivers</SelectItem>
              <SelectItem value="partner">Potential partner</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="mt-1"
            placeholder="Brief description of your inquiry"
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="mt-1"
            rows={6}
            placeholder="Please provide details about your inquiry..."
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
}