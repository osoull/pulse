import { CRMContact, CRMActivity, CRMDeal } from '../../types/crm';

export class SalesforceService {
  private baseUrl: string;
  private headers: Headers;

  constructor(apiKey: string, instanceUrl: string) {
    this.baseUrl = instanceUrl;
    this.headers = new Headers({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    });
  }

  async getContacts(): Promise<CRMContact[]> {
    try {
      const response = await fetch(`${this.baseUrl}/services/data/v57.0/query?q=${encodeURIComponent(
        'SELECT Id, FirstName, LastName, Email, Phone, Title, Account.Name FROM Contact'
      )}`, {
        headers: this.headers
      });

      if (!response.ok) throw new Error('Failed to fetch contacts');
      
      const data = await response.json();
      return data.records.map(this.mapContact);
    } catch (error) {
      console.error('Error fetching Salesforce contacts:', error);
      throw error;
    }
  }

  async createContact(contact: Partial<CRMContact>): Promise<CRMContact> {
    try {
      const response = await fetch(`${this.baseUrl}/services/data/v57.0/sobjects/Contact`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          FirstName: contact.firstName,
          LastName: contact.lastName,
          Email: contact.email,
          Phone: contact.phone,
          Title: contact.title
        })
      });

      if (!response.ok) throw new Error('Failed to create contact');
      
      const data = await response.json();
      return this.mapContact(data);
    } catch (error) {
      console.error('Error creating Salesforce contact:', error);
      throw error;
    }
  }

  async getActivities(contactId: string): Promise<CRMActivity[]> {
    try {
      const response = await fetch(`${this.baseUrl}/services/data/v57.0/query?q=${encodeURIComponent(
        `SELECT Id, Subject, Description, ActivityDate, Type, Status, WhoId 
         FROM Task 
         WHERE WhoId = '${contactId}'
         ORDER BY ActivityDate DESC`
      )}`, {
        headers: this.headers
      });

      if (!response.ok) throw new Error('Failed to fetch activities');
      
      const data = await response.json();
      return data.records.map(this.mapActivity);
    } catch (error) {
      console.error('Error fetching Salesforce activities:', error);
      throw error;
    }
  }

  async getDeals(contactId: string): Promise<CRMDeal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/services/data/v57.0/query?q=${encodeURIComponent(
        `SELECT Id, Name, Amount, StageName, Probability, CloseDate, IsClosed, IsWon,
                AccountId, Description
         FROM Opportunity 
         WHERE AccountId IN (
           SELECT AccountId 
           FROM Contact 
           WHERE Id = '${contactId}'
         )`
      )}`, {
        headers: this.headers
      });

      if (!response.ok) throw new Error('Failed to fetch deals');
      
      const data = await response.json();
      return data.records.map(this.mapDeal);
    } catch (error) {
      console.error('Error fetching Salesforce deals:', error);
      throw error;
    }
  }

  private mapContact(record: any): CRMContact {
    return {
      id: record.Id,
      firstName: record.FirstName || '',
      lastName: record.LastName || '',
      email: record.Email || '',
      phone: record.Phone,
      title: record.Title,
      company: record.Account?.Name,
      source: 'Salesforce',
      status: record.Status || 'Active'
    };
  }

  private mapActivity(record: any): CRMActivity {
    return {
      id: record.Id,
      contactId: record.WhoId,
      type: this.mapActivityType(record.Type),
      subject: record.Subject,
      description: record.Description,
      date: record.ActivityDate,
      outcome: record.Status
    };
  }

  private mapDeal(record: any): CRMDeal {
    return {
      id: record.Id,
      contactId: record.AccountId,
      title: record.Name,
      amount: record.Amount || 0,
      stage: record.StageName,
      probability: record.Probability || 0,
      expectedCloseDate: record.CloseDate,
      status: this.mapDealStatus(record),
      notes: record.Description
    };
  }

  private mapActivityType(type: string): CRMActivity['type'] {
    const typeMap: Record<string, CRMActivity['type']> = {
      'Call': 'call',
      'Email': 'email',
      'Meeting': 'meeting'
    };
    return typeMap[type] || 'note';
  }

  private mapDealStatus(record: any): 'open' | 'won' | 'lost' {
    if (!record.IsClosed) return 'open';
    return record.IsWon ? 'won' : 'lost';
  }
}