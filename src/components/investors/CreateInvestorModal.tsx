import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, User, Mail, Phone, MapPin, Building2, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { investorSchema } from '../../validations/schemas';
import RequiredLabel from '../common/RequiredLabel';
import FormError from '../common/FormError';

interface ContactForm {
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface CreateInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateInvestorModal({
  isOpen,
  onClose,
  onSubmit
}: CreateInvestorModalProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(investorSchema),
    mode: 'onBlur'
  });

  const [contacts, setContacts] = useState<ContactForm[]>([
    { name: '', title: '', email: '', phone: '', isPrimary: true }
  ]);

  if (!isOpen) return null;

  const handleFormSubmit = (data: any) => {
    const formData = {
      ...data,
      contacts: contacts
    };
    onSubmit(formData);
  };

  const addContact = () => {
    setContacts([...contacts, { name: '', title: '', email: '', phone: '', isPrimary: false }]);
  };

  const removeContact = (index: number) => {
    if (contacts.length > 1) {
      const newContacts = contacts.filter((_, i) => i !== index);
      setContacts(newContacts);
    }
  };

  const updateContact = (index: number, field: keyof ContactForm, value: string | boolean) => {
    const newContacts = contacts.map((contact, i) => {
      if (i === index) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setContacts(newContacts);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold dark:text-white">New Investor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RequiredLabel text="Investor Name" />
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('name')}
                  className="pl-10 input"
                  placeholder="Enter investor name"
                />
              </div>
              <FormError message={errors.name?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Investor Type" />
              <select
                {...register('type')}
                className="mt-1 input"
              >
                <option value="">Select type</option>
                <option value="Institutional">Institutional</option>
                <option value="Family Office">Family Office</option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
              </select>
              <FormError message={errors.type?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Address" />
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('address')}
                  className="pl-10 input"
                  placeholder="Enter complete address"
                />
              </div>
              <FormError message={errors.address?.message?.toString()} />
            </div>

            <div>
              <RequiredLabel text="Investment Capacity ($)" />
              <div className="mt-1 relative">
                <input
                  type="number"
                  {...register('investmentCapacity', { valueAsNumber: true })}
                  className="input"
                  placeholder="Enter amount in dollars"
                />
              </div>
              <FormError message={errors.investmentCapacity?.message?.toString()} />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium dark:text-white">Contacts</h3>
              <button
                type="button"
                onClick={addContact}
                className="btn-secondary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Contact</span>
              </button>
            </div>

            {contacts.map((contact, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium dark:text-white">
                    {contact.isPrimary ? 'Primary Contact' : `Contact ${index + 1}`}
                  </h4>
                  {!contact.isPrimary && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <RequiredLabel text="Name" />
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                      className="mt-1 input"
                      placeholder="Enter contact name"
                      required
                    />
                  </div>

                  <div>
                    <RequiredLabel text="Title" />
                    <input
                      type="text"
                      value={contact.title}
                      onChange={(e) => updateContact(index, 'title', e.target.value)}
                      className="mt-1 input"
                      placeholder="Enter job title"
                      required
                    />
                  </div>

                  <div>
                    <RequiredLabel text="Email" />
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateContact(index, 'email', e.target.value)}
                      className="mt-1 input"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div>
                    <RequiredLabel text="Phone" />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                      className="mt-1 input"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Investor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}