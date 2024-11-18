import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import ComposeEmailModal from './ComposeEmailModal';

interface EmailButtonProps {
  recipients?: string[];
  subject?: string;
  body?: string;
  className?: string;
}

export default function EmailButton({ 
  recipients, 
  subject, 
  body,
  className = ''
}: EmailButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`btn-primary flex items-center space-x-2 ${className}`}
      >
        <Mail className="w-4 h-4" />
        <span>Compose Email</span>
      </button>

      <ComposeEmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRecipients={recipients}
        defaultSubject={subject}
        defaultBody={body}
      />
    </>
  );
}