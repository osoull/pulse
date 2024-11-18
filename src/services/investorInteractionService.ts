import { mockData } from '../lib/mockData';
import { 
  InvestorInvitation, 
  InvestorInteraction, 
  InvestorPreference 
} from '../types/investorRelations';

// Invitations
export async function sendInvitation(data: Partial<InvestorInvitation>): Promise<InvestorInvitation> {
  try {
    const newInvitation: InvestorInvitation = {
      id: Math.random().toString(36).substr(2, 9),
      investorId: data.investorId!,
      type: data.type!,
      status: 'Pending',
      subject: data.subject!,
      message: data.message!,
      sentDate: new Date().toISOString(),
      expiryDate: data.expiryDate,
      metadata: data.metadata || {}
    };

    // In a real app, this would send an email/notification
    console.log('Sending invitation:', newInvitation);

    mockData.invitations = [...(mockData.invitations || []), newInvitation];
    return newInvitation;
  } catch (error) {
    console.error('Error sending invitation:', error);
    throw error;
  }
}

export async function updateInvitationStatus(
  id: string, 
  status: 'Accepted' | 'Declined'
): Promise<InvestorInvitation> {
  try {
    const invitation = mockData.invitations?.find(inv => inv.id === id);
    if (!invitation) throw new Error('Invitation not found');

    invitation.status = status;
    invitation.responseDate = new Date().toISOString();

    return invitation;
  } catch (error) {
    console.error('Error updating invitation status:', error);
    throw error;
  }
}

// Interactions
export async function recordInteraction(data: Partial<InvestorInteraction>): Promise<InvestorInteraction> {
  try {
    const newInteraction: InvestorInteraction = {
      id: Math.random().toString(36).substr(2, 9),
      investorId: data.investorId!,
      type: data.type!,
      date: new Date().toISOString(),
      subject: data.subject!,
      description: data.description!,
      outcome: data.outcome,
      nextSteps: data.nextSteps,
      assignedTo: data.assignedTo,
      status: data.status || 'Completed'
    };

    mockData.interactions = [...(mockData.interactions || []), newInteraction];
    return newInteraction;
  } catch (error) {
    console.error('Error recording interaction:', error);
    throw error;
  }
}

export async function getInvestorInteractions(investorId: string): Promise<InvestorInteraction[]> {
  try {
    return mockData.interactions?.filter(int => int.investorId === investorId) || [];
  } catch (error) {
    console.error('Error fetching interactions:', error);
    throw error;
  }
}

// Preferences
export async function updateInvestorPreferences(
  investorId: string,
  preferences: Partial<InvestorPreference>
): Promise<InvestorPreference> {
  try {
    let investorPrefs = mockData.preferences?.find(pref => pref.investorId === investorId);
    
    if (!investorPrefs) {
      investorPrefs = {
        id: Math.random().toString(36).substr(2, 9),
        investorId,
        communicationFrequency: 'Monthly',
        preferredMethod: 'Email',
        reportFormat: 'PDF',
        subscriptions: {
          performance: true,
          capitalCalls: true,
          distributions: true,
          meetings: true
        },
        customFields: {}
      };
      mockData.preferences = [...(mockData.preferences || []), investorPrefs];
    }

    Object.assign(investorPrefs, preferences);
    return investorPrefs;
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
}

export async function getInvestorPreferences(investorId: string): Promise<InvestorPreference | null> {
  try {
    return mockData.preferences?.find(pref => pref.investorId === investorId) || null;
  } catch (error) {
    console.error('Error fetching preferences:', error);
    throw error;
  }
}