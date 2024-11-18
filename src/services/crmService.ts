import { CRMContact, CRMActivity, CRMDeal, CRMProvider, Lead, Call } from '../types/crm';
import { mockData } from '../lib/mockData';

const defaultCRMData = {
  contacts: [],
  activities: [],
  deals: [],
  providers: [],
  leads: [],
  calls: []
};

export async function getCRMData() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!mockData.crm) {
      console.warn('No CRM data found, using default data');
      return defaultCRMData;
    }
    
    return {
      contacts: mockData.crm.contacts || [],
      activities: mockData.crm.activities || [],
      deals: mockData.crm.deals || [],
      providers: mockData.crm.providers || [],
      leads: mockData.crm.leads || [],
      calls: mockData.crm.calls || []
    };
  } catch (error) {
    console.error('Error loading CRM data:', error);
    return defaultCRMData;
  }
}

export async function getProviders(): Promise<CRMProvider[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!mockData.crm?.providers) {
      console.warn('No CRM providers found');
      return [];
    }
    
    return mockData.crm.providers;
  } catch (error) {
    console.error('Error fetching CRM providers:', error);
    return [];
  }
}

export async function createContact(data: Partial<CRMContact>): Promise<CRMContact> {
  try {
    const newContact: CRMContact = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone,
      title: data.title,
      company: data.company,
      source: data.source || 'direct',
      status: 'active',
      lastContactDate: new Date().toISOString(),
      tags: data.tags || []
    };

    if (!mockData.crm) {
      mockData.crm = defaultCRMData;
    }

    if (!mockData.crm.contacts) {
      mockData.crm.contacts = [];
    }

    mockData.crm.contacts.push(newContact);
    return newContact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}

export async function createActivity(data: Partial<CRMActivity>): Promise<CRMActivity> {
  try {
    const newActivity: CRMActivity = {
      id: Math.random().toString(36).substr(2, 9),
      contactId: data.contactId || '',
      type: data.type || 'note',
      subject: data.subject || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      duration: data.duration,
      outcome: data.outcome
    };

    if (!mockData.crm) {
      mockData.crm = defaultCRMData;
    }

    if (!mockData.crm.activities) {
      mockData.crm.activities = [];
    }

    mockData.crm.activities.push(newActivity);
    return newActivity;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
}

export async function createDeal(data: Partial<CRMDeal>): Promise<CRMDeal> {
  try {
    const newDeal: CRMDeal = {
      id: Math.random().toString(36).substr(2, 9),
      contactId: data.contactId || '',
      title: data.title || '',
      amount: data.amount || 0,
      stage: data.stage || 'Qualification',
      probability: data.probability || 0,
      expectedCloseDate: data.expectedCloseDate || new Date().toISOString(),
      status: 'open',
      notes: data.notes
    };

    if (!mockData.crm) {
      mockData.crm = defaultCRMData;
    }

    if (!mockData.crm.deals) {
      mockData.crm.deals = [];
    }

    mockData.crm.deals.push(newDeal);
    return newDeal;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
}

export async function updateDeal(id: string, data: Partial<CRMDeal>): Promise<CRMDeal> {
  try {
    if (!mockData.crm?.deals) {
      throw new Error('No deals found');
    }

    const index = mockData.crm.deals.findIndex(deal => deal.id === id);
    if (index === -1) throw new Error('Deal not found');

    mockData.crm.deals[index] = {
      ...mockData.crm.deals[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    return mockData.crm.deals[index];
  } catch (error) {
    console.error('Error updating deal:', error);
    throw error;
  }
}

export async function createLead(data: Partial<Lead>): Promise<Lead> {
  try {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      company: data.company || '',
      contactName: data.contactName || '',
      email: data.email || '',
      phone: data.phone,
      source: data.source || 'direct',
      status: 'new',
      notes: data.notes,
      assignedTo: data.assignedTo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!mockData.crm) {
      mockData.crm = defaultCRMData;
    }

    if (!mockData.crm.leads) {
      mockData.crm.leads = [];
    }

    mockData.crm.leads.push(newLead);
    return newLead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

export async function createCall(data: Partial<Call>): Promise<Call> {
  try {
    const newCall: Call = {
      id: Math.random().toString(36).substr(2, 9),
      contactId: data.contactId || '',
      contactName: data.contactName || '',
      subject: data.subject || '',
      scheduledAt: data.scheduledAt || new Date().toISOString(),
      duration: data.duration || 30,
      status: 'scheduled',
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!mockData.crm) {
      mockData.crm = defaultCRMData;
    }

    if (!mockData.crm.calls) {
      mockData.crm.calls = [];
    }

    mockData.crm.calls.push(newCall);
    return newCall;
  } catch (error) {
    console.error('Error creating call:', error);
    throw error;
  }
}