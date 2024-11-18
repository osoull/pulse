import { Communication, CommunicationStats } from '../types/communications';

// Mock data for development
const mockCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    subject: 'Q4 2023 Performance Report',
    content: 'Dear Investors, The Q4 2023 performance report is now available...',
    sender: 'ir@osoul.partners',
    recipients: ['all'],
    status: 'sent',
    sentDate: '2024-02-15T10:00:00Z',
    metadata: {
      readBy: ['investor1', 'investor2'],
      deliveryStatus: {
        'investor1': 'delivered',
        'investor2': 'delivered'
      }
    }
  }
];

const mockStats: CommunicationStats = {
  total: 150,
  sent: 120,
  scheduled: 20,
  draft: 10,
  readRate: 85.5,
  deliveryRate: 98.2,
  byType: {
    email: 80,
    message: 45,
    announcement: 25
  }
};

export async function getCommunications(): Promise<Communication[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCommunications;
}

export async function getCommunicationStats(): Promise<CommunicationStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStats;
}

export async function createCommunication(data: Partial<Communication>): Promise<Communication> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newComm: Communication = {
    id: Math.random().toString(36).substr(2, 9),
    type: data.type || 'email',
    subject: data.subject || '',
    content: data.content || '',
    sender: data.sender || 'system@osoul.partners',
    recipients: data.recipients || [],
    status: data.status || 'draft',
    sentDate: data.sentDate,
    scheduledDate: data.scheduledDate,
    attachments: data.attachments || [],
    metadata: data.metadata || {}
  };

  mockCommunications.push(newComm);
  return newComm;
}

export async function updateCommunication(
  id: string, 
  data: Partial<Communication>
): Promise<Communication> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockCommunications.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Communication not found');

  mockCommunications[index] = {
    ...mockCommunications[index],
    ...data
  };

  return mockCommunications[index];
}

export async function deleteCommunication(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockCommunications.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Communication not found');

  mockCommunications.splice(index, 1);
}