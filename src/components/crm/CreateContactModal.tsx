import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Mail, Phone, Building2 } from 'lucide-react';
import { z } from 'zod';
import { useCRM } from '../../hooks/useCRM';
import RequiredLabel from '../common/RequiredLabel';
import FormError from '../common/FormError';

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  title: z.string().optional(),
  company: z.string().optional(),
  type: z.enum(['LP', 'Prospect', 'Co-investor', 'Advisor']),
  source: z.enum(['direct', 'referral', 'conference', 'existing-lp'])
});

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateContactModal({ isOpen, onClose }: CreateContactModalProps) {
  const { createContact } = useCRM();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: 'Prospect',
      source: 'direct'
    }
  });

  if (!isOpen) return null;

  const handleFormSubmit = async (data: any) => {
    try {
      await createContact(data);
      onClose();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">New Contact</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <RequiredLabel text="First Name" />
              <input
                type="text"
                {...register('firstName')}
                className="input"
                placeholder="Enter first name"
              />
              <FormError message={errors.firstName?.message} />
            </div>

            <div>
              <RequiredLabel text="Last Name" />
              <input
                type="text"
                {...register('lastName')}
                className="input"
                placeholder="Enter last name"
              />
              <FormError message={errors.lastName?.message} />
            </div>

            <div>
              <RequiredLabel text="Email" />
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  {...register('email')}
                  className="pl-10 input"
                  placeholder="Enter email address"
                />
              </div>
              <FormError message={errors.email?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  {...register('phone')}
                  className="pl-10 input"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                {...register('title')}
                className="input"
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  {...register('company')}
                  className="pl-10 input"
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div>
              <RequiredLabel text="Contact Type" />
              <select
                {...register('type')}
                className="input"
              >
                <option value="Prospect">Prospect</option>
                <option value="LP">Limited Partner</option>
                <option value="Co-investor">Co-investor</option>
                <option value="Advisor">Advisor</option>
              </select>
              <FormError message={errors.type?.message} />
            </div>

            <div>
              <RequiredLabel text="Source" />
              <select
                {...register('source')}
                className="input"
              >
                <option value="direct">Direct</option>
                <option value="referral">Referral</option>
                <option value="conference">Conference</option>
                <option value="existing-lp">Existing LP</option>
              </select>
              <FormError message={errors.source?.message} />
            </div>
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
              Create Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}