import React, { useState } from 'react';
import { Calendar, Video, Users, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { InvestorMeeting } from '../../../types/investorRelations';
import CreateMeetingModal from './CreateMeetingModal';
import { useCRM } from '../../../hooks/useCRM';

interface MeetingsListProps {
  limit?: number;
}

export default function MeetingsList({ limit }: MeetingsListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { createActivity } = useCRM();
  const [meetings, setMeetings] = useState<InvestorMeeting[]>([
    {
      id: '1',
      title: 'Annual General Meeting 2024',
      type: 'AGM',
      date: '2024-04-15',
      startTime: '09:00',
      endTime: '12:00',
      location: 'Grand Hotel Conference Center',
      virtualLink: 'https://zoom.us/j/123456789',
      status: 'Scheduled',
      attendees: ['all'],
      agenda: ['Annual Performance Review', 'Portfolio Updates', 'Q&A Session'],
      materials: ['presentation.pdf', 'financials.pdf']
    }
  ]);

  const handleCreateMeeting = async (data: any) => {
    try {
      // Create new meeting
      const newMeeting = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        status: 'Scheduled'
      };
      setMeetings([...meetings, newMeeting]);

      // Create corresponding CRM activity
      await createActivity({
        type: 'meeting',
        subject: data.title,
        description: `${data.type} Meeting - ${data.isVirtual ? 'Virtual' : 'On-site'}`,
        date: `${data.date}T${data.startTime}`,
        duration: calculateDuration(data.startTime, data.endTime),
        status: 'scheduled'
      });

      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Investor Meetings</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </button>
          {!limit && (
            <a href="/investor-relations/meetings" className="text-primary hover:text-primary-dark text-sm">
              View All
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {meetings.slice(0, limit).map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                {meeting.virtualLink ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{meeting.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {format(new Date(meeting.date), 'MMM d, yyyy')}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {meeting.startTime} - {meeting.endTime}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {meeting.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                meeting.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : meeting.status === 'Scheduled'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {meeting.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {meetings.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No meetings scheduled</p>
          </div>
        )}
      </div>

      <CreateMeetingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateMeeting}
      />
    </div>
  );
}