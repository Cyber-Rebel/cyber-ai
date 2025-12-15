import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../store/actions/useraction'
import { useDispatch } from 'react-redux'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const loadingToast = toast.loading('Signing in...')

    try{
      const iscorrectrepo= await  dispatch(loginUser({ 
        email: email,
        password: password
      })) 
      
      if(iscorrectrepo.error){
        toast.error('Invalid email or password', { id: loadingToast })
        return 
      }
      toast.success('Login successful!', { id: loadingToast })
      navigate('/')
    }catch(err){
      console.log(err)
      toast.error('Login failed. Please try again.', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-[#212121] text-white flex items-center justify-center px-4 py-8">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#2d2d2d',
            color: '#fff',
            border: '1px solid #404040',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium tracking-tight mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your AI conversations</p>
        </div>

        {/* Main Card */}
        <div className="bg-[#171717] rounded-2xl border border-[#2d2d2d] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#212121] border border-[#2d2d2d] rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 hover:border-[#404040] text-white placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-[#212121] border border-[#2d2d2d] rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 hover:border-[#404040] text-white placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 ${
                loading
                  ? 'bg-white/10 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20 transform hover:-translate-y-0.5'
              } focus:outline-none focus:ring-2 focus:ring-white/20`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-white hover:text-gray-200 font-medium transition-colors duration-200 underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
