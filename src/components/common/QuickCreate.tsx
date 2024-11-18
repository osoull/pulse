import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { 
  Plus, X, Calculator, UserPlus, Phone, FileText, Calendar, 
  Users, MessageCircle, CreditCard, Banknote, Leaf, Mail
} from 'lucide-react';
import CreateLeadModal from '../crm/leads/CreateLeadModal';
import CreateCallModal from '../crm/calls/CreateCallModal';
import CreateCapitalCallModal from '../investorRelations/capitalCalls/CreateCapitalCallModal';
import CreateDistributionModal from '../investorRelations/distributions/CreateDistributionModal';

const actions = [
  { id: 'fund', name: 'New Fund', icon: Calculator, color: 'bg-primary' },
  { id: 'lead', name: 'New Lead', icon: UserPlus, color: 'bg-purple-500' },
  { id: 'call', name: 'Schedule Call', icon: Phone, color: 'bg-blue-500' },
  { id: 'report', name: 'New Report', icon: FileText, color: 'bg-green-500' },
  { id: 'meeting', name: 'Schedule Meeting', icon: Calendar, color: 'bg-orange-500' },
  { id: 'contact', name: 'Add Contact', icon: Users, color: 'bg-indigo-500' },
  { id: 'query', name: 'New Query', icon: MessageCircle, color: 'bg-red-500' },
  { id: 'capital-call', name: 'Capital Call', icon: CreditCard, color: 'bg-yellow-500' },
  { id: 'distribution', name: 'Distribution', icon: Banknote, color: 'bg-teal-500' }
];

export default function QuickCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAction(null);
  };

  const renderModal = () => {
    switch (selectedAction) {
      case 'lead':
        return (
          <CreateLeadModal
            isOpen={true}
            onClose={handleClose}
            onSubmit={(data) => {
              console.log('Creating lead:', data);
              handleClose();
            }}
          />
        );
      case 'call':
        return (
          <CreateCallModal
            isOpen={true}
            onClose={handleClose}
            onSubmit={(data) => {
              console.log('Scheduling call:', data);
              handleClose();
            }}
          />
        );
      case 'capital-call':
        return (
          <CreateCapitalCallModal
            isOpen={true}
            onClose={handleClose}
            onSubmit={(data) => {
              console.log('Creating capital call:', data);
              handleClose();
            }}
          />
        );
      case 'distribution':
        return (
          <CreateDistributionModal
            isOpen={true}
            onClose={handleClose}
            onSubmit={(data) => {
              console.log('Creating distribution:', data);
              handleClose();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-200"
      >
        <Plus className="w-6 h-6" />
      </button>

      <Dialog open={isOpen && !selectedAction} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg w-[480px]">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <Dialog.Title className="text-lg font-semibold dark:text-white">
                Quick Create
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    <div className={`p-2 rounded-full ${action.color} text-white mb-2`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-center">{action.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {selectedAction && renderModal()}
    </>
  );
}