import React, { useState } from 'react';
import { X, MessageCircle, User, BookOpen, Calculator, ArrowRight, Phone, Mail, AlertTriangle, Heart, Users, GraduationCap, Info, ArrowLeft, Send, Eye, EyeOff, FileText, Code, Layers, Clock, Calendar } from 'lucide-react';

interface Avatar {
  id: number;
  emoji: string;
  name: string;
  color: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const SchoolProjectsAI = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showSchoolAI, setShowSchoolAI] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [signupForm, setSignupForm] = useState({ fullName: '', email: '', mobile: '', password: '', age: '', address: '', gender: '' });

  const avatars = [
    { id: 1, emoji: '🤖', name: 'AI Assistant', color: 'bg-blue-500' },
    { id: 2, emoji: '📚', name: 'Project Helper', color: 'bg-green-500' },
    { id: 3, emoji: '🔬', name: 'Science Guide', color: 'bg-purple-500' },
    { id: 4, emoji: '🎨', name: 'Art Advisor', color: 'bg-pink-500' },
    { id: 5, emoji: '💻', name: 'Tech Mentor', color: 'bg-orange-500' },
  ];

  const menuItems = [
    { id: 'science', title: 'SCIENCE PROJECTS', icon: BookOpen, color: 'bg-green-500' },
    { id: 'technology', title: 'TECHNOLOGY PROJECTS', icon: Code, color: 'bg-blue-500' },
    { id: 'engineering', title: 'ENGINEERING PROJECTS', icon: Layers, color: 'bg-orange-500' },
    { id: 'arts', title: 'ARTS & CRAFTS PROJECTS', icon: Heart, color: 'bg-pink-500' },
    { id: 'math', title: 'MATHEMATICS PROJECTS', icon: Calculator, color: 'bg-purple-500' },
    { id: 'planning', title: 'PROJECT PLANNING', icon: Calendar, color: 'bg-indigo-500' },
  ];

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setTimeout(() => setShowSchoolAI(true), 300);
  };

  // Keep existing functions (handleLogin, handleSignup, handlePasscodeSubmit, sendMessage)
  // ... existing code ...

  // Update the renderHomePage function
  const renderHomePage = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-medium">
          SCHOOL PROJECTS ASSISTANT
        </div>
      </div>

      <div className="bg-orange-300 text-orange-800 p-2 rounded mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">PROJECT IDEAS</span>
          <ArrowRight size={16} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-1">School Projects AI</h2>
      <p className="text-sm text-gray-600 mb-4">
        Your personal assistant for school projects. Get ideas, step-by-step guidance, and resources for your next assignment.
      </p>

      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-lg bg-red-600 flex items-center justify-center overflow-hidden">
            <div className="text-white text-4xl">{selectedAvatar?.emoji || '🤖'}</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 text-white p-3 rounded-lg mb-4">
        <p className="text-sm font-medium">
          How can I help with your project?{' '}
          <span className="text-indigo-200">
            Select a project type or ask me a question to get started.
          </span>
        </p>
      </div>

      <button 
        onClick={() => setCurrentPage('chat')}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 mb-4"
      >
        START CHAT
        <ArrowRight size={16} />
      </button>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 p-3 rounded-lg text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center`}>
                <item.icon size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-800">{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-600 mt-4 leading-relaxed">
        Selecting a project type from the menu below will provide you with tailored ideas, resources, and step-by-step guidance for your school assignment.
      </p>
    </div>
  );

  // Add new project type pages
  const renderScienceProjects = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Science Projects</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Explore exciting science project ideas for all grade levels. From biology to chemistry and physics experiments.
      </p>

      <div className="space-y-3 mb-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium text-green-700 mb-1">Ecosystem in a Bottle</h3>
          <p className="text-sm text-gray-600 mb-2">Create a self-sustaining ecosystem in a sealed container.</p>
          <div className="flex justify-end">
            <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium text-green-700 mb-1">Solar System Model</h3>
          <p className="text-sm text-gray-600 mb-2">Build a scale model of our solar system with accurate proportions.</p>
          <div className="flex justify-end">
            <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium text-green-700 mb-1">Water Filtration System</h3>
          <p className="text-sm text-gray-600 mb-2">Design and test different methods of water purification.</p>
          <div className="flex justify-end">
            <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentPage('chat')}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        GET PROJECT HELP
        <MessageCircle size={16} />
      </button>
    </div>
  );

  const renderTechnologyProjects = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Technology Projects</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Discover technology project ideas from simple coding exercises to advanced robotics and app development.
      </p>

      <div className="space-y-3 mb-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-1">Personal Website</h3>
          <p className="text-sm text-gray-600 mb-2">Create your own website using HTML, CSS, and basic JavaScript.</p>
          <div className="flex justify-end">
            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-1">Simple Robot</h3>
          <p className="text-sm text-gray-600 mb-2">Build a basic robot that can follow a line or avoid obstacles.</p>
          <div className="flex justify-end">
            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-1">Mobile App Prototype</h3>
          <p className="text-sm text-gray-600 mb-2">Design a prototype for a mobile app that solves a real problem.</p>
          <div className="flex justify-end">
            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentPage('chat')}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        GET PROJECT HELP
        <MessageCircle size={16} />
      </button>
    </div>
  );

  // Add similar render functions for other project types
  // renderEngineeringProjects, renderArtsProjects, renderMathProjects, renderProjectPlanning

  // Update the main return statement
  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
      <div className="relative bg-gradient-to-br from-orange-200 to-yellow-200 max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 text-gray-500 hover:text-red-500 z-10"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {!showSchoolAI && !showLogin && !showSignup && !showPasscode && (
          <>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-blue-600" size={24} />
                  <h2 className="text-lg font-semibold text-gray-800">
                    👋 Hi! I'm School Projects AI
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Need help with a school project? I'm here to assist!</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Choose your assistant avatar (optional):
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => handleAvatarClick(avatar)}
                      className={`relative cursor-pointer group transition-transform duration-250 ${
                        selectedAvatar?.id === avatar.id ? 'scale-110' : 'hover:scale-105'
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl
                          ${avatar.color} text-white shadow-lg
                          ${
                            selectedAvatar?.id === avatar.id
                              ? 'ring-4 ring-blue-400 ring-opacity-60 shadow-blue-400/50'
                              : 'hover:shadow-xl hover:shadow-blue-400/30'
                          }
                          transition-all duration-250`}
                      >
                        {avatar.emoji}
                      </div>
                      {selectedAvatar?.id === avatar.id && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">Popular project types:</p>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    <BookOpen size={12} />
                    Science Fair
                  </button>
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors">
                    <Code size={12} />
                    Coding
                  </button>
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition-colors">
                    <Layers size={12} />
                    3D Models
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 text-sm"
                >
                  TEACHER ACCESS LOG IN
                </button>
              </div>
            </div>
          </>
        )}

        {/* {showLogin && renderLoginForm()}
        {showSignup && renderSignupForm()}
        {showPasscode && renderPasscodeForm()}
        
        {showSchoolAI && (
          <>
            {currentPage === 'home' && renderHomePage()}
            {currentPage === 'science' && renderScienceProjects()}
            {currentPage === 'technology' && renderTechnologyProjects()}
            {currentPage === 'engineering' && renderGenericPage('Engineering Projects')}
            {currentPage === 'arts' && renderGenericPage('Arts & Crafts Projects')}
            {currentPage === 'math' && renderGenericPage('Mathematics Projects')}
            {currentPage === 'planning' && renderGenericPage('Project Planning')}
            {currentPage === 'chat' && renderChat()}
          </>
        )} */}
      </div>
    </div>
  );
};