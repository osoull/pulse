import { useState, useEffect } from 'react';
import { 
  InvestorInvitation, 
  InvestorInteraction, 
  InvestorPreference 
} from '../types/investorRelations';
import {
  sendInvitation,
  updateInvitationStatus,
  recordInteraction,
  getInvestorInteractions,
  updateInvestorPreferences,
  getInvestorPreferences
} from '../services/investorInteractionService';

export function useInvestorInteractions(investorId: string) {
  const [interactions, setInteractions] = useState<InvestorInteraction[]>([]);
  const [preferences, setPreferences] = useState<InvestorPreference | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadData();
  }, [investorId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [interactionsData, preferencesData] = await Promise.all([
        getInvestorInteractions(investorId),
        getInvestorPreferences(investorId)
      ]);

      setInteractions(interactionsData);
      setPreferences(preferencesData);
    } catch (err) {
      console.error('Error loading investor interactions:', err);
      setError(err instanceof Error ? err : new Error('Failed to load data'));
    } finally {
      setLoading(false);
    }
  };

  const sendNewInvitation = async (data: Partial<InvestorInvitation>) => {
    try {
      const result = await sendInvitation(data);
      await loadData();
      return result;
    } catch (err) {
      console.error('Error sending invitation:', err);
      throw err;
    }
  };

  const updateInvitation = async (id: string, status: 'Accepted' | 'Declined') => {
    try {
      const result = await updateInvitationStatus(id, status);
      await loadData();
      return result;
    } catch (err) {
      console.error('Error updating invitation:', err);
      throw err;
    }
  };

  const addInteraction = async (data: Partial<InvestorInteraction>) => {
    try {
      const result = await recordInteraction(data);
      await loadData();
      return result;
    } catch (err) {
      console.error('Error recording interaction:', err);
      throw err;
    }
  };

  const updatePrefs = async (data: Partial<InvestorPreference>) => {
    try {
      const result = await updateInvestorPreferences(investorId, data);
      setPreferences(result);
      return result;
    } catch (err) {
      console.error('Error updating preferences:', err);
      throw err;
    }
  };

  return {
    interactions,
    preferences,
    loading,
    error,
    sendInvitation: sendNewInvitation,
    updateInvitation,
    addInteraction,
    updatePreferences: updatePrefs,
    refresh: loadData
  };
}