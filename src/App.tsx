import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FilterTabs } from './components/FilterTabs';
import { CategoryFilter } from './components/CategoryFilter';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { useTasks } from './hooks/useTasks';
import { useAuth } from './hooks/useAuth';
import { Task } from './types';

function App() {
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const {
    tasks,
    allTasks,
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
  } = useTasks();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleShowAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuth = async (email: string, password: string, name?: string) => {
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password, name!);
      }
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
  };

  const counts = {
    all: allTasks.length,
    active: allTasks.filter(task => !task.completed).length,
    completed: allTasks.filter(task => task.completed).length,
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onShowAuth={handleShowAuth} />
        <AuthModal
          isOpen={isAuthModalOpen}
          mode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onAuth={handleAuth}
          onSwitchMode={handleSwitchAuthMode}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={handleAddTask}
        user={user}
        onLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard tasks={allTasks} />

        <CategoryFilter
          categories={availableCategories}
          selectedCategories={selectedCategories}
          onCategoryToggle={toggleCategoryFilter}
          onClearCategories={clearCategoryFilters}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Mes tâches</h2>
                {selectedCategories.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {tasks.length} tâche{tasks.length !== 1 ? 's' : ''} dans {selectedCategories.join(', ')}
                  </p>
                )}
              </div>
              <FilterTabs
                activeFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />
            </div>
          </div>

          <div className="p-6">
            <TaskList
              tasks={tasks}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        onUpdate={updateTask}
        task={editingTask}
      />
    </div>
  );
}

export default App;