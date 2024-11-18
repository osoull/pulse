import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { LPACMember } from '../../../types/investorRelations';

interface LPACMembersProps {
  limit?: number;
}

const mockMembers: LPACMember[] = [
  {
    id: '1',
    investorId: '1',
    name: 'John Smith',
    organization: 'Global Pension Fund',
    email: 'john.smith@gpf.com',
    phone: '+1 234 567 8900',
    role: 'Chair',
    term: {
      start: '2023-01-01',
      end: '2024-12-31'
    },
    status: 'Active'
  },
  // Add more mock members as needed
];

export default function LPACMembers({ limit }: LPACMembersProps) {
  const members = limit ? mockMembers.slice(0, limit) : mockMembers;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">LPAC Members</h2>
        <a href="/investor-relations/lpac" className="text-primary hover:text-primary-dark text-sm">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{member.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {member.organization}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                member.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {member.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No LPAC members found</p>
          </div>
        )}
      </div>
    </div>
  );
}