import React, { useState } from 'react';
import { Task } from '../types';
import { Clock, AlertCircle, Flag, Trash2, Edit3, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onToggleComplete, onDelete, onEdit }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Flag;
      case 'low': return Clock;
      default: return Clock;
    }
  };

  const PriorityIcon = getPriorityIcon(task.priority);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 mt-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                <PriorityIcon className="w-3 h-3 mr-1" />
                {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </span>
              
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                {task.category}
              </span>

              {task.dueDate && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  isOverdue ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
                }`}>
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                </span>
              )}
            </div>
          </div>
        </div>

        {isHovered && (
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}