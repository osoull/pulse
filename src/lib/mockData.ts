export const mockData = {
  users: [
    {
      id: '1',
      email: 'admin@osoul.partners',
      name: 'Admin',
      role: 'admin',
      title: 'System Administrator',
      department: 'Management',
      status: 'active',
      permissions: {
        dashboard: true,
        funds: true,
        investors: true,
        analytics: true,
        crm: true,
        documents: true,
        kyc: true,
        settings: true,
        users: true,
        reports: true,
        capitalCalls: true,
        distributions: true,
        meetings: true,
        communications: true,
        portal: true
      },
      created_at: '2024-01-01T00:00:00Z',
      lastLogin: new Date().toISOString()
    },
    {
      id: '2',
      email: 'manager@osoul.partners',
      name: 'Investment Manager',
      role: 'manager',
      title: 'Investment Manager',
      department: 'Investments',
      status: 'active',
      permissions: {
        dashboard: true,
        funds: true,
        investors: true,
        analytics: true,
        crm: true,
        documents: true,
        kyc: true,
        reports: true,
        capitalCalls: true,
        distributions: true,
        meetings: true,
        communications: true
      },
      created_at: '2024-01-01T00:00:00Z',
      lastLogin: new Date().toISOString()
    }
  ],
  crm: {
    contacts: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '+1 234 567 8900',
        title: 'Investment Director',
        company: 'Global Pension Fund',
        source: 'direct',
        status: 'active',
        lastContactDate: '2024-02-15',
        tags: ['Institutional', 'LPAC Member']
      }
    ],
    activities: [
      {
        id: '1',
        contactId: '1',
        type: 'meeting',
        subject: 'Annual Review Meeting',
        description: 'Annual portfolio review and strategy discussion',
        date: '2024-02-15',
        duration: 60,
        outcome: 'Positive feedback received'
      }
    ],
    deals: [
      {
        id: '1',
        contactId: '1',
        title: 'Fund III Commitment',
        amount: 50000000,
        stage: 'Negotiation',
        probability: 75,
        expectedCloseDate: '2024-06-30',
        status: 'open',
        notes: 'Final documentation in progress'
      }
    ],
    providers: [
      {
        id: '1',
        name: 'Internal CRM',
        enabled: true,
        type: 'internal',
        status: 'active'
      }
    ],
    leads: [
      {
        id: '1',
        company: 'Tech Ventures Ltd',
        contactName: 'Sarah Johnson',
        email: 'sarah@techventures.com',
        phone: '+1 234 567 8901',
        source: 'conference',
        status: 'new',
        createdAt: '2024-02-15T10:00:00Z',
        updatedAt: '2024-02-15T10:00:00Z'
      }
    ],
    calls: [
      {
        id: '1',
        contactId: '1',
        contactName: 'John Smith',
        subject: 'Initial Discussion',
        scheduledAt: '2024-02-20T14:00:00Z',
        duration: 30,
        status: 'scheduled',
        notes: 'Discuss investment opportunities',
        createdAt: '2024-02-15T10:00:00Z',
        updatedAt: '2024-02-15T10:00:00Z'
      }
    ]
  },
  kyc: {
    reviews: [
      {
        id: '1',
        investor_id: '1',
        investor: {
          name: 'Global Pension Fund',
          type: 'Institutional'
        },
        risk_level: 'Low',
        status: 'Approved',
        last_review_date: '2024-01-15',
        next_review_date: '2025-01-15',
        documents: [
          {
            id: 'doc1',
            review_id: '1',
            name: 'Certificate of Incorporation',
            type: 'Legal',
            url: '#',
            status: 'Valid',
            created_at: '2024-01-15'
          }
        ],
        created_at: '2024-01-15',
        updated_at: '2024-01-15'
      },
      {
        id: '2',
        investor_id: '2',
        investor: {
          name: 'Family Investment Office',
          type: 'Family Office'
        },
        risk_level: 'Medium',
        status: 'Pending Review',
        last_review_date: '2024-02-01',
        next_review_date: '2024-05-01',
        documents: [],
        created_at: '2024-02-01',
        updated_at: '2024-02-01'
      }
    ]
  }
};