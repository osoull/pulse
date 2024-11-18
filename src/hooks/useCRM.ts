import { useState, useEffect } from 'react';
import { CRMContact, CRMActivity, CRMDeal, CRMProvider } from '../types/crm';
import { getCRMData, createContact, createActivity, createDeal, updateDeal, getProviders } from '../services/crmService';

export function useCRM() {
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [deals, setDeals] = useState<CRMDeal[]>([]);
  const [providers, setProviders] = useState<CRMProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadCRMData();
  }, []);

  const loadCRMData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [crmData, providerData] = await Promise.all([
        getCRMData(),
        getProviders()
      ]);

      setContacts(crmData.contacts || []);
      setActivities(crmData.activities || []);
      setDeals(crmData.deals || []);
      setProviders(providerData || []);
    } catch (err) {
      console.error('Error loading CRM data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load CRM data'));
      // Set empty arrays to prevent undefined errors
      setContacts([]);
      setActivities([]);
      setDeals([]);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the hook implementation remains unchanged

  return {
    contacts,
    activities,
    deals,
    providers,
    loading,
    error,
    refresh: loadCRMData,
    createContact,
    createActivity,
    createDeal,
    updateDeal
  };
}