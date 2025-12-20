import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789';
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        setGlitchText(`4${randomChar}4`);
        setTimeout(() => setGlitchText('404'), 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* 404 with glitch effect */}
        <div className="relative mb-8">
          <h1 
            className="text-[12rem] sm:text-[16rem] font-bold leading-none tracking-tighter select-none"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(6, 182, 212, 0.3)',
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
            }}
          >
            {glitchText}
          </h1>
          
          {/* Glitch layers */}
          <h1 
            className="absolute inset-0 text-[12rem] sm:text-[16rem] font-bold leading-none tracking-tighter select-none opacity-50"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transform: `translate(${mousePosition.x * 0.3 + 4}px, ${mousePosition.y * 0.3 - 2}px)`,
              clipPath: 'inset(0 0 50% 0)'
            }}
          >
            404
          </h1>
        </div>

        {/* Error message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-white/90">
            Lost in the digital void
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The page you're looking for has been moved, deleted, or never existed in this dimension.
          </p>
        </div>

        {/* Terminal-style error */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 max-w-lg mx-auto mb-10 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-gray-500">terminal</span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">$ curl -I {window.location.href}</p>
            <p className="text-red-400">HTTP/1.1 404 Not Found</p>
            <p className="text-gray-500">$ echo "Redirecting to safety..."</p>
            <p className="text-cyan-400 animate-pulse">▊</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Go Back
          </button>

          <button
            onClick={() => navigate('/chat')}
            className="px-8 py-4 border border-cyan-500/30 rounded-full text-cyan-400 font-medium hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Start Chatting
          </button>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
