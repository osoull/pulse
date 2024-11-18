import React from 'react';

interface RequiredLabelProps {
  text: string;
}

export default function RequiredLabel({ text }: RequiredLabelProps) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {text} <span className="text-red-500">*</span>
    </label>
  );
}