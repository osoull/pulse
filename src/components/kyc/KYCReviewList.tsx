import React, { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { KYCReview, KYCDocument } from '../../types/kyc';
import { format } from 'date-fns';

interface KYCReviewListProps {
  reviews: KYCReview[];
}

export default function KYCReviewList({ reviews }: KYCReviewListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.investor?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">KYC Reviews</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search investors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {filteredReviews.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No KYC reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: KYCReview }) {
  const statusColors = {
    'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Pending Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  const riskColors = {
    'Low': 'text-green-600 dark:text-green-400',
    'Medium': 'text-yellow-600 dark:text-yellow-400',
    'High': 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{review.investor?.name}</h3>
          <p className="text-sm text-gray-500">{review.investor?.type}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[review.status]}`}>
            {review.status}
          </span>
          <span className={`text-sm font-medium ${riskColors[review.risk_level]}`}>
            {review.risk_level} Risk
          </span>
          <button className="btn-secondary text-sm">
            Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Last Review</p>
          <p className="text-sm font-medium dark:text-white">
            {format(new Date(review.last_review_date), 'MMM d, yyyy')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Next Review</p>
          <p className="text-sm font-medium dark:text-white">
            {format(new Date(review.next_review_date), 'MMM d, yyyy')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Documents</p>
          <p className="text-sm font-medium dark:text-white">
            {review.documents?.length || 0} files
          </p>
        </div>
      </div>

      {review.documents && review.documents.length > 0 && (
        <div className="space-y-2">
          {review.documents.map((doc) => (
            <DocumentRow key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

function DocumentRow({ document }: { document: KYCDocument }) {
  const statusColors = {
    'Valid': 'text-green-600 dark:text-green-400',
    'Expired': 'text-red-600 dark:text-red-400',
    'Pending Review': 'text-yellow-600 dark:text-yellow-400',
    'Rejected': 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded">
      <div className="flex items-center space-x-3">
        <FileText className="w-4 h-4 text-gray-400" />
        <div>
          <p className="text-sm font-medium dark:text-white">{document.name}</p>
          <p className="text-xs text-gray-500">{document.type}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`text-sm ${statusColors[document.status]}`}>
          {document.status}
        </span>
        {document.expiry_date && (
          <span className="text-sm text-gray-500">
            Exp: {format(new Date(document.expiry_date), 'MMM d, yyyy')}
          </span>
        )}
      </div>
    </div>
  );
}