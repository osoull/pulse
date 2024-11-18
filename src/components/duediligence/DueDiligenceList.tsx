import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { DueDiligenceItem } from '../../hooks/useDueDiligence';
import { format } from 'date-fns';

interface DueDiligenceListProps {
  items: DueDiligenceItem[];
}

export default function DueDiligenceList({ items }: DueDiligenceListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No due diligence items found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {items.map((item) => (
        <DueDiligenceCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function DueDiligenceCard({ item }: { item: DueDiligenceItem }) {
  const statusColors = {
    'Not Started': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Under Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const priorityColors = {
    'High': 'text-red-600 dark:text-red-400',
    'Medium': 'text-yellow-600 dark:text-yellow-400',
    'Low': 'text-green-600 dark:text-green-400'
  };

  const getStatusIcon = () => {
    switch (item.status) {
      case 'Not Started':
        return <Clock className="w-4 h-4" />;
      case 'In Progress':
        return <Calendar className="w-4 h-4" />;
      case 'Under Review':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {item.companyName}
          </h3>
          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <span>{item.type}</span>
            <span>•</span>
            <span>Assigned to {item.assignedTo}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
            {item.priority} Priority
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
            {getStatusIcon()}
            <span className="ml-1">{item.status}</span>
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Start Date: {format(new Date(item.startDate), 'MMM d, yyyy')}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            Due Date: {format(new Date(item.dueDate), 'MMM d, yyyy')}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end">
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Progress</span>
                <span>{item.progress}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {(item.documents.length > 0 || item.comments.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
          {item.documents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Documents ({item.documents.length})
              </h4>
              <div className="space-y-2">
                {item.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:text-primary-dark"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    {doc.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {item.comments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Recent Comments
              </h4>
              <div className="space-y-2">
                {item.comments.slice(0, 2).map((comment) => (
                  <div key={comment.id} className="text-sm">
                    <p className="text-gray-900 dark:text-white">{comment.text}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {comment.author} • {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}