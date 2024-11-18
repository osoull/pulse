import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Mail, Users, Upload, Send, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendEmail, saveDraft, getEmailTemplates } from '../../services/emailService';

const emailSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Message body is required'),
  recipients: z.array(z.string().email('Invalid email address')).min(1, 'At least one recipient is required')
});

interface ComposeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  defaultRecipients?: string[];
  defaultSubject?: string;
  defaultBody?: string;
}

export default function ComposeEmailModal({
  isOpen,
  onClose,
  onSubmit,
  defaultRecipients = [],
  defaultSubject = '',
  defaultBody = ''
}: ComposeEmailModalProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      subject: defaultSubject,
      body: defaultBody,
      recipients: defaultRecipients
    }
  });

  const [attachments, setAttachments] = useState<File[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const emailTemplates = await getEmailTemplates();
      setTemplates(emailTemplates);
    } catch (error) {
      console.error('Error loading email templates:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    if (!templateId) return;

    const template = templates.find(t => t.id === templateId);
    if (template) {
      setValue('subject', template.subject);
      setValue('body', template.body);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      
      // Convert attachments to base64
      const attachmentPromises = attachments.map(async (file) => {
        return new Promise<{ name: string; contentType: string; contentBytes: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64content = reader.result as string;
            resolve({
              name: file.name,
              contentType: file.type,
              contentBytes: base64content.split(',')[1]
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const processedAttachments = await Promise.all(attachmentPromises);

      await sendEmail({
        subject: data.subject,
        body: data.body,
        toRecipients: data.recipients,
        attachments: processedAttachments
      });

      if (onSubmit) {
        onSubmit(data);
      }
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async (data: any) => {
    try {
      setLoading(true);
      await saveDraft({
        subject: data.subject,
        body: data.body,
        toRecipients: data.recipients
      });
      onClose();
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                Compose Email
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Send email via Outlook
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template
                </label>
                <select
                  onChange={handleTemplateChange}
                  className="mt-1 input"
                >
                  <option value="">Select template</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recipients
                </label>
                <div className="mt-1 relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register('recipients')}
                    className="pl-10 input"
                    placeholder="Enter email addresses (comma-separated)"
                  />
                </div>
                {errors.recipients && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipients.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register('subject')}
                    className="pl-10 input"
                    placeholder="Enter email subject"
                  />
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  {...register('body')}
                  rows={12}
                  className="mt-1 input font-mono"
                  placeholder="Enter your message..."
                />
                {errors.body && (
                  <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Attachments
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, Word, Excel, or images up to 10MB each
                    </p>
                  </div>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {file.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(handleSaveDraft)}
                className="btn-secondary flex items-center space-x-2"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
                disabled={loading}
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending...' : 'Send Email'}</span>
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}