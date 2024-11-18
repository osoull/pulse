import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Calendar, Video, Users, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const meetingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['AGM', 'LPAC', 'One-on-One', 'Update Call']),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  isVirtual: z.boolean(),
  location: z.string().optional(),
  virtualLink: z.string().url().optional(),
  agenda: z.array(z.string()).min(1, 'At least one agenda item is required'),
  attendees: z.array(z.string()).min(1, 'At least one attendee is required'),
  materials: z.array(z.any()).optional()
});

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateMeetingModal({
  isOpen,
  onClose,
  onSubmit
}: CreateMeetingModalProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      isVirtual: false,
      agenda: [''],
      date: new Date().toISOString().split('T')[0]
    }
  });

  const isVirtual = watch('isVirtual');
  const [agendaItems, setAgendaItems] = React.useState<string[]>(['']);
  const [materials, setMaterials] = React.useState<File[]>([]);

  const handleAddAgendaItem = () => {
    setAgendaItems([...agendaItems, '']);
  };

  const handleRemoveAgendaItem = (index: number) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index));
  };

  const handleAgendaItemChange = (index: number, value: string) => {
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index] = value;
    setAgendaItems(newAgendaItems);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMaterials(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                Schedule Meeting
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Schedule a new investor meeting
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Meeting Title
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="mt-1 input"
                  placeholder="Enter meeting title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Meeting Type
                  </label>
                  <select
                    {...register('type')}
                    className="mt-1 input"
                  >
                    <option value="AGM">Annual General Meeting</option>
                    <option value="LPAC">LPAC Meeting</option>
                    <option value="One-on-One">One-on-One Meeting</option>
                    <option value="Update Call">Update Call</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="mt-1 input"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Time
                  </label>
                  <input
                    type="time"
                    {...register('startTime')}
                    className="mt-1 input"
                  />
                  {errors.startTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Time
                  </label>
                  <input
                    type="time"
                    {...register('endTime')}
                    className="mt-1 input"
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('isVirtual')}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Virtual Meeting
                  </span>
                </label>
              </div>

              {isVirtual ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Virtual Meeting Link
                  </label>
                  <input
                    type="url"
                    {...register('virtualLink')}
                    className="mt-1 input"
                    placeholder="Enter video conference link"
                  />
                  {errors.virtualLink && (
                    <p className="mt-1 text-sm text-red-600">{errors.virtualLink.message}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    className="mt-1 input"
                    placeholder="Enter meeting location"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Attendees
                </label>
                <select
                  multiple
                  {...register('attendees')}
                  className="mt-1 input"
                  size={4}
                >
                  <option value="all">All Investors</option>
                  <option value="lpac">LPAC Members Only</option>
                  <option value="fund1">Growth Fund I Investors</option>
                  <option value="fund2">Buyout Fund II Investors</option>
                </select>
                {errors.attendees && (
                  <p className="mt-1 text-sm text-red-600">{errors.attendees.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Agenda Items
                </label>
                <div className="mt-1 space-y-2">
                  {agendaItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleAgendaItemChange(index, e.target.value)}
                        className="input flex-1"
                        placeholder="Enter agenda item"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAgendaItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddAgendaItem}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    + Add Agenda Item
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Meeting Materials
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 input"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                {materials.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Selected files:</p>
                    <ul className="mt-1 text-sm text-gray-600">
                      {materials.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
                Schedule Meeting
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}