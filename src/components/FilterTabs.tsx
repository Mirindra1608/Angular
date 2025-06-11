import React from 'react';
import { CheckCircle, Circle, List } from 'lucide-react';

interface FilterTabsProps {
  activeFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const tabs = [
    { key: 'all' as const, label: 'Toutes', icon: List, count: counts.all },
    { key: 'active' as const, label: 'En cours', icon: Circle, count: counts.active },
    { key: 'completed' as const, label: 'Terminées', icon: CheckCircle, count: counts.completed },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {tabs.map(({ key, label, icon: Icon, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeFilter === key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            activeFilter === key
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}