import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Mail, Phone, Building2, Calendar, Tag, Edit, Trash2, Plus } from 'lucide-react';
import { CRMContact, CRMActivity } from '../../types/crm';
import { format } from 'date-fns';

interface ContactDetailsProps {
  contact: CRMContact;
  activities: CRMActivity[];
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddActivity: () => void;
}

export default function ContactDetails({
  contact,
  activities,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onAddActivity
}: ContactDetailsProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
          <div className="flex justify-between items-start p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                {contact.firstName} {contact.lastName}
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">{contact.title}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-red-400 hover:text-red-500 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <a href={`mailto:${contact.email}`} className="hover:text-primary">
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building2 className="w-5 h-5" />
                    <span>{contact.company}</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Last Contact: {format(new Date(contact.lastContactDate || ''), 'PP')}</span>
                </div>
                {contact.source && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Tag className="w-5 h-5" />
                    <span className="capitalize">{contact.source}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    contact.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium dark:text-white">Activity History</h3>
                <button
                  onClick={onAddActivity}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Activity</span>
                </button>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium dark:text-white">{activity.subject}</h4>
                        {activity.description && (
                          <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(new Date(activity.date), 'PP')}
                      </span>
                    </div>
                    {activity.outcome && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Outcome:</span> {activity.outcome}
                      </p>
                    )}
                  </div>
                ))}

                {activities.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No activities recorded yet</p>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}