import React from 'react';
import { CheckCircle, Zap, Shield, Users, ArrowRight, Star } from 'lucide-react';

interface LandingPageProps {
  onShowAuth: (mode: 'login' | 'signup') => void;
}

export function LandingPage({ onShowAuth }: LandingPageProps) {
  const features = [
    {
      icon: CheckCircle,
      title: 'Gestion intuitive',
      description: 'Organisez vos tâches avec une interface simple et élégante'
    },
    {
      icon: Zap,
      title: 'Performance optimale',
      description: 'Accès rapide et synchronisation en temps réel'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Vos données sont protégées et sauvegardées automatiquement'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Partagez et collaborez sur vos projets en équipe'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Chef de projet',
      content: 'TaskFlow a révolutionné ma façon de gérer mes projets. Interface intuitive et fonctionnalités complètes.',
      rating: 5
    },
    {
      name: 'Thomas Martin',
      role: 'Entrepreneur',
      content: 'Enfin un outil qui s\'adapte à mon rythme de travail. Je recommande vivement !',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Freelance',
      content: 'La meilleure application de gestion de tâches que j\'ai utilisée. Simple et efficace.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onShowAuth('login')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Se connecter
              </button>
              <button
                onClick={() => onShowAuth('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Commencer gratuitement
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Organisez votre vie avec
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> TaskFlow</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              La solution complète pour gérer vos tâches, projets et objectifs. 
              Simple, puissant et conçu pour vous faire gagner du temps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onShowAuth('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Commencer maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onShowAuth('login')}
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-gray-50"
              >
                Déjà inscrit ? Se connecter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir TaskFlow ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des fonctionnalités pensées pour optimiser votre productivité
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez des milliers d'utilisateurs satisfaits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre productivité ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez TaskFlow dès aujourd'hui et découvrez une nouvelle façon de gérer vos tâches.
          </p>
          <button
            onClick={() => onShowAuth('signup')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Commencer gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <p className="text-gray-400">© 2025 TaskFlow. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}