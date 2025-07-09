import React, { useState } from 'react';
import { X, MessageCircle, User, BookOpen, Calculator, ArrowRight, Phone, Mail, AlertTriangle, Heart, Users, GraduationCap, Info, ArrowLeft, Send, Eye, EyeOff } from 'lucide-react';

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

export const TeachWellAISystem = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showTeachWell, setShowTeachWell] = useState(false);
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
    { id: 2, emoji: '📚', name: 'Study Helper', color: 'bg-green-500' },
    { id: 3, emoji: '🎓', name: 'Tutor', color: 'bg-purple-500' },
  ];

  const menuItems = [
    { id: 'behaviour', title: 'BEHAVIOUR SUPPORT', icon: User, color: 'bg-red-500' },
    { id: 'mental', title: 'MENTAL HEALTH', icon: Heart, color: 'bg-pink-500' },
    { id: 'parenting', title: 'PARENTING SUPPORT', icon: Users, color: 'bg-green-500' },
    { id: 'general', title: 'GENERAL SCHOOL INFORMATION', icon: Info, color: 'bg-blue-500' },
    { id: 'transition', title: 'TRANSITION TO YEAR 7', icon: ArrowRight, color: 'bg-orange-500' },
    { id: 'careers', title: '6TH FORM & CAREERS', icon: GraduationCap, color: 'bg-purple-500' },
  ];

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setTimeout(() => setShowTeachWell(true), 300);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLogin(false);
    setShowTeachWell(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasscode(true);
  };

  const handlePasscodeSubmit = () => {
    if (passcode.length === 6) {
      setShowPasscode(false);
      setShowSignup(false);
      setShowTeachWell(true);
    }
  };

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: currentMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, newMessage]);
      setCurrentMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. I'm here to help you with any questions or concerns you may have.",
          sender: 'ai',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const renderLoginForm = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">TEACHWELL AI</h2>
        <p className="text-sm text-gray-600">Login</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={loginForm.remember}
              onChange={(e) => setLoginForm({...loginForm, remember: e.target.checked})}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Remember Me</span>
          </label>
          <button type="button" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </button>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Or Login with</p>
          <div className="flex justify-center space-x-4">
            <button type="button" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">f</button>
            <button type="button" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center">G</button>
            <button type="button" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center">t</button>
          </div>
        </div>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => { setShowLogin(false); setShowSignup(true); }}
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Register
          </button>
        </div>
      </form>
    </div>
  );

  const renderSignupForm = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">TEACHWELL AI</h2>
        <p className="text-sm text-gray-600">Sign Up</p>
      </div>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={signupForm.fullName}
          onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="email"
          placeholder="Email Address"
          value={signupForm.email}
          onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="tel"
          placeholder="Mobile Number"
          value={signupForm.mobile}
          onChange={(e) => setSignupForm({...signupForm, mobile: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={signupForm.password}
          onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="number"
          placeholder="Age"
          value={signupForm.age}
          onChange={(e) => setSignupForm({...signupForm, age: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="text"
          placeholder="Address"
          value={signupForm.address}
          onChange={(e) => setSignupForm({...signupForm, address: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <select
          value={signupForm.gender}
          onChange={(e) => setSignupForm({...signupForm, gender: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => { setShowSignup(false); setShowLogin(true); }}
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Sign In
          </button>
        </div>
        
        <p className="text-xs text-gray-600 text-center">
          By creating a passcode, you agree with our Terms & Conditions and Privacy Policy
        </p>
      </form>
    </div>
  );

  const renderPasscodeForm = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Details</h2>
        <p className="text-sm text-gray-600">Jane Doe</p>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">Passcode</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1,2,3,4,5,6,7,8,9,0].map((num) => (
            <button
              key={num}
              onClick={() => {
                if (passcode.length < 6) {
                  setPasscode(prev => prev + num.toString());
                }
              }}
              className="h-12 bg-gray-100 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {num}
            </button>
          ))}
        </div>
        
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 ${
                i < passcode.length ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={handlePasscodeSubmit}
            disabled={passcode.length !== 6}
            className={`px-8 py-2 rounded-lg font-medium transition-colors ${
              passcode.length === 6 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Let's Go
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button className="text-sm text-blue-600 hover:underline">
            Resend passcode
          </button>
        </div>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-medium">
          TEACHER ACCESS LOG IN
        </div>
      </div>

      <div className="bg-orange-300 text-orange-800 p-2 rounded mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">LATEST SCHOOL NEWS</span>
          <ArrowRight size={16} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-1">TeachWell AI</h2>
      <p className="text-sm text-gray-600 mb-4">
        Supporting educators, empowering schools. Access instant information, personalised resources, and expert guidance at your fingertips.
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
          How can I help you today?{' '}
          <span className="text-indigo-200">
            Select a topic or ask me a question to get started.
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
        Selecting a topic from the menu below is designed to streamline your experience with TeachWell AI. Each topic provides tailored resources and support to address specific needs within the school environment.
      </p>
    </div>
  );

  const renderBehaviourSupport = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Behaviour Support</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Welcome to the Behaviour Support page. This section is designed to help students and parents report incidents and access resources for managing challenging situations.
      </p>

      <div className="space-y-3">
        <button className="w-full bg-red-500 text-white p-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
          REPORT AN INCIDENT
        </button>
        
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          ACCESS RESOURCES
        </button>
        
        <button className="w-full bg-orange-500 text-white p-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          GET IMMEDIATE SUPPORT
        </button>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Available Support Options:</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <strong>AI-Powered Chat Support:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Get instant responses to your concerns</li>
              <li>• Access personalised coping strategies</li>
              <li>• Receive guidance on managing situations</li>
            </ul>
          </div>
          <div>
            <strong>Emergency Contacts:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• School Counselor: [Phone Number]</li>
              <li>• Anti-Bullying Hotline: [Phone Number]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMentalHealth = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Mental Health</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Mental health is an essential part of overall well-being. Here, you'll find resources to help understand, manage, and improve mental health.
      </p>

      <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle size={16} />
          <span className="text-sm font-medium">Crisis Support Available</span>
        </div>
        <p className="text-xs text-red-600 mt-1">
          If you're experiencing a mental health crisis, please call 999 immediately.
        </p>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-pink-500 text-white p-3 rounded-lg font-medium hover:bg-pink-600 transition-colors">
          MENTAL HEALTH RESOURCES
        </button>
        
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          BOOK A CONSULTATION
        </button>
        
        <button className="w-full bg-green-500 text-white p-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
          SELF HELP TOOLS
        </button>
        
        <button className="w-full bg-red-500 text-white p-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
          CRISIS SUPPORT
        </button>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Emergency Contacts:</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <div>Emergency Services: 999</div>
          <div>NHS Mental Health Crisis Line: [Insert local number]</div>
          <div>Samaritans: 116 123 (24/7 support)</div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Chat Support</h2>
      </div>

      <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
            <p>Start a conversation with TeachWell AI</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );

  const renderGenericPage = (title: string) => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Welcome to the {title} page. Resources and support for this topic are being prepared.
      </p>

      <button 
        onClick={() => setCurrentPage('chat')}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        START CHAT
        <ArrowRight size={16} />
      </button>
    </div>
  );

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

        {!showTeachWell && !showLogin && !showSignup && !showPasscode && (
          <>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-blue-600" size={24} />
                  <h2 className="text-lg font-semibold text-gray-800">
                    👋 Hi! I'm School AI Assistant
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">How can I help you today?</p>
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
                <p className="text-xs text-gray-500 mb-3">Popular topics:</p>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    <BookOpen size={12} />
                    Study Help
                  </button>
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors">
                    <Calculator size={12} />
                    Math Problems
                  </button>
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition-colors">
                    <User size={12} />
                    Homework
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

        {showLogin && renderLoginForm()}
        {showSignup && renderSignupForm()}
        {showPasscode && renderPasscodeForm()}
        
        {showTeachWell && (
          <>
            {currentPage === 'home' && renderHomePage()}
            {currentPage === 'behaviour' && renderBehaviourSupport()}
            {currentPage === 'mental' && renderMentalHealth()}
            {currentPage === 'chat' && renderChat()}
            {currentPage === 'parenting' && renderGenericPage('Parenting Support')}
            {currentPage === 'general' && renderGenericPage('General School Information')}
            {currentPage === 'transition' && renderGenericPage('Transition to Year 7')}
            {currentPage === 'careers' && renderGenericPage('6th Form & Careers')}
          </>
        )}
      </div>
    </div>
  );
};
            