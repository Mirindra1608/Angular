import { useState, useCallback } from 'react';
import { Task } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleTaskComplete = useCallback((id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  }, [tasks, updateTask]);

  const toggleCategoryFilter = useCallback((category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const clearCategoryFilters = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  // Get unique categories from all tasks
  const availableCategories = [...new Set(tasks.map(task => task.category))].sort();

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !task.completed) || 
      (filter === 'completed' && task.completed);
    
    const matchesSearch = 
      searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(task.category);

    return matchesFilter && matchesSearch && matchesCategory;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    selectedCategories,
    availableCategories,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    toggleCategoryFilter,
    clearCategoryFilters,
  };
}