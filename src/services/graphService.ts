import { Client } from '@microsoft/microsoft-graph-client';
import { msalInstance } from '../config/msalConfig';

export async function getAuthenticatedClient(): Promise<Client> {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    throw new Error('No accounts found');
  }

  const request = {
    scopes: ['Mail.Send', 'Mail.ReadWrite'],
    account: accounts[0]
  };

  const authResult = await msalInstance.acquireTokenSilent(request);

  return Client.init({
    authProvider: (done) => {
      done(null, authResult.accessToken);
    }
  });
}