import React, { useState } from 'react';
import { Users, Building2, PieChart, Calendar } from 'lucide-react';
import ContactList from './ContactList';
import DealsPipeline from './DealsPipeline';
import ActivityTimeline from './ActivityTimeline';
import { useCRM } from '../../hooks/useCRM';
import CreateContactModal from './CreateContactModal';
import AddActivityModal from './AddActivityModal';

export default function CRMDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const {
    contacts,
    activities,
    deals,
    loading,
    error,
    createContact,
    createActivity,
    updateContact,
    deleteContact
  } = useCRM();

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading CRM data. Please try again later.
      </div>
    );
  }

  const metrics = {
    totalContacts: contacts.length,
    activeDeals: deals.filter(d => d.status === 'open').length,
    totalCommitments: deals.reduce((sum, deal) => sum + deal.amount, 0),
    recentActivities: activities.length
  };

  const handleAddActivity = (contactId: string) => {
    setSelectedContactId(contactId);
    setIsAddActivityModalOpen(true);
  };

  const handleActivitySubmit = async (data: any) => {
    if (selectedContactId) {
      await createActivity({
        ...data,
        contactId: selectedContactId
      });
      setIsAddActivityModalOpen(false);
      setSelectedContactId(null);
    }
  };

  const selectedContact = selectedContactId 
    ? contacts.find(c => c.id === selectedContactId)
    : null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CRM Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage investor relationships and deal pipeline</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Users className="w-4 h-4" />
          <span>New Contact</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          title="Total Contacts"
          value={metrics.totalContacts}
          color="bg-blue-500"
        />
        <MetricCard
          icon={<Building2 className="w-6 h-6" />}
          title="Active Deals"
          value={metrics.activeDeals}
          color="bg-green-500"
        />
        <MetricCard
          icon={<PieChart className="w-6 h-6" />}
          title="Total Commitments"
          value={`$${(metrics.totalCommitments / 1000000).toFixed(1)}M`}
          color="bg-purple-500"
        />
        <MetricCard
          icon={<Calendar className="w-6 h-6" />}
          title="Recent Activities"
          value={metrics.recentActivities}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DealsPipeline deals={deals} filter={activeFilter} />
        </div>
        <div>
          <ActivityTimeline activities={activities} filter={activeFilter} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Investor Contacts</h2>
            <div className="flex space-x-2">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="input py-1"
              >
                <option value="all">All Sources</option>
                <option value="direct">Direct</option>
                <option value="referral">Referral</option>
                <option value="conference">Conference</option>
              </select>
            </div>
          </div>
        </div>
        <ContactList
          contacts={contacts}
          activities={activities}
          filter={activeFilter}
          onEditContact={(contact) => {
            // Handle edit contact
            console.log('Edit contact:', contact);
          }}
          onDeleteContact={async (id) => {
            await deleteContact(id);
          }}
          onAddActivity={handleAddActivity}
        />
      </div>

      <CreateContactModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createContact}
      />

      {selectedContact && (
        <AddActivityModal
          isOpen={isAddActivityModalOpen}
          onClose={() => {
            setIsAddActivityModalOpen(false);
            setSelectedContactId(null);
          }}
          onSubmit={handleActivitySubmit}
          contactName={`${selectedContact.firstName} ${selectedContact.lastName}`}
        />
      )}
    </div>
  );
}

function MetricCard({ icon, title, value, color }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
}