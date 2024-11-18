import React, { useState } from 'react';
import { Mail, Phone, Building2, Calendar, Tag } from 'lucide-react';
import { CRMContact, CRMActivity } from '../../types/crm';
import { format } from 'date-fns';
import ContactDetails from './ContactDetails';

interface ContactListProps {
  contacts: CRMContact[];
  activities: CRMActivity[];
  filter: string;
  onEditContact: (contact: CRMContact) => void;
  onDeleteContact: (id: string) => void;
  onAddActivity: (contactId: string) => void;
}

export default function ContactList({
  contacts,
  activities,
  filter,
  onEditContact,
  onDeleteContact,
  onAddActivity
}: ContactListProps) {
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);

  const filteredContacts = contacts.filter(contact => 
    filter === 'all' || contact.source?.toLowerCase() === filter
  );

  const getContactActivities = (contactId: string) => {
    return activities.filter(activity => activity.contactId === contactId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Contacts</h2>
      
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                </span>
              </div>
              
              <div>
                <h3 className="font-medium dark:text-white">
                  {contact.firstName} {contact.lastName}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  {contact.email && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-1" />
                      {contact.email}
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 mr-1" />
                      {contact.phone}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  {contact.company && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="w-4 h-4 mr-1" />
                      {contact.company}
                    </div>
                  )}
                  {contact.lastContactDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Last Contact: {format(new Date(contact.lastContactDate), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {contact.tags && contact.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <div className="flex space-x-1">
                    {contact.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {contact.tags.length > 2 && (
                      <span className="text-sm text-gray-500">
                        +{contact.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                contact.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              }`}>
                {contact.status || 'New'}
              </span>
            </div>
          </div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No contacts found</p>
          </div>
        )}
      </div>

      {selectedContact && (
        <ContactDetails
          contact={selectedContact}
          activities={getContactActivities(selectedContact.id)}
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          onEdit={() => {
            onEditContact(selectedContact);
            setSelectedContact(null);
          }}
          onDelete={() => {
            onDeleteContact(selectedContact.id);
            setSelectedContact(null);
          }}
          onAddActivity={() => {
            onAddActivity(selectedContact.id);
            setSelectedContact(null);
          }}
        />
      )}
    </div>
  );
}