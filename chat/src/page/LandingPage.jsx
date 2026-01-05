import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import images from assets
import logoImg from '../assets/logo3.png';
import imageCreateImg from '../assets/imagecreate.png';
import textImg from '../assets/text.png';
import InstallApp from '../components/InstallApp.jsx';
import settingsImg from '../assets/settings.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
  }, []);

  const handleGetStarted = () => {
    navigate(id ? '/chat' : '/login');
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#212121]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="cyber-ai" className="w-8 h-8 object-contain" />
              <span className="text-lg font-medium">cyber-ai</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
              <a href="https://github.com/Cyber-Hash-pro" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleGetStarted}
              className="px-4 py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-all duration-200"
            >
              {id ? 'Open cyber-ai' : 'Try cyber-ai'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Headline */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            cyber-ai on your browser
          </h1>

          {/* Subtitle */}
          <p className={`text-lg text-gray-400 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            With cyber-ai, chat about code, generate images, remember conversations, and explore anything on your mind.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap items-center justify-center gap-4 mb-20 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button 
              onClick={handleGetStarted}
              className="group px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            >
              Start chatting
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

            </button>
  <InstallApp />
           
          </div>

          {/* Hero Image - macOS Style Window */}
          <div className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Gradient Background */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Pink/Purple Gradient Background */}
              <div className=" bg-gradient-to-br from-pink-400 via-pink-300 to-purple-300 relative">
                
              <img src={textImg} className='h-full  ' alt="" />
                {/* macOS Menu Bar */}
                <div className="absolute top-0 left-0 right-0 bg-white/30 backdrop-blur-sm  py-2 flex items-center gap-4 text-xs text-black/70">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={logoImg} alt="logo" className="w-4 h-4" />
                    <span className="font-medium">cyber-ai</span>
                  </div>
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>Window</span>
                  <span>Help</span>
                </div>

                {/* Chat Input Overlay */}
              

                {/* Floating Generated Image Preview */}
                <div className="absolute top-16 right-8 w-52 bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden border border-white/10 transform hover:scale-105 transition-transform duration-300">
                  <img src={imageCreateImg} alt="AI Generated" className="w-full h-32 object-cover" />
                  <div className="p-3 flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <p className="text-xs text-white font-medium">AI Generated</p>
                      <p className="text-xs text-white/50">From your prompt</p>
                    </div>
                  </div>
                </div>

                {/* Upload Menu */}
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl font-medium text-center mb-16">
            Seamlessly integrates with how you work, write, and create
          </h2>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Feature 1 - Real-time Chat */}
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-blue-500/30 p-8 flex items-center justify-center relative">
                <img src={textImg} alt="Text chat" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4">
                  <div className="px-4 py-3 bg-white/20 rounded-xl border border-white/30">
                    <span className="text-sm">⚡</span>
                    <p className="text-xs mt-1">instant</p>
                  </div>
                  <div className="px-8 py-3 bg-white/20 rounded-xl border border-white/30">
                    <span className="text-sm">real-time</span>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-2">Instant responses</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                cyber-ai's real-time WebSocket connection delivers responses instantly. No waiting, no refreshing — just smooth conversation flow.
              </p>
            </div>

            {/* Feature 2 - Memory */}
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-purple-400/30 via-pink-400/20 to-purple-500/30 p-8 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center">
                      <span className="text-lg">🧠</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vector Memory</p>
                      <p className="text-xs text-white/50">Powered by Pinecone</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/20 rounded-full w-full animate-pulse"></div>
                    <div className="h-2 bg-white/20 rounded-full w-4/5 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="h-2 bg-white/20 rounded-full w-3/5 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-2">Long-term memory with RAG</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every conversation with cyber-ai is stored as vectors in Pinecone. Your AI learns and remembers context across all your sessions.
              </p>
            </div>

            {/* Feature 3 - Image Generation */}
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-orange-400/30 via-pink-400/20 to-rose-500/30 p-4 flex items-center justify-center relative">
                <div className="grid grid-cols-2 gap-3 relative z-10">
                  <img src={imageCreateImg} alt="Generated 1" className="w-28 h-28 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-300 to-blue-400 rounded-xl shadow-lg"></div>
                  <div className="w-28 h-28 bg-gradient-to-br from-green-300 to-cyan-400 rounded-xl shadow-lg"></div>
                  <div className="w-28 h-28 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-xl shadow-lg flex items-center justify-center">
                    <span className="text-3xl">🎨</span>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-2">Generate stunning images</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                With cyber-ai, create beautiful AI-generated images from text descriptions. Just describe what you want and watch it come to life.
              </p>
            </div>

            {/* Feature 4 - File Understanding */}
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-cyan-500/30 p-8 flex items-center justify-center relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center border border-emerald-400/30">
                      <span className="text-xl">📄</span>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center border border-blue-400/30">
                      <span className="text-xl">🖼️</span>
                    </div>
                    <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center border border-red-400/30">
                      <span className="text-xl">📑</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xs text-white/70">Drop any file here</span>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-2">Understands any file</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Upload images, PDFs, code files, or documents. cyber-ai analyzes and understands your files to provide intelligent responses.
              </p>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Feature 5 - Voice/Text to Speech */}
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-violet-400/30 via-purple-400/20 to-fuchsia-500/30 p-8 flex items-center justify-center relative">
                <img src={settingsImg} alt="Settings" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">🎤</span>
                  </div>
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                      <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-2">Text to Speech</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Listen to cyber-ai responses with built-in speech synthesis. Get hands-free answers while you work.
              </p>
            </div>

            {/* Feature 6 - Chat Search */}
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-amber-400/30 via-orange-400/20 to-yellow-500/30 p-8 flex items-center justify-center relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 w-full max-w-xs">
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/20 mb-3">
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-white/70">Search chats...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                      <p className="text-xs text-white/80">React hooks discussion</p>
                    </div>
                    <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                      <p className="text-xs text-white/80">Image generation tips</p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-2">Smart chat search</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Quickly find past conversations with powerful search. Never lose important discussions with cyber-ai again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-medium text-center mb-16">
            How cyber-ai works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                num: '01', 
                title: 'Start a conversation', 
                desc: 'Type your message or question to cyber-ai. Ask about code, ideas, or anything.',
                icon: '💬'
              },
              { 
                num: '02', 
                title: 'cyber-ai processes & remembers', 
                desc: 'Gemini AI responds while storing context in vector memory.',
                icon: '🧠'
              },
              { 
                num: '03', 
                title: 'Get smarter over time', 
                desc: 'Each conversation with cyber-ai improves future responses with RAG retrieval.',
                icon: '✨'
              }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
                <span className="text-xs text-gray-500 font-mono">{step.num}</span>
                <h3 className="text-white font-medium mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-500 text-sm mb-6">Built with modern technology</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Gemini 2.0', 'Pinecone', 'Redux', 'Tailwind CSS', 'JWT', 'ImageKit'].map((tech, i) => (
              <span 
                key={i}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#2d2d2d] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="cyber-ai" className="w-10 h-10 object-contain" />
              <p className="text-lg font-medium">Do more with cyber-ai</p>
            </div>
            <div className="flex items-center gap-3">
  <InstallApp />

              <button 
                onClick={handleGetStarted}
                className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
              >
                Start chatting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <a 
                href="https://github.com/Cyber-Hash-pro/cyber-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                View on GitHub
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImg} alt="cyber-ai" className="w-8 h-8 object-contain" />
                <span className="text-white font-medium">cyber-ai</span>
              </div>
              <p className="text-gray-500 text-sm">AI assistant with long-term memory</p>
            </div>

            {/* Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4">Product</p>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="text-white hover:text-gray-300 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-white hover:text-gray-300 transition-colors">How it works</a></li>
                <li><a href="https://github.com/Cyber-Hash-pro" className="text-white hover:text-gray-300 transition-colors">GitHub</a></li>
              </ul>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-4">Tech Stack</p>
              <ul className="space-y-3 text-sm">
                <li><span className="text-white">Gemini AI</span></li>
                <li><span className="text-white">Pinecone</span></li>
                <li><span className="text-white">Socket.IO</span></li>
              </ul>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-4">Developer</p>
              <ul className="space-y-3 text-sm">
                <li><span className="text-white">Nilesh Ramlal Patil</span></li>
                <li><a href="https://github.com/Cyber-Hash-pro" className="text-white hover:text-gray-300 transition-colors">@Cyber-Rebel</a></li>
              </ul>
            </div>
          </div>

          {/* Big Logo */}
          <div className="text-center mb-8">
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-bold text-white/10 tracking-tight">
              cyber-ai
            </h2>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-gray-500 text-sm">© 2025 cyber-ai. Built with ❤️ by Nilesh Ramlal Patil</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Cyber-Hash-pro" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
