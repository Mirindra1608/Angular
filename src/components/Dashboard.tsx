import React from 'react';
import { Task } from '../types';
import { TrendingUp, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
}

export function Dashboard({ tasks }: DashboardProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < new Date() && 
    !task.completed
  ).length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      name: 'Tâches totales',
      value: totalTasks,
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Terminées',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'En cours',
      value: pendingTasks,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      name: 'En retard',
      value: overdueTasks,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
        <p className="text-gray-600">Vue d'ensemble de vos tâches et projets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Taux de completion</h3>
          <span className="text-2xl font-bold text-blue-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {completedTasks} sur {totalTasks} tâches terminées
        </p>
      </div>
    </div>
  );
}