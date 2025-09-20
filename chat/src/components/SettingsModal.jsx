import React, { useState } from 'react';
import { 
  FiX, FiSettings, FiBell, FiUser, FiGrid, FiDatabase, 
  FiShield, FiUserCheck, FiMail, FiGithub, FiLinkedin,
  FiGlobe, FiPlus, FiEdit3, FiTrash2
} from "react-icons/fi";
import ChatList from './sidebar/ChatList';
import {logoutUser } from '../store/actions/useraction.jsx'
import { useDispatch, useSelector } from 'react-redux';

const SettingsModal = ({ isOpen, onClose, userDetails }) => {
  const [activeSection, setActiveSection] = useState('general');
   const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    builderName: userDetails?.firstName || '',
    email: userDetails?.email || 'np103177@gmail.com',
    website: '',
    linkedin: '',
    github: '',
    receiveEmails: true,
    domainVerified: false
  });
 const title = useSelector(state=>state.chat)
 console.log('---->',title.chats
)
  if (!isOpen) return null;

  const sidebarItems = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'Mcp server', label: 'MCP server', icon: FiBell },
    { id: 'personalization', label: 'Personalization', icon: FiUser },
    { id: 'Tittle', label: 'Chat Tittle', icon: FiUserCheck },
    { id: 'dataControls', label: 'Data controls', icon: FiDatabase },
  ];
  const logout=()=>{
   
    dispatch(logoutUser())
    
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">General Settings</h2>
              <p className="text-gray-400">
                Personalize your builder profile to connect with users of your GPTs. 
                These settings apply to publicly shared GPTs.
              </p>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Preview</h3>
                <span className="text-sm text-gray-400">Preview</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {userDetails?.avatarimage ? (
                    <img 
                      src={userDetails.avatarimage} 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FiUser className="w-10 h-10" />
                  )}
                </div>
                <div className='flex justify-between w-full'>
                  <div>

                  <h4 className="text-lg font-medium text-white">PlaceholderGPT</h4>
                  <p className="text-sm text-gray-400">By community builder</p>
                  </div>
                </div>
                <button onClick={logout} className='bg-red-500 p-2 rounded-2xl px-10  '> logout</button>
              </div>
              
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
                <div className="w-5 h-5 text-blue-400 mt-0.5">ⓘ</div>
                <div className="text-sm text-blue-300">
                  Complete verification to publish GPTs to everyone.
                  Verify your identity by adding billing details or verifying 
                  ownership of a public domain name.
                </div>
              </div>
            </div>

            {/* Links Section */}
          <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={`${userDetails?.firstName || ''} ${userDetails?.lastName || ''}`}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={userDetails?.email || ''}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Subscription</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Free Plan</p>
                    <p className="text-gray-400 text-sm">Basic features included</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-sm rounded-lg transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

        case 'Tittle':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Chat Titles</h2>
              <p className="text-gray-400">
                Search and explore your chat titles in a visually appealing way.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search chat titles..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors">
                Search
              </button>
            </div>

            {/* Chat Titles Showcase */}
            <div className="w-full max-w-2xl mx-auto shadow-lg rounded-xl p-4 space-y-3">

  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 text-black">
    {title.chats.map((chat, index) => (
      <div
        key={chat._id || index}
        className="w-full bg-gray-700 text-white  transition-all rounded-lg shadow-sm cursor-pointer"
      >
        <h3 className="p-4  font-medium">
          {chat.tittle  || `Chat ${index + 1}`}
        </h3>
      </div>
    ))}
  </div>
</div>

          </div>
        )
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Notifications</h2>
              <p className="text-gray-400">
                Manage how you receive notifications and updates.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    'Chat updates and messages',
                    'Security alerts',
                    'Product updates',
                    'Marketing emails'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white text-sm">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'personalization':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Personalization</h2>
              <p className="text-gray-400">
                Customize your experience and preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Light', 'Dark', 'System'].map((theme) => (
                    <div key={theme} className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      theme === 'Dark' ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 hover:border-gray-500'
                    }`}>
                      <div className="text-center">
                        <div className={`w-8 h-8 mx-auto mb-2 rounded ${
                          theme === 'Light' ? 'bg-white' : theme === 'Dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'
                        }`}></div>
                        <span className="text-sm text-white">{theme}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Language</h3>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
        );

   
      case 'dataControls':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Data Controls</h2>
              <p className="text-gray-400">
                Manage your data and privacy settings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Data Export</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Download a copy of your data including chats, settings, and preferences.
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                  Request Data Export
                </button>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Data Deletion</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

     
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl h-[80vh] bg-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800/50 border-r border-gray-700/50 p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
            </div>
            
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/30'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
