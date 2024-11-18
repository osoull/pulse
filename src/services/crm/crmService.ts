import { supabase } from '../../lib/supabase';
import { CRMProvider, CRMContact, CRMActivity, CRMDeal } from '../../types/crm';
import { SalesforceService } from './salesforce';
import { HubSpotService } from './hubspot';

export class CRMService {
  private static instance: CRMService;
  private providers: Map<string, SalesforceService | HubSpotService> = new Map();

  private constructor() {}

  static getInstance(): CRMService {
    if (!CRMService.instance) {
      CRMService.instance = new CRMService();
    }
    return CRMService.instance;
  }

  async initialize() {
    try {
      const { data: providers, error } = await supabase
        .from('crm_providers')
        .select('*')
        .eq('enabled', true);

      if (error) throw error;

      providers?.forEach(provider => {
        if (provider.api_key) {
          switch (provider.name) {
            case 'Salesforce':
              this.providers.set(
                provider.name,
                new SalesforceService(provider.api_key, provider.base_url!)
              );
              break;
            case 'HubSpot':
              this.providers.set(
                provider.name,
                new HubSpotService(provider.api_key)
              );
              break;
          }
        }
      });
    } catch (error) {
      console.error('Error initializing CRM service:', error);
      throw error;
    }
  }

  async getProviders(): Promise<CRMProvider[]> {
    try {
      const { data, error } = await supabase
        .from('crm_providers')
        .select('*');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching CRM providers:', error);
      throw error;
    }
  }

  async enableProvider(provider: CRMProvider) {
    try {
      const { error } = await supabase
        .from('crm_providers')
        .update({ enabled: true, ...provider })
        .eq('name', provider.name);

      if (error) throw error;

      if (provider.apiKey) {
        switch (provider.name) {
          case 'Salesforce':
            this.providers.set(
              provider.name,
              new SalesforceService(provider.apiKey, provider.baseUrl!)
            );
            break;
          case 'HubSpot':
            this.providers.set(
              provider.name,
              new HubSpotService(provider.apiKey)
            );
            break;
        }
      }
    } catch (error) {
      console.error('Error enabling CRM provider:', error);
      throw error;
    }
  }

  async disableProvider(providerName: string) {
    try {
      const { error } = await supabase
        .from('crm_providers')
        .update({ enabled: false })
        .eq('name', providerName);

      if (error) throw error;

      this.providers.delete(providerName);
    } catch (error) {
      console.error('Error disabling CRM provider:', error);
      throw error;
    }
  }

  async syncAll() {
    try {
      for (const [name, provider] of this.providers) {
        await Promise.all([
          this.syncContacts(name, provider),
          this.syncActivities(name, provider),
          this.syncDeals(name, provider)
        ]);
      }
    } catch (error) {
      console.error('Error syncing CRM data:', error);
      throw error;
    }
  }

  private async syncContacts(providerName: string, provider: any) {
    const contacts = await provider.getContacts();
    await supabase
      .from('crm_contacts')
      .upsert(
        contacts.map((contact: CRMContact) => ({
          provider_name: providerName,
          external_id: contact.id,
          ...contact
        }))
      );
  }

  private async syncActivities(providerName: string, provider: any) {
    const activities = await provider.getActivities();
    await supabase
      .from('crm_activities')
      .upsert(
        activities.map((activity: CRMActivity) => ({
          provider_name: providerName,
          external_id: activity.id,
          ...activity
        }))
      );
  }

  private async syncDeals(providerName: string, provider: any) {
    const deals = await provider.getDeals();
    await supabase
      .from('crm_deals')
      .upsert(
        deals.map((deal: CRMDeal) => ({
          provider_name: providerName,
          external_id: deal.id,
          ...deal
        }))
      );
  }
}