import React, { useState } from 'react';
import { Mail, Phone, Calendar, MessageCircle, ChevronRight, Plus, Send } from 'lucide-react';
import { format } from 'date-fns';
import { InvestorInteraction } from '../../../types/investorRelations';
import { useInvestorInteractions } from '../../../hooks/useInvestorInteractions';
import SendInvitationModal from '../invitations/SendInvitationModal';
import InvestorPreferencesModal from '../preferences/InvestorPreferencesModal';
import CreateInteractionModal from './CreateInteractionModal';
import ComposeEmailModal from '../../email/ComposeEmailModal';

interface InvestorInteractionsListProps {
  investorId: string;
  investorName: string;
}

export default function InvestorInteractionsList({
  investorId,
  investorName
}: InvestorInteractionsListProps) {
  const {
    interactions,
    preferences,
    loading,
    error,
    sendInvitation,
    addInteraction,
    updatePreferences
  } = useInvestorInteractions(investorId);

  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isCreateInteractionModalOpen, setIsCreateInteractionModalOpen] = useState(false);
  const [isComposeEmailModalOpen, setIsComposeEmailModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading interactions. Please try again.
      </div>
    );
  }

  const filteredInteractions = selectedType === 'all'
    ? interactions
    : interactions.filter(interaction => interaction.type === selectedType);

  const getInteractionIcon = (type: InvestorInteraction['type']) => {
    switch (type) {
      case 'Email':
        return <Mail className="w-5 h-5" />;
      case 'Call':
        return <Phone className="w-5 h-5" />;
      case 'Meeting':
        return <Calendar className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  const handleEmailSent = async (emailData: any) => {
    // Record the email interaction
    await addInteraction({
      investorId,
      type: 'Email',
      subject: emailData.subject,
      description: 'Email sent via Outlook',
      date: new Date().toISOString(),
      status: 'Completed'
    });
    setIsComposeEmailModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Interactions & Communications</h2>
          <p className="text-sm text-gray-500">Track all interactions with {investorName}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsComposeEmailModalOpen(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Compose Email</span>
          </button>
          <button
            onClick={() => setIsPreferencesModalOpen(true)}
            className="btn-secondary"
          >
            Communication Preferences
          </button>
          <button
            onClick={() => setIsInvitationModalOpen(true)}
            className="btn-secondary"
          >
            Send Invitation
          </button>
          <button
            onClick={() => setIsCreateInteractionModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Interaction</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input py-1"
          >
            <option value="all">All Types</option>
            <option value="Email">Email</option>
            <option value="Call">Call</option>
            <option value="Meeting">Meeting</option>
            <option value="Portal">Portal</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredInteractions.map((interaction) => (
          <div
            key={interaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                {getInteractionIcon(interaction.type)}
              </div>
              <div>
                <h3 className="font-medium">{interaction.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">{interaction.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm text-gray-500">
                    {format(new Date(interaction.date), 'MMM d, yyyy')}
                  </span>
                  {interaction.assignedTo && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        Assigned to: {interaction.assignedTo}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                interaction.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : interaction.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {interaction.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}

        {filteredInteractions.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No interactions found</p>
          </div>
        )}
      </div>

      <SendInvitationModal
        isOpen={isInvitationModalOpen}
        onClose={() => setIsInvitationModalOpen(false)}
        onSubmit={async (data) => {
          await sendInvitation(data);
          setIsInvitationModalOpen(false);
        }}
        investorId={investorId}
        investorName={investorName}
      />

      <InvestorPreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
        onSubmit={async (data) => {
          await updatePreferences(data);
          setIsPreferencesModalOpen(false);
        }}
        preferences={preferences}
        investorId={investorId}
      />

      <CreateInteractionModal
        isOpen={isCreateInteractionModalOpen}
        onClose={() => setIsCreateInteractionModalOpen(false)}
        onSubmit={async (data) => {
          await addInteraction({
            ...data,
            investorId,
            status: 'Completed'
          });
          setIsCreateInteractionModalOpen(false);
        }}
        investorName={investorName}
      />

      <ComposeEmailModal
        isOpen={isComposeEmailModalOpen}
        onClose={() => setIsComposeEmailModalOpen(false)}
        onSubmit={handleEmailSent}
        defaultRecipients={[preferences?.email || '']}
        defaultSubject=""
        defaultBody=""
      />
    </div>
  );
}