import { Client } from '@microsoft/microsoft-graph-client';
import { getAuthenticatedClient } from './graphService';

export interface EmailMessage {
  subject: string;
  body: string;
  toRecipients: string[];
  attachments?: {
    name: string;
    contentType: string;
    contentBytes: string;
  }[];
}

export async function sendEmail(message: EmailMessage) {
  try {
    const client = await getAuthenticatedClient();
    
    const mailBody = {
      message: {
        subject: message.subject,
        body: {
          contentType: 'HTML',
          content: message.body
        },
        toRecipients: message.toRecipients.map(email => ({
          emailAddress: { address: email }
        })),
        attachments: message.attachments?.map(attachment => ({
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: attachment.name,
          contentType: attachment.contentType,
          contentBytes: attachment.contentBytes
        }))
      }
    };

    await client.api('/me/sendMail').post(mailBody);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function getDraftEmails() {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.api('/me/messages')
      .filter("isDraft eq true")
      .select('subject,receivedDateTime,bodyPreview')
      .get();
    return response.value;
  } catch (error) {
    console.error('Error fetching draft emails:', error);
    throw error;
  }
}

export async function saveDraft(message: EmailMessage) {
  try {
    const client = await getAuthenticatedClient();
    
    const draftMessage = {
      subject: message.subject,
      body: {
        contentType: 'HTML',
        content: message.body
      },
      toRecipients: message.toRecipients.map(email => ({
        emailAddress: { address: email }
      }))
    };

    await client.api('/me/messages').post(draftMessage);
    return true;
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
}

export async function getEmailTemplates() {
  // In a real app, this would fetch email templates from your backend
  return [
    {
      id: 'quarterly-update',
      name: 'Quarterly Update',
      subject: 'Quarterly Investment Update - [Fund Name]',
      body: `Dear [Investor Name],

We hope this email finds you well. Please find attached our quarterly update for [Fund Name].

Key Highlights:
- Portfolio Performance
- Investment Updates
- Market Overview
- Upcoming Events

Best regards,
[Your Name]`
    },
    {
      id: 'capital-call',
      name: 'Capital Call Notice',
      subject: 'Capital Call Notice - [Fund Name]',
      body: `Dear [Investor Name],

This email serves as formal notice for a capital call for [Fund Name].

Details:
- Call Amount: $[Amount]
- Due Date: [Date]
- Purpose: [Purpose]

Please refer to the attached notice for complete details and wire instructions.

Best regards,
[Your Name]`
    }
  ];
}